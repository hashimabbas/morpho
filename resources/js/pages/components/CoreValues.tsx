import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ShieldCheck, Leaf, Target, Handshake } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const values: { icon: LucideIcon, title: string, description: string }[] = [
    { icon: Zap, title: "Innovation", description: "Integrating the latest technologies for superior performance and market needs." },
    { icon: ShieldCheck, title: "Trust & Security", description: "Ensuring product safety and quality throughout the supply chain with precise tools." },
    { icon: Leaf, title: "Sustainability", description: "Adopting smart solutions that reduce waste and protect the environment." },
    { icon: Target, title: "Professionalism & Efficiency", description: "Delivering flexible, results-oriented solutions with dedication and intelligence." },
    { icon: Handshake, title: "Transparency", description: "Absolute transparency in collaboration with our clients and partners." },
];

export default function CoreValues() {
    return (
        <section id="values" className="py-16 sm:py-24 scroll-mt-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">Our Core Values</h2>
                    <p className="mt-2 text-lg text-muted-foreground">The principles that guide our every decision.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((value) => (
                        <div key={value.title} className="flex gap-6">
                            <value.icon className="h-8 w-8 text-morpho  flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-xl font-semibold">{value.title}</h3>
                                <p className="text-muted-foreground mt-1">{value.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
