import { Head } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutHero from './components/AboutHero';
import OurStory from './components/OurStory';
import VisionMission from './components/VisionMission';
import Achievements from './components/Achievements';
import CoreValues from './components/CoreValues';
import MeetTheTeam from './components/MeetTheTeam';
import PartnerEcosystem from './components/PartnerEcosystem';


export default function About() {
    return (
        <>
            <Head title="About Us - Morpho" />
            <Navbar />
            <main>
                <AboutHero />
                <OurStory />
                <VisionMission />
                <CoreValues />
                <MeetTheTeam />
                <Achievements />
                <PartnerEcosystem />
            </main>
            <Footer />
        </>
    );
}
