// resources/js/components/OurPartners.tsx

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';

type Partner = {
    id: number;
    name: string;
    role: string | null;
    logo: string | null;
};

export default function OurPartners() {
    const [partners, setPartners] = useState<Partner[]>([]);

    useEffect(() => {
        fetch('/api/partners')
            .then(res => res.json())
            .then(data => setPartners(data))
            .catch(() => {});
    }, []);
    return (
        <section className="bg-slate-50 py-16 sm:py-24 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        Our Partner Ecosystem
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
                        We collaborate with industry leaders to deliver robust, end-to-end solutions.
                    </p>
                </div>
                <TooltipProvider>
                    <div className="mx-auto mt-16 grid grid-cols-2 items-center gap-x-8 gap-y-12 sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        {partners.map((partner, index) => (
                            <Tooltip key={partner.name}>
                                <TooltipTrigger asChild>
                                    <div
                                        className={`flex justify-center opacity-100 w-full transition-all delay-${100 * (index % 5)} duration-700 ease-in-out starting:translate-y-4 starting:opacity-0`}
                                    >
                                        <img
                                            className="h-40 w-auto object-contain"
                                            src={partner.logo ? `/${partner.logo}` : ''}
                                            alt={partner.name}
                                        />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="font-semibold">{partner.name}</p>
                                    {partner.role && <p className="text-xs text-muted-foreground">{partner.role}</p>}
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                </TooltipProvider>
            </div>
        </section>
    );
}
