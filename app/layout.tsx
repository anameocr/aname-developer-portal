import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ANAME AI — Document Intelligence API per professionisti italiani",
  description:
    "API estrazione dati strutturati da documenti italiani: rogiti, visure, mutui, fatture, busta paga. 23 endpoint dedicati. JSON tipizzato. GDPR by design.",
  keywords: [
    "API estrazione documenti",
    "document intelligence Italia",
    "OCR rogito notarile",
    "API visura catastale",
    "document AI Italia",
  ],
  openGraph: {
    title: "ANAME AI Document Intelligence API",
    description: "Estrazione dati strutturati da documenti italiani con AI",
    url: "https://developers.anameai.com",
    siteName: "ANAME AI Developers",
    locale: "it_IT",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const NAV = [
  { href: "/", label: "Home" },
  { href: "/quickstart", label: "Quickstart" },
  { href: "/pricing", label: "Pricing" },
  { href: "https://api.anameai.com/api/docs", label: "API Docs", ext: true },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={`${inter.className} bg-white text-slate-900 antialiased`}>
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="text-blue-600">ANAME</span>
              <span className="text-slate-400 font-normal text-sm">Developers</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              {NAV.map((l) =>
                l.ext ? (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition-colors">{l.label} ↗</a>
                ) : (
                  <Link key={l.href} href={l.href} className="text-slate-600 hover:text-blue-600 transition-colors">{l.label}</Link>
                )
              )}
            </nav>
          </div>
        </header>
        <main className="min-h-[calc(100vh-140px)]">{children}</main>
        <footer className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
              <div>
                <h4 className="font-semibold mb-3">ANAME AI</h4>
                <p className="text-slate-500">Document Intelligence per professionisti italiani.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Risorse</h4>
                <ul className="space-y-2 text-slate-500">
                  <li><Link href="/quickstart" className="hover:text-blue-600">Quickstart</Link></li>
                  <li><a href="https://api.anameai.com/api/docs" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">Swagger UI</a></li>
                  <li><a href="https://api.anameai.com/redoc" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">ReDoc</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Contatti</h4>
                <ul className="space-y-2 text-slate-500">
                  <li><a href="mailto:support@anameai.com" className="hover:text-blue-600">support@anameai.com</a></li>
                  <li><a href="https://anameai.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">anameai.com</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200 text-center text-xs text-slate-400">
              &copy; 2026 ANAME AI — Tutti i diritti riservati.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
