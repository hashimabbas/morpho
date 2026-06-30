import { Head } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PricingDetails from './components/PricingDetails';
import { useTranslation } from '@/hooks/useTranslation';

export default function Pricing() {
    const { __ } = useTranslation();

    return (
        <>
            <Head title={__('pricing.head_title')} />
            <Navbar />
            <PricingDetails />
            <Footer />
        </>
    );
}
