import React from 'react';
import { Info, MousePointer2, Download, Eye } from 'lucide-react';

const PdfInstructions = () => {
  return (
    <section className="py-12 bg-gray-50/50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-morpho/10 text-morpho text-sm font-bold uppercase tracking-wider mb-4">
              <Info className="w-4 h-4" />
              How to use
            </div>

          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
                <Eye className="w-5 h-5 text-morpho" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">Instant View</h4>
                <p className="text-sm text-gray-500">Click "View" to open the PDF directly in our interactive viewer.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
                <Download className="w-5 h-5 text-morpho" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">Offline Access</h4>
                <p className="text-sm text-gray-500">Use the download icon to save a copy for offline reading.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PdfInstructions;
