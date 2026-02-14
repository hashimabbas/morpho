import { Head } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WarehousingHero from './components/WarehousingHero';
import WarehousingContent from './components/WarehousingContent';
import React from 'react';

export default function Warehousing() {
  return (
    <>
      <Head title="Smart Warehousing & Supply Chain - Morpho" />

      <Navbar />

      <main>
        <WarehousingHero />
        <WarehousingContent />
      </main>

      <Footer />
    </>
  );
}
