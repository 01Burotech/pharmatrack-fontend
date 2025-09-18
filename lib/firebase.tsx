// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrgQckdf_4bZLx7WfqZfx3WnfnFL7g3qg",
  authDomain: "pharmatrack-2e8c9.firebaseapp.com",
  projectId: "pharmatrack-2e8c9",
  storageBucket: "pharmatrack-2e8c9.firebasestorage.app",
  messagingSenderId: "575820607567",
  appId: "1:575820607567:web:20c725917ed7a29dc6fa3a",
  measurementId: "G-3CEZT7XS2J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };

export const storage = getStorage();

//const analytics = getAnalytics(app);

export async function signInWithGoogle() {
    return signInWithPopup(auth, provider);
}

export async function signOutUser() {
    return signOut(auth)
}