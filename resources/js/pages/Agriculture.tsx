import { Head } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AgricultureHero from './components/AgricultureHero';
import AgricultureContent from './components/AgricultureContent';
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

export default function Agriculture({ ecosystem }: Props) {
    if (ecosystem) {
        return <SolutionDetail ecosystem={ecosystem} />;
    }

    return (
        <>
            <Head title="Smart Agriculture & Agri-IoT - Morpho" />
            <Navbar />
            <main>
                <AgricultureHero />
                <AgricultureContent />
                <RelatedEntities groupSlugs={['nataj']} title="Agriculture & Food Entities" />
            </main>
            <Footer />
        </>
    );
}
