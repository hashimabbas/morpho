import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PdfHero from './components/PdfHero';
import PdfInstructions from './components/PdfInstructions';
import PdfList from './components/PdfList';
import { X } from 'lucide-react';

export default function Brochures() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] transition-colors duration-300">
      <Head title="Our Brochures - Morpho Smart Technologies" />

      <Navbar />

      <main>
        <PdfHero />
        <PdfInstructions />
        <PdfList onSelect={setSelectedPdf} />
      </main>

      {/* PDF Viewer Overlay */}
      {selectedPdf && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-6xl h-[90vh] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-800">
              <h3 className="font-bold text-gray-900 dark:text-white">Viewing: {selectedPdf}</h3>
              <button
                onClick={() => setSelectedPdf(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 w-full bg-gray-100 dark:bg-gray-800">
              <iframe
                src={`/pdf/${selectedPdf}`}
                className="w-full h-full border-none"
                title="PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
