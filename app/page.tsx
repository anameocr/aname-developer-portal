import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DOC_TYPES = [
  { title: "Notarile", count: 7, types: "Rogiti, mutui, compromessi, visure catastali/camerali, APE, atti costitutivi", color: "bg-blue-50 text-blue-700" },
  { title: "Fiscale", count: 7, types: "CU, F24, 730, ISEE, fatture B2B, bollette utenza, buste paga", color: "bg-emerald-50 text-emerald-700" },
  { title: "Immobiliare", count: 2, types: "Planimetrie catastali, contratti di locazione", color: "bg-amber-50 text-amber-700" },
  { title: "Anagrafico", count: 2, types: "Certificati stato civile, documenti identita (CI, passaporto, patente)", color: "bg-violet-50 text-violet-700" },
  { title: "Bancario", count: 1, types: "Estratti conto, comunicazioni periodiche di trasparenza", color: "bg-rose-50 text-rose-700" },
  { title: "Auto-detect", count: 1, types: "Classificatore AI rileva il tipo automaticamente + nota generica multilingua", color: "bg-slate-100 text-slate-700" },
];

const STEPS = [
  { n: "1", title: "POST il documento", desc: "Invia il PDF all'endpoint dedicato. Ricevi un job_id immediato." },
  { n: "2", title: "Polling status", desc: "GET /api/v1/jobs/{id} ogni 3-5s. Nessun consumo quota." },
  { n: "3", title: "JSON strutturato", desc: "status=completed: entities tipizzate per tipo documento." },
];

export default function HomePage() {
  return (
    <>
      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4">23 endpoint dedicati</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Document Intelligence API<br />
            <span className="text-blue-600">per professionisti italiani</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Estrazione dati strutturati da rogiti, visure, mutui, fatture, buste paga e 15+ tipi documento.
            JSON tipizzato. GDPR by design. Pay-per-call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="https://api.anameai.com/api/docs" target="_blank" rel="noopener noreferrer">
              <Button size="lg">Documentazione API</Button>
            </a>
            <a href="mailto:support@anameai.com?subject=Richiesta API Key ANAME AI">
              <Button variant="outline" size="lg">Richiedi API Key</Button>
            </a>
          </div>
          <div className="bg-slate-900 rounded-lg p-6 text-left text-sm overflow-x-auto">
            <span className="text-slate-400 text-xs font-mono">curl</span>
            <pre className="text-green-400 font-mono mt-2 whitespace-pre-wrap">{`curl -X POST https://api.anameai.com/api/v1/extract/atto_vendita_it \\
  -H "X-API-Key: your_api_key" \\
  -F "file=@rogito.pdf"`}</pre>
            <div className="mt-4 pt-4 border-t border-slate-700">
              <span className="text-slate-400 text-xs font-mono">response</span>
              <pre className="text-blue-300 font-mono mt-2 whitespace-pre-wrap">{`{
  "job_id": "550e8400-...",
  "status": "queued",
  "poll_url": "/api/v1/jobs/550e8400-..."
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Cosa estraiamo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOC_TYPES.map((d) => (
              <Card key={d.title} className="border-slate-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{d.title}</CardTitle>
                    <Badge className={d.color}>{d.count} tipi</Badge>
                  </div>
                </CardHeader>
                <CardContent><p className="text-sm text-slate-600">{d.types}</p></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Come funziona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.n} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-lg mb-4">{s.n}</div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-slate-50">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex flex-wrap justify-center gap-4">
            {["GDPR compliant", "Dati in EU (Frankfurt)", "Anonimizzazione Presidio", "OCR EU endpoint", "Zero data retention"].map((b) => (
              <Badge key={b} variant="outline" className="px-4 py-2 text-sm">{b}</Badge>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
