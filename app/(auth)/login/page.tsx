import {Button} from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-heading text-center text-primary mb-4">Connexion</h2>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg px-3 py-2 focus:outline-primary"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="border rounded-lg px-3 py-2 focus:outline-primary"
          />
          <Button type="submit">Se connecter</Button>
        </form>
      </div>
    </div>
  )
}
