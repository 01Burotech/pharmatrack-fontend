"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { FaUserMd, FaUserNurse, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type RegisterFormInputs = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type UserRole = "pharmacien" | "doctor" | "patient";

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<UserRole | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const roleData: { label: string; value: UserRole; icon: JSX.Element }[] = [
    {
      label: "Pharmacien",
      value: "pharmacien",
      icon: <FaUserNurse size={40} className="text-teal-600" />,
    },
    {
      label: "Doctor",
      value: "doctor",
      icon: <FaUserMd size={40} className="text-emerald-600" />,
    },
    {
      label: "Patient",
      value: "patient",
      icon: <FaUser size={40} className="text-orange-500" />,
    },
  ];

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const goBack = () => setStep(1);

  const onSubmit = (data: RegisterFormInputs) => {
    console.log("Register:", { role, ...data });
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Helmet>
        <title>Inscription - Pharmatrack</title>
      </Helmet>

      <div className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
        {/* Blobs décoratifs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl animate-animateSlow"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-300/40 rounded-full blur-3xl animate-animateSlow"></div>

        {/* Container principal */}
        <div className="w-full max-w-md backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-3xl shadow-2xl p-8 sm:p-10 relative">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-1 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
              <span className={step === 1 ? "text-emerald-600" : "text-gray-400"}>Rôle</span>
              <span className={step === 2 ? "text-emerald-600" : "text-gray-400"}>Formulaire</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
              <motion.div
                className="h-2 bg-emerald-500 rounded-full"
                animate={{ width: step === 1 ? "50%" : "100%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Choix du rôle */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h1 className="text-2xl sm:text-3xl font-bold text-emerald-600 text-center mb-6">
                  Choisissez votre rôle
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {roleData.map((r) => (
                    <motion.button
                      key={r.value}
                      onClick={() => handleRoleSelect(r.value)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700 rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 hover:shadow-lg transition-all"
                    >
                      {r.icon}
                      <span className="mt-3 font-semibold text-gray-700 dark:text-gray-200 text-sm sm:text-base text-center">
                        {r.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Formulaire */}
            {step === 2 && role && (
              <motion.div
                key="step2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={goBack}
                    className="text-sm sm:text-base text-gray-500 hover:text-emerald-600 font-medium"
                  >
                    ← Retour
                  </button>
                  <h1 className="text-2xl sm:text-3xl font-bold text-emerald-600 text-center flex-grow">
                    Inscription – {roleData.find((r) => r.value === role)?.label}
                  </h1>
                  <div className="w-16" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                      Nom complet
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      {...register("fullName", { required: "Champ requis" })}
                      className={`mt-1 block w-full rounded-xl border ${
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      } focus:border-emerald-500 focus:ring-4 focus:ring-emerald-300 p-4 sm:p-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email", { required: "Champ requis" })}
                      className={`mt-1 block w-full rounded-xl border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } focus:border-emerald-500 focus:ring-4 focus:ring-emerald-300 p-4 sm:p-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                      Mot de passe
                    </label>
                    <input
                      id="password"
                      type="password"
                      {...register("password", { required: "Champ requis" })}
                      className={`mt-1 block w-full rounded-xl border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } focus:border-emerald-500 focus:ring-4 focus:ring-emerald-300 p-4 sm:p-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                      Confirmer le mot de passe
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      {...register("confirmPassword", { required: "Champ requis" })}
                      className={`mt-1 block w-full rounded-xl border ${
                        errors.confirmPassword ? "border-red-500" : "border-gray-300"
                      } focus:border-emerald-500 focus:ring-4 focus:ring-emerald-300 p-4 sm:p-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    Valider l&apos;inscription
                  </button>
                </form>

                <p className="text-center text-sm sm:text-base text-gray-500 mt-6">
                  Déjà un compte ?{" "}
                  <a href="/login" className="text-emerald-600 hover:underline font-medium">
                    Se connecter
                  </a>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <style jsx>{`
          @keyframes animateSlow {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(20px);
            }
          }
          .animate-animateSlow {
            animation: animateSlow 10s ease-in-out infinite;
          }
        `}</style>
      </div>
    </>
  );
}
