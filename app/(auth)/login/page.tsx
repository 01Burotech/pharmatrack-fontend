"use client";

import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { Helmet } from "react-helmet-async";

type LoginFormInputs = {
  emailOrPhone: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login:", data);
    // TODO: Appel API GraphQL
  };

  const handleGoogleLogin = () => {
    console.log("Google login");
    // TODO: Intégration Google Sign-In
  };

  return (
    <>
      <Helmet>
        <title>Connexion - Pharmatrack</title>
      </Helmet>

      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
        {/* Blob décoratif */}
        <div className="absolute -top-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-200 rounded-full blur-3xl opacity-20 animate-bounce"></div>
        <div className="absolute -bottom-40 -right-40 w-72 sm:w-96 h-72 sm:h-96 bg-teal-300 rounded-full blur-3xl opacity-20 animate-bounce"></div>

        <div className="relative z-10 w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
          <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-center text-emerald-600 dark:text-emerald-400">
              Connexion
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email ou Téléphone */}
              <div>
                <label
                  htmlFor="emailOrPhone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Email ou Téléphone
                </label>
                <input
                  id="emailOrPhone"
                  type="text"
                  placeholder="ex: email@domaine.com ou +22900000000"
                  {...register("emailOrPhone", { required: "Champ requis" })}
                  className={`mt-1 block w-full rounded-xl border p-3 sm:p-4 text-gray-900 dark:text-gray-100 dark:bg-gray-800 ${
                    errors.emailOrPhone
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  } transition-colors`}
                />
                {errors.emailOrPhone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.emailOrPhone.message}
                  </p>
                )}
              </div>

              {/* Mot de passe */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...register("password", { required: "Champ requis" })}
                  className={`mt-1 block w-full rounded-xl border p-3 sm:p-4 text-gray-900 dark:text-gray-100 dark:bg-gray-800 ${
                    errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  } transition-colors`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 sm:py-4 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-[1.02]"
              >
                Se connecter
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
              <span className="mx-2 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                ou
              </span>
              <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
            </div>

            {/* Google */}
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 sm:py-4 px-4 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-transform transform hover:scale-[1.02]"
            >
              <FcGoogle className="h-5 w-5 mr-3" />
              <span className="text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-base">
                Continuer avec Google
              </span>
            </button>

            <p className="text-center text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-6">
              Pas encore de compte ?{" "}
              <Link
                href="/register"
                className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
              >
                S&apos;inscrire
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}



