"use client";

import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Link from "next/link";

type ResetPasswordFormInputs = {
  email: string;
};

export default function ResetPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormInputs>();

  const onSubmit = (data: ResetPasswordFormInputs) => {
    console.log("Reset password request:", data);
    // Ici appel API pour envoyer email reset
  };

  return (
    <>
      <Helmet>
        <title>Réinitialiser le mot de passe - Pharmatrack</title>
      </Helmet>

      <div className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 sm:p-6 lg:p-8 relative overflow-hidden">

        {/* Formes décoratives */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-200 rounded-full filter blur-3xl opacity-30 animate-animateSlow"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-300 rounded-full filter blur-3xl opacity-30 animate-animateSlow"></div>

        {/* Conteneur principal */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 relative">

          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-600 text-center mb-6">
            Réinitialiser le mot de passe
          </h1>

          <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
            Entrez votre email pour recevoir un lien de réinitialisation du mot de passe.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Champ requis" })}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300 focus:border-emerald-500"
                } focus:ring-emerald-500 p-3 sm:p-4`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 sm:py-4 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
            >
              Envoyer le lien
            </button>
          </form>

          <p className="text-center text-sm sm:text-base text-gray-500 mt-6">
            Retour à la{" "}
            <Link href="/login" className="text-emerald-600 hover:underline font-medium">
              connexion
            </Link>
          </p>
        </div>

        <style jsx>{`
          @keyframes animateSlow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(20px); }
          }
          .animate-animateSlow {
            animation: animateSlow 10s ease-in-out infinite;
          }
        `}</style>
      </div>
    </>
  );
}
