// resources/js/pages/Welcome.tsx

import { type SharedData } from '@/types';
import { Head } from '@inertiajs/react';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import VisionMission from './components/VisionMission'; // 1. Import the new component
import ServicesSolutions from './components/ServicesSolutions';
import TargetMarket from './components/TargetMarket';
import CurrentChallenges from './components/CurrentChallenges';
import Footer from './components/Footer';
import Achievements from './components/Achievements';
import OurPartners from './components/OurPartners';

export default function Welcome() {
    return (
        <>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <Navbar />

            <main>
                <HeroSection />
                <OurPartners />
                <VisionMission />
                <ServicesSolutions />
                <TargetMarket />
                <CurrentChallenges />
                <Achievements />
            </main>

            <Footer />
        </>
    );
}
