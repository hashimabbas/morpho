import { Head } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WarehousingHero from './components/WarehousingHero';
import WarehousingContent from './components/WarehousingContent';
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

export default function Warehousing({ ecosystem }: Props) {
    if (ecosystem) {
        return <SolutionDetail ecosystem={ecosystem} />;
    }

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
