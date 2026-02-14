import { Head } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AgricultureHero from './components/AgricultureHero';
import AgricultureContent from './components/AgricultureContent';
import React from 'react';
import AgricultureContentCopy from './components/AgricultureContentCopy';

export default function Agriculture() {
  return (
    <>
      <Head title="Smart Agriculture & Agri-IoT - Morpho" />

      <Navbar />

      <main>
        <AgricultureHero />
        <AgricultureContent />
      </main>

      <Footer />
    </>
  );
}
