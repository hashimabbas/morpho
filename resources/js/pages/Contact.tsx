import { Head, usePage } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useTranslation } from '@/hooks/useTranslation';

import type { PageProps } from '@/types';
import ContactHeader from './components/ContactHeader';
import ContactDetails from './components/ContactDetails';
import ContactForm from './components/ContactForm';

interface ContactInfoItem {
    id: number;
    type: string;
    label: string;
    value: string;
    icon: string;
    href: string | null;
}

interface SocialLinkItem {
    id: number;
    platform: string;
    url: string;
    icon: string;
    label: string;
}

interface ContactPageProps extends PageProps {
    contactInfos: ContactInfoItem[];
    socialLinks: SocialLinkItem[];
}

export default function Contact() {
    const { flash, contactInfos, socialLinks } = usePage<ContactPageProps>().props;
    const { __ } = useTranslation();

    return (
        <>
            <Head title={__('contact.page_title')} />
            <Navbar />
            <main>
                <ContactHeader />
                <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            <div id="contact-details" className="scroll-mt-20">
                                <ContactDetails contactInfos={contactInfos} socialLinks={socialLinks} />
                            </div>
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
