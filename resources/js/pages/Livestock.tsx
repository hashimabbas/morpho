import { Head } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LivestockHero from './components/LivestockHero';
import LivestockContent from './components/LivestockContent';
import React from 'react';

export default function Livestock() {
  return (
    <>
      <Head title="Livestock & Animal IoT - Morpho" />

      <Navbar />

      <main>
        <LivestockHero />
        <LivestockContent />
      </main>

      <Footer />
    </>
  );
}
