import Card from "@/components/ui/Card"
import {Button} from "@/components/ui/button"

export default function DashboardPatient() {
  return (
    <main className="p-6 bg-background min-h-screen">
      <h1 className="text-2xl font-heading text-primary mb-6">Bonjour, Marie 👋</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <h2 className="font-heading text-lg">📅 Rendez-vous</h2>
          <p className="text-gray-600 mt-2">Prochain : 12 Septembre</p>
          <Button variant="destructive" className="mt-4">Prendre un RDV</Button>
        </Card>

        <Card>
          <h2 className="font-heading text-lg">💊 Mes prescriptions</h2>
          <p className="text-gray-600 mt-2">2 prescriptions actives</p>
          <Button className="mt-4">Nouvelle demande</Button>
        </Card>

        <Card>
          <h2 className="font-heading text-lg">🏥 Pharmacies</h2>
          <p className="text-gray-600 mt-2">Pharmacie St-Michel (à 1,2 km)</p>
          <Button variant="secondary" className="mt-4">Voir plus</Button>
        </Card>
      </div>
    </main>
  )
}
