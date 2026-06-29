import { Head } from '@inertiajs/react';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import VisionMission from './components/VisionMission';
import ServicesSolutions from './components/ServicesSolutions';
import TargetMarket from './components/TargetMarket';
import CurrentChallenges from './components/CurrentChallenges';
import Footer from './components/Footer';
import Achievements from './components/Achievements';
import OurPartners from './components/OurPartners';
import MorphoSCTHighlights from './components/MorphoSCTHighlights';
import TargetEntities from './components/TargetEntities';
import { useTranslation } from '@/hooks/useTranslation';

export default function Welcome() {
    const { __ } = useTranslation();

    return (
        <>
            <Head title={__('homepage.title')} />

            <Navbar />

            <main>
                <HeroSection />
                <OurPartners />
                <MorphoSCTHighlights />
                <VisionMission />
                <ServicesSolutions />
                <TargetMarket />
                <TargetEntities />
                <CurrentChallenges />
                <Achievements />
            </main>

            <Footer />
        </>
    );
}
