import { Head } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MarineHero from './components/MarineHero';
import MarineContent from './components/MarineContent';
import React from 'react';

export default function Marine() {
  return (
    <>
      <Head title="Marine & Drone Monitoring - Morpho" />

      <Navbar />

      <main>
        <MarineHero />
        <MarineContent />
      </main>

      <Footer />
    </>
  );
}
