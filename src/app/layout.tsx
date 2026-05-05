import './globals.css';
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
<html lang="es">
      <body className="bg-gray-100 text-gray-800 font-sans min-h-screen flex flex-col">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600 tracking-wide">Marketplace</h1>
            <nav className="flex gap-4">
              <Link href="/" className="text-gray-700 hover:text-indigo-600 transition font-medium">Inicio</Link>
              <Link href="/ads/create" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition font-medium">Vender</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto px-6 py-8 ">{children}</main>

        <footer className="bg-white mt-8 shadow-inner">
          <div className="max-w-7xl mx-auto px-6 py-4 text-center text-gray-500 text-sm">
            &copy; 2026 Marketplace. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}