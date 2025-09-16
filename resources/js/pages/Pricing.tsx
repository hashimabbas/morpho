import { Head, usePage } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import type { PageProps } from '@/types';
import ContactHeader from './components/ContactHeader';
import ContactForm from './components/ContactForm';
import PricingDetails from './components/PricingDetails';

export default function Pricing() {
    const { flash } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Pricing - Morpho" />
            <Navbar />
            <PricingDetails />
            <Footer />
        </>
    );
}
