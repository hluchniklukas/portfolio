import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const caveat = Caveat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lukáš Vávra - Fotograf",
  description: "Profesionální fotograf se zaměřením na svatební a reportážní fotografii",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body className={inter.className}>
        <nav className="absolute top-0 left-0 right-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between h-16 items-center">
              <Link href="/" className="text-xl font-bold hover:text-gray-600 transition-colors">
                Portfolio
              </Link>
              <div className="flex space-x-8">
                <Link href="/" className="hover:text-gray-600 transition-colors">
                  Domů
                </Link>
                <Link href="/galerie" className="hover:text-gray-600 transition-colors">
                  Galerie
                </Link>
                <Link href="/o-mne" className="hover:text-gray-600 transition-colors">
                  O mně
                </Link>
                <Link href="/kontakt" className="hover:text-gray-600 transition-colors">
                  Kontakt
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <footer className="bg-gray-100 py-6">
          <div className="container mx-auto px-4 text-center text-gray-600">
            © {new Date().getFullYear()} Portfolio. Všechna práva vyhrazena.
          </div>
        </footer>
      </body>
    </html>
  );
}
