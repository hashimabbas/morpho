import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Calendar, MapPin } from 'lucide-react';

export default function OurStory() {
    return (
        <section className="py-16 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
                    <p className="mt-2 text-lg text-muted-foreground">
                        Forged in Oman, with a vision for the world.
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
                            <h3 className="text-xl font-semibold">Founded</h3>
                            <p className="text-muted-foreground mt-1">October 2023</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                                <MapPin className="h-8 w-8" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-xl font-semibold">Location</h3>
                            <p className="text-muted-foreground mt-1">Muscat - Ghala, Oman</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                                <Building className="h-8 w-8" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-xl font-semibold">Legal Entity</h3>
                            <p className="text-muted-foreground mt-1">Limited Liability Company (LLC)</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
