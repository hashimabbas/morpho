import { Head } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MarineHero from './components/MarineHero';
import MarineContent from './components/MarineContent';
import RelatedEntities from './components/RelatedEntities';
import SolutionDetail from './SolutionDetail';
import React from 'react';

interface Ecosystem {
    id: number;
    type: string;
    slug: string;
    icon: string;
    title: string;
    description: string;
    image: string | null;
    href: string | null;
    features: string[];
    content: any;
    subtitle: string | null;
    sort_order: number;
    is_visible: boolean;
}

interface Props {
    ecosystem?: Ecosystem;
}

export default function Marine({ ecosystem }: Props) {
    if (ecosystem) {
        return <SolutionDetail ecosystem={ecosystem} />;
    }

    return (
        <>
            <Head title="Marine & Drone Monitoring - Morpho" />
            <Navbar />
            <main>
                <MarineHero />
                <MarineContent />
                <RelatedEntities groupSlugs={['asyad']} title="Marine & Port Entities" />
            </main>
            <Footer />
        </>
    );
}
