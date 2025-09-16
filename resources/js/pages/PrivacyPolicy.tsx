// resources/js/pages/PrivacyPolicy.tsx

import { Head } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function PrivacyPolicy() {
    return (
        <>
            <Head title="Privacy Policy">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <Navbar />

            <main className="bg-white py-16 sm:py-24 dark:bg-gray-900">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-morpho sm:text-5xl">
                            Privacy Policy
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Effective Date: August 1, 2024
                        </p>
                    </div>

                    <div className="prose prose-lg mx-auto mt-12 text-gray-700 dark:prose-invert dark:text-gray-300">
                        <p>
                            Morpho Supply Chain Technologies ("we," "our," or "us") is committed to protecting your
                            privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                            information when you visit our website{' '}
                            <a href="https://www.morphosct.com" className="text-morpho hover:underline">
                                www.morphosct.com
                            </a>
                            , including any other media form, media channel, mobile website, or mobile application
                            related or connected thereto (collectively, the "Site").
                        </p>

                        <h2>1. Information We Collect</h2>
                        <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
                        <ul>
                            <li>
                                <strong>Personal Data:</strong> Personally identifiable information, such as your name,
                                shipping address, email address, and telephone number, that you voluntarily give to us
                                when you register with the Site or when you choose to participate in various activities
                                related to the Site, such as online chat and message boards.
                            </li>
                            <li>
                                <strong>Derivative Data:</strong> Information our servers automatically collect when you
                                access the Site, such as your IP address, your browser type, your operating system, your
                                access times, and the pages you have viewed directly before and after accessing the Site.
                            </li>
                            <li>
                                <strong>Financial Data:</strong> We do not collect or store any financial information. All payment processing is handled by third-party vendors.
                            </li>
                        </ul>

                        <h2>2. Use of Your Information</h2>
                        <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
                        <ul>
                            <li>Create and manage your account.</li>
                            <li>Email you regarding your account or order.</li>
                            <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
                            <li>Respond to customer service requests.</li>
                            <li>Improve the efficiency and operation of the Site.</li>
                            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                        </ul>

                        <h2>3. Disclosure of Your Information</h2>
                        <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
                        <ul>
                            <li>
                                <strong>By Law or to Protect Rights:</strong> If we believe the release of information
                                about you is necessary to respond to legal process, to investigate or remedy potential
                                violations of our policies, or to protect the rights, property, and safety of others,
                                we may share your information as permitted or required by any applicable law, rule, or
                                regulation.
                            </li>
                            <li>
                                <strong>Third-Party Service Providers:</strong> We may share your information with
                                third parties that perform services for us or on our behalf, including payment
                                processing, data analysis, email delivery, hosting services, customer service, and
                                marketing assistance.
                            </li>
                        </ul>

                        <h2>4. Security of Your Information</h2>
                        <p>
                            We use administrative, technical, and physical security measures to help protect your
                            personal information. While we have taken reasonable steps to secure the personal
                            information you provide to us, please be aware that despite our efforts, no security
                            measures are perfect or impenetrable, and no method of data transmission can be guaranteed
                            against any interception or other type of misuse.
                        </p>

                        <h2>5. Changes to This Privacy Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time in order to reflect, for example,
                            changes to our practices or for other operational, legal, or regulatory reasons. We will
                            notify you of any changes by posting the new Privacy Policy on this page.
                        </p>

                        <h2>6. Contact Us</h2>
                        <p>
                            If you have questions or comments about this Privacy Policy, please contact us at:
                            <br />
                            <strong>Email:</strong> info@morphosct.com
                            <br />
                            <strong>Phone:</strong> +968 7997 6223
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
