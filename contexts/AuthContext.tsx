"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";
import { auth, signInWithGoogle, signOutUser } from "../lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { allUsers as initialAllUsers } from "../app/data/dummyData";

// ---------------------------
// Typage du contexte
// ---------------------------
export type AppUser = {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  role: "patient" | "doctor" | "pharmacist" | "admin" | string;
  isBackendUser?: boolean;
  isLocalUser?: boolean;
};

type AuthContextType = {
  user: AppUser | null;
  loading: boolean;
  allUsers: AppUser[];
  loginWithGoogle: () => Promise<{ success: boolean; user: AppUser }>;
  login: (
    email: string,
    password: string,
    role?: string
  ) => Promise<{ success: boolean; user: AppUser }>;
  
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string;
  }) => Promise<{ success: boolean; user: AppUser }>;
  logout: () => Promise<{ success: boolean }>;
  updateUser: (data: Partial<AppUser>) => void;
};

// ---------------------------
// Initialisation Firestore
// ---------------------------
const db = getFirestore();

// ---------------------------
// Création du contexte
// ---------------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ---------------------------
// Hook custom
// ---------------------------
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// ---------------------------
// Helpers Firestore
// ---------------------------

// Création doc Firestore si non existant
const createUserDocumentIfNotExists = async (
  user: FirebaseUser,
  defaultRole: string = "patient"
) => {
  try {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: defaultRole,
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("Erreur création Firestore user:", error);
  }
};

// Récupération du rôle
const fetchUserRole = async (uid: string): Promise<string | null> => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().role || null : null;
  } catch (error) {
    console.error("Erreur récupération rôle:", error);
    return null;
  }
};

// ---------------------------
// Provider
// ---------------------------
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<AppUser[]>(() => {
    try {
      const storedUsers = localStorage.getItem("users");
      return storedUsers ? JSON.parse(storedUsers) : initialAllUsers;
    } catch {
      return initialAllUsers;
    }
  });

  // Vérification de session locale
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("caresync_user");

        if (token && storedUser) {
          const response = await fetch("http://localhost:5000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            setUser(JSON.parse(storedUser));
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("caresync_user");
          }
        } else if (storedUser) {
          const parsed = JSON.parse(storedUser);
          if (!parsed.isBackendUser) setUser(parsed);
        }
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("caresync_user");
      } finally {
        setLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  // Persistance utilisateurs locaux
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(allUsers));
  }, [allUsers]);

  // Listener Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await createUserDocumentIfNotExists(firebaseUser);
        const role = await fetchUserRole(firebaseUser.uid);

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          role: role || "patient",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // ---------------------------
  // Fonctions Auth
  // ---------------------------
  const updateUser = (data: Partial<AppUser>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      localStorage.setItem("caresync_user", JSON.stringify(updated));
      return updated;
    });
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      await createUserDocumentIfNotExists(result.user);
      const role = await fetchUserRole(result.user.uid);

      const firebaseUser: AppUser = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        role: role || "patient",
      };
      setUser(firebaseUser);
      return { success: true, user: firebaseUser };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, role?: string) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      const backendUser: AppUser = {
        ...data.user,
        role: role || "patient",
        isBackendUser: true,
      };
      setUser(backendUser);
      localStorage.setItem("token", data.token);
      localStorage.setItem("caresync_user", JSON.stringify(backendUser));
      return { success: true, user: backendUser };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string;
  }) => {
    setLoading(true);
    const { firstName, lastName, email, password, role = "patient" } = userData;
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          password,
          role,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      const backendUser: AppUser = { ...data.user, role, isBackendUser: true };
      setUser(backendUser);
      localStorage.setItem("token", data.token);
      localStorage.setItem("caresync_user", JSON.stringify(backendUser));
      return { success: true, user: backendUser };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (user && !user.isBackendUser && !user.isLocalUser) {
        try {
          await signOutUser();
        } catch {}
      }
      setUser(null);
      localStorage.removeItem("caresync_user");
      localStorage.removeItem("token");
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // Valeur du contexte
  // ---------------------------
  const value = useMemo(
    () => ({
      user,
      loading,
      allUsers,
      loginWithGoogle,
      login,
      register,
      logout,
      updateUser,
    }),
    [user, loading, allUsers]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
