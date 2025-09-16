import { Head, usePage } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import type { PageProps } from '@/types';
import ContactHeader from './components/ContactHeader';
import ContactDetails from './components/ContactDetails';
import ContactForm from './components/ContactForm';

export default function Contact() {
    const { flash } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Contact Us - Morpho" />
            <Navbar />
            <main>
                <ContactHeader />
                <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* ADD id AND scroll-mt HERE */}
                            <div id="contact-details" className="scroll-mt-20">
                                <ContactDetails />
                            </div>
                            {/* ADD id AND scroll-mt HERE */}
                            <div id="contact-form" className="scroll-mt-20">
                                <ContactForm successMessage={flash?.success} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
