import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const teamMembers = [
    {
        name: 'Manal Ali Saeed Al Hatmi',
        role: 'Founder & CEO',
        description: 'Extensive technical experience in deploying AI & IoT solutions in complex logistical environments.',
        initials: 'MA',
        // 1. Add the imageUrl property
        imageUrl: '/images/team/manal-al-hatmi.jpg', // Example path
    },
    {
        name: 'Waleed Nasser Salim Al Thiyabi',
        role: 'Co-founder & CTO',
        description: 'Specialist in smart systems development, software manufacturing platforms, and data security.',
        initials: 'WT',
        // 1. Add the imageUrl property
        imageUrl: '/images/team/waleed-al-thiyabi.jpg', // Example path
    },
];

export default function MeetTheTeam() {
    return (
        <section id="team" className="bg-muted py-16 sm:py-24 scroll-mt-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">Meet Our Leadership</h2>
                    <p className="mt-2 text-lg text-muted-foreground">The driving force behind Morpho's innovation.</p>
                </div>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {teamMembers.map((member) => (
                        <Card key={member.name} className="text-center transition-all hover:shadow-xl hover:-translate-y-1">
                            <CardHeader className="items-center">
                                <Avatar className="h-28 w-28 mb-4 border-4 border-white dark:border-gray-800 shadow-lg">
                                    {/* 2. Use the new imageUrl property here */}
                                    <AvatarImage src={member.imageUrl} alt={`Headshot of ${member.name}`} />
                                    <AvatarFallback>{member.initials}</AvatarFallback>
                                </Avatar>
                                <CardTitle>{member.name}</CardTitle>
                                <CardDescription className="text-primary font-semibold">{member.role}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{member.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
