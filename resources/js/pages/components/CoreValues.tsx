import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { getIcon } from '@/lib/icons';

interface CoreValueData {
    id: number;
    icon: string;
    title: string;
    description: string;
}

interface Props {
    coreValues: CoreValueData[];
}

export default function CoreValues({ coreValues }: Props) {
    const { __ } = useTranslation();

    return (
        <section id="values" className="py-16 sm:py-24 scroll-mt-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">{__('about.core_values.title')}</h2>
                    <p className="mt-2 text-lg text-muted-foreground">{__('about.core_values.subtitle')}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coreValues.map((value) => {
                        const IconComponent = getIcon(value.icon);
                        return (
                            <div key={value.id} className="flex gap-6">
                                <IconComponent className="h-8 w-8 text-morpho flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-xl font-semibold">{value.title}</h3>
                                    <p className="text-muted-foreground mt-1">{value.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
