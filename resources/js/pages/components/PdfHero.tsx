import React from 'react';

const PdfHero = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-[#F8FAFC] dark:bg-[#030712]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(0,169,193,0.05),transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-xl font-bold tracking-widest uppercase text-morpho mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Resources & Documentation
        </h2>
        <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-7xl leading-tight tracking-tight text-gray-900 dark:text-white mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
          <span className="text-morpho">Morpho</span> Smart Solution
        </h1>
      </div>
    </section>
  );
};

export default PdfHero;
