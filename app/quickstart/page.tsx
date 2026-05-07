import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Quickstart — ANAME AI Developer Portal",
  description: "Guida rapida per integrare l'API ANAME AI in 5 minuti. Esempi curl, Python, JavaScript.",
};

const CURL_UPLOAD = `curl -X POST https://api.anameai.com/api/v1/extract/atto_vendita_it \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -F "file=@rogito.pdf"`;

const CURL_POLL = `curl https://api.anameai.com/api/v1/jobs/550e8400-... \\
  -H "X-API-Key: YOUR_API_KEY"`;

const PY = `import requests, time

API_KEY = "YOUR_API_KEY"
BASE = "https://api.anameai.com"
HEADERS = {"X-API-Key": API_KEY}

# 1. Upload
with open("rogito.pdf", "rb") as f:
    r = requests.post(f"{BASE}/api/v1/extract/atto_vendita_it",
                      headers=HEADERS, files={"file": f})
job = r.json()
print(f"Job: {job['job_id']}")

# 2. Polling
while True:
    r = requests.get(f"{BASE}{job['poll_url']}", headers=HEADERS)
    status = r.json()
    if status["status"] == "completed":
        print(f"Tipo: {status['document_type']}")
        print(f"Entita: {status['entities']}")
        break
    elif status["status"] == "failed":
        print(f"Errore: {status['error']}")
        break
    time.sleep(5)`;

const JS = `const API_KEY = "YOUR_API_KEY";
const BASE = "https://api.anameai.com";

// 1. Upload
const form = new FormData();
form.append("file", fileInput.files[0]);

const { job_id, poll_url } = await fetch(
  \`\${BASE}/api/v1/extract/atto_vendita_it\`,
  { method: "POST", headers: { "X-API-Key": API_KEY }, body: form }
).then(r => r.json());

// 2. Polling
const poll = async () => {
  const res = await fetch(\`\${BASE}\${poll_url}\`, {
    headers: { "X-API-Key": API_KEY }
  }).then(r => r.json());

  if (res.status === "completed") return res.entities;
  if (res.status === "failed") throw new Error(res.error);
  await new Promise(r => setTimeout(r, 5000));
  return poll();
};

const entities = await poll();`;

const RESPONSE = `{
  "job_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "completed",
  "document_type": "atto_vendita_it",
  "processing_time_seconds": 38.5,
  "entities": {
    "document_type": "atto_vendita_it",
    "country": "IT",
    "notaio_nome": "Mario Rossi",
    "data_atto": "2024-03-15",
    "prezzo_vendita": 250000.0,
    "venditori": [
      { "nome": "Luigi", "cognome": "Bianchi", "codice_fiscale": "BNCLGU..." }
    ],
    "immobili": [
      { "foglio": "12", "particella": "345", "subalterno": "1", "categoria": "A/2" }
    ]
  }
}`;

function Code({ children, lang }: { children: string; lang: string }) {
  return (
    <div className="bg-slate-900 rounded-lg p-5 text-sm overflow-x-auto">
      <span className="text-slate-400 text-xs font-mono">{lang}</span>
      <pre className="text-green-400 font-mono mt-2 whitespace-pre-wrap">{children}</pre>
    </div>
  );
}

export default function QuickstartPage() {
  return (
    <div className="py-16 px-6">
      <div className="mx-auto max-w-3xl">
        <Badge variant="outline" className="mb-4">5 minuti</Badge>
        <h1 className="text-3xl font-bold mb-4">Quickstart</h1>
        <p className="text-slate-600 mb-10">Integra l&apos;API ANAME AI nella tua applicazione in 5 step.</p>

        <div className="space-y-12">
          {/* Step 1 */}
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Ottieni una API Key</h2>
            <p className="text-sm text-slate-600 mb-4">
              Scrivi a <a href="mailto:support@anameai.com?subject=Richiesta API Key" className="text-blue-600 underline">support@anameai.com</a> indicando
              la tua organizzazione e il volume stimato. Riceverai una chiave in 24h.
            </p>
          </section>

          {/* Step 2 */}
          <section>
            <h2 className="text-xl font-semibold mb-2">2. Scegli l&apos;endpoint</h2>
            <p className="text-sm text-slate-600 mb-4">
              19 endpoint dedicati per tipo documento italiano + 1 auto-detect + 1 nota generica.
              Se conosci il tipo, usa l&apos;endpoint dedicato (skip classifier, -1-2s).
            </p>
            <Code lang="endpoint">{`POST /api/v1/extract/atto_vendita_it      # Rogito notarile
POST /api/v1/extract/mutuo_ipotecario_it  # Mutuo ipotecario
POST /api/v1/extract/visura_catastale_it  # Visura catastale
POST /api/v1/extract/busta_paga_it        # Busta paga
POST /api/v1/extract/auto                 # Auto-detect (classifier AI)
...e altri 18 tipi`}</Code>
          </section>

          {/* Step 3 */}
          <section>
            <h2 className="text-xl font-semibold mb-2">3. Upload il documento</h2>
            <Tabs defaultValue="curl" className="mt-4">
              <TabsList>
                <TabsTrigger value="curl">curl</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="js">JavaScript</TabsTrigger>
              </TabsList>
              <TabsContent value="curl"><Code lang="bash">{CURL_UPLOAD}</Code></TabsContent>
              <TabsContent value="python"><Code lang="python">{PY}</Code></TabsContent>
              <TabsContent value="js"><Code lang="javascript">{JS}</Code></TabsContent>
            </Tabs>
          </section>

          {/* Step 4 */}
          <section>
            <h2 className="text-xl font-semibold mb-2">4. Polling status</h2>
            <p className="text-sm text-slate-600 mb-4">
              Chiama ogni 3-5 secondi fino a <code className="bg-slate-100 px-1 rounded">status: completed</code>.
              Il polling non consuma quota API.
            </p>
            <Code lang="bash">{CURL_POLL}</Code>
          </section>

          {/* Step 5 */}
          <section>
            <h2 className="text-xl font-semibold mb-2">5. Ricevi il JSON strutturato</h2>
            <p className="text-sm text-slate-600 mb-4">
              Lo schema JSON dipende dal tipo documento. Ogni campo e tipizzato (string, float, array, nested).
            </p>
            <Code lang="json">{RESPONSE}</Code>
          </section>
        </div>
      </div>
    </div>
  );
}
