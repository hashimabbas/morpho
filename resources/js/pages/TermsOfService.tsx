// resources/js/pages/TermsOfService.tsx


import { Head } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function TermsOfService() {
    return (
        <>
            <Head title="Terms of Service">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <Navbar />

            <main className="bg-white py-16 sm:py-24 dark:bg-gray-900">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-morpho sm:text-5xl">
                            Terms of Service
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Last Updated: August 1, 2024
                        </p>
                    </div>

                    <div className="prose prose-lg mx-auto mt-12 text-gray-700 dark:prose-invert dark:text-gray-300">
                        <h2>1. Agreement to Terms</h2>
                        <p>
                            By using our website,{' '}
                            <a href="https://www.morphosct.com" className="text-morpho hover:underline">
                                www.morphosct.com
                            </a>
                            (the "Site"), you agree to be bound by these Terms of Service. If you do not agree to these
                            terms, please do not use the Site.
                        </p>

                        <h2>2. User Accounts</h2>
                        <p>
                            If you create an account on the Site, you are responsible for maintaining the security of
                            your account and you are fully responsible for all activities that occur under the account.
                            You must immediately notify us of any unauthorized uses of your account or any other
                            breaches of security.
                        </p>

                        <h2>3. Intellectual Property</h2>
                        <p>
                            The Site and its original content, features, and functionality are owned by Morpho Supply
                            Chain Technologies and are protected by international copyright, trademark, patent, trade
                            secret, and other intellectual property or proprietary rights laws.
                        </p>

                        <h2>4. Prohibited Activities</h2>
                        <p>You agree not to use the Site for any unlawful purpose or to solicit others to perform or participate in any unlawful acts. You are prohibited from violating or attempting to violate the security of the Site.</p>

                        <h2>5. Termination</h2>
                        <p>
                            We may terminate or suspend your access to our Site immediately, without prior notice or
                            liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>

                        <h2>6. Limitation of Liability</h2>
                        <p>
                            In no event shall Morpho Supply Chain Technologies, nor its directors, employees, partners,
                            agents, suppliers, or affiliates, be liable for any indirect, incidental, special,
                            consequential or punitive damages, including without limitation, loss of profits, data,
                            use, goodwill, or other intangible losses, resulting from your access to or use of or
                            inability to access or use the Site.
                        </p>

                        <h2>7. Governing Law</h2>
                        <p>
                            These Terms shall be governed and construed in accordance with the laws of the Sultanate of Oman, without regard to its conflict of law provisions.
                        </p>

                        <h2>8. Changes to These Terms</h2>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                            What constitutes a material change will be determined at our sole discretion. We will provide
                            notice of changes by posting the new Terms on this page.
                        </p>

                        <h2>9. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at:
                            <br />
                            <strong>Email:</strong> info@morphosct.com
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
