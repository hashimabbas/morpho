import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Calendar, MapPin } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function OurStory() {
    const { __ } = useTranslation();

    return (
        <section className="py-16 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">{__('about.our_story.title')}</h2>
                    <p className="mt-2 text-lg text-muted-foreground">
                        {__('about.our_story.subtitle')}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <Card>
                        <CardHeader>
                            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                                <Calendar className="h-8 w-8" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="text-xl font-semibold">{__('about.our_story.founded')}</CardTitle>
                            <p className="text-muted-foreground mt-1">{__('about.our_story.founded_value')}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                                <MapPin className="h-8 w-8" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="text-xl font-semibold">{__('about.our_story.location')}</CardTitle>
                            <p className="text-muted-foreground mt-1">{__('about.our_story.location_value')}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                                <Building className="h-8 w-8" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="text-xl font-semibold">{__('about.our_story.legal_entity')}</CardTitle>
                            <p className="text-muted-foreground mt-1">{__('about.our_story.legal_entity_value')}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
