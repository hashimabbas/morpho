// resources/js/components/VisionMission.tsx

export default function VisionMission() {
    const vision =
        'To be the leading technical authority in the Gulf region and globally in the field of smart cold chain management, by providing innovative technological solutions that support sustainability, enhance product quality, and protect against environmental risks and spoilage.';
    const mission =
        'To revolutionize the cold supply chain by developing integrated, AI-powered cloud systems and IoT devices, empowering businesses to monitor and track their refrigerated products with unparalleled precision and transparency.';

    return (
        <section className="bg-slate-50 py-16 sm:py-24 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        Our Core Purpose
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Our vision sets the destination, and our mission paves the way—uniting innovation and reliability
                        to redefine the future of logistics.
                    </p>
                </div>

                {/* --- Integrated Vision & Mission Block --- */}
                <div className="relative mt-16">
                    {/* Background Glow Effect (Dark Mode Only) */}
                    <div className="absolute -inset-4 -z-10 hidden rounded-3xl bg-gradient-to-br from-morpho/20 to-cyan-400/20 opacity-0 blur-3xl dark:block starting:opacity-0 starting:delay-300 transition-opacity duration-1000 ease-in-out"></div>

                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/60 to-white/30 p-1 shadow-lg ring-1 ring-black/5 backdrop-blur-xl dark:from-gray-800/60 dark:to-gray-900/30 dark:ring-white/10">
                        <div className="grid grid-cols-1 items-stretch divide-y divide-gray-300/50 dark:divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
                            {/* Vision Column */}
                            <div className="flex flex-col gap-6 p-8 text-center md:p-10 md:text-left lg:p-12">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/80 shadow-inner dark:bg-black/20 md:mx-0">
                                    <img src="/icons/vision.png" alt="Vision Icon" className="h-10 w-10" />
                                </div>
                                <div className="flex flex-1 flex-col">
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Our Vision</h3>
                                    <p className="mt-4 flex-1 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                                        {vision}
                                    </p>
                                </div>
                            </div>

                            {/* Mission Column */}
                            <div className="flex flex-col gap-6 p-8 text-center md:p-10 md:text-left lg:p-12">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/80 shadow-inner dark:bg-black/20 md:mx-0">
                                    <img src="/icons/mission.png" alt="Mission Icon" className="h-10 w-10" />
                                </div>
                                <div className="flex flex-1 flex-col">
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        Our Mission
                                    </h3>
                                    <p className="mt-4 flex-1 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                                        {mission}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
