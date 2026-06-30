import { Head } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutHero from './components/AboutHero';
import OurStory from './components/OurStory';
import VisionMission from './components/VisionMission';
import Achievements from './components/Achievements';
import CoreValues from './components/CoreValues';
import MeetTheTeam from './components/MeetTheTeam';
import PartnerEcosystem from './components/PartnerEcosystem';

interface CoreValueData {
    id: number;
    icon: string;
    title: string;
    description: string;
}

interface TeamMemberData {
    id: number;
    name: string;
    role: string;
    description: string;
    image_url: string | null;
}

interface Props {
    coreValues: CoreValueData[];
    teamMembers: TeamMemberData[];
}

export default function About({ coreValues, teamMembers }: Props) {
    const { __ } = useTranslation();

    return (
        <>
            <Head title={__('about.head_title')} />
            <Navbar />
            <main>
                <AboutHero />
                <OurStory />
                <VisionMission />
                <CoreValues coreValues={coreValues} />
                <MeetTheTeam teamMembers={teamMembers} />
                <Achievements />
                <PartnerEcosystem />
            </main>
            <Footer />
        </>
    );
}
