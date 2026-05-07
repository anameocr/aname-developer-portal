import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Pricing — ANAME AI Developer Portal",
  description: "Modello pay-per-call. Nessun abbonamento. Paga solo per i documenti elaborati.",
};

const PLANS = [
  {
    name: "Starter",
    price: "Pay-per-call",
    desc: "Per sviluppatori e piccoli studi",
    features: [
      "23 endpoint dedicati",
      "Nessun canone mensile",
      "10.000 chiamate/ora (anti-abuse)",
      "Supporto email",
      "GDPR compliant",
    ],
    cta: "Inizia gratis",
    href: "mailto:support@anameai.com?subject=Richiesta API Key Starter",
    highlighted: false,
  },
  {
    name: "Business",
    price: "Volume discount",
    desc: "Per studi medi e integratori",
    features: [
      "Tutto Starter +",
      "Sconto volume progressivo",
      "Supporto prioritario",
      "SLA 99.5% uptime",
      "Idempotency-Key header",
      "Webhook callback (Q4 2026)",
    ],
    cta: "Contatta sales",
    href: "mailto:support@anameai.com?subject=Richiesta Piano Business",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Per partner e grandi organizzazioni",
    features: [
      "Tutto Business +",
      "Contratto dedicato + DPA",
      "Worker dedicato (no shared queue)",
      "Custom document types",
      "On-premise deployment opzionale",
      "Account manager dedicato",
    ],
    cta: "Parla con noi",
    href: "mailto:support@anameai.com?subject=Richiesta Piano Enterprise",
    highlighted: false,
  },
];

const FAQ = [
  { q: "Come funziona il pay-per-call?", a: "Paghi solo per i documenti elaborati con successo. Nessun canone mensile, nessun minimo. Il polling status e le chiamate fallite non consumano quota." },
  { q: "Quanto costa una singola estrazione?", a: "Il prezzo dipende dal tipo documento e dalla complessita (numero pagine). Contatta support@anameai.com per un preventivo personalizzato." },
  { q: "C'e un free tier?", a: "Offriamo crediti di test gratuiti per validare l'integrazione. Scrivi a support@anameai.com con la tua use case." },
  { q: "I dati sono sicuri?", a: "Si. Dati processati in EU (Frankfurt), anonimizzazione Presidio pre-AI, zero data retention dopo elaborazione, GDPR compliant by design." },
  { q: "Posso cambiare piano?", a: "Si, in qualsiasi momento. Il modello pay-per-call non ha lock-in: paghi solo quello che usi." },
];

export default function PricingPage() {
  return (
    <div className="py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Pay-per-call</Badge>
          <h1 className="text-3xl font-bold mb-4">Pricing semplice e trasparente</h1>
          <p className="text-slate-600">Nessun abbonamento. Paga solo per i documenti elaborati.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PLANS.map((p) => (
            <Card key={p.name} className={`border ${p.highlighted ? "border-blue-500 shadow-lg" : "border-slate-200"}`}>
              <CardHeader>
                {p.highlighted && <Badge className="w-fit mb-2 bg-blue-600">Consigliato</Badge>}
                <CardTitle className="text-xl">{p.name}</CardTitle>
                <p className="text-2xl font-bold text-blue-600">{p.price}</p>
                <p className="text-sm text-slate-500">{p.desc}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">&#10003;</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href={p.href} className="block">
                  <Button className="w-full" variant={p.highlighted ? "default" : "outline"}>{p.cta}</Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Domande frequenti</h2>
          <div className="space-y-6">
            {FAQ.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold mb-1">{f.q}</h3>
                <p className="text-sm text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
