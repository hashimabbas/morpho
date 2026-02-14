import { Head } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ColdChainHero from './components/ColdChainHero';
import ColdChainContent from './components/ColdChainContent';
import React from 'react';

export default function ColdChain() {
  return (
    <>
      <Head title="Cold Chain & Refrigerated Transport - Morpho" />

      <Navbar />

      <main>
        <ColdChainHero />
        <ColdChainContent />
      </main>

      <Footer />
    </>
  );
}
