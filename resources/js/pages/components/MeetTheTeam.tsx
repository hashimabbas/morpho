import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

interface TeamMemberData {
    id: number;
    name: string;
    role: string;
    description: string;
    image_url: string | null;
}

interface Props {
    teamMembers: TeamMemberData[];
}

export default function MeetTheTeam({ teamMembers }: Props) {
    const { __ } = useTranslation();

    function getInitials(name: string): string {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }

    return (
        <section id="team" className="bg-muted py-16 sm:py-24 scroll-mt-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">{__('about.meet_team.title')}</h2>
                    <p className="mt-2 text-lg text-muted-foreground">{__('about.meet_team.subtitle')}</p>
                </div>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {teamMembers.map((member) => (
                        <Card key={member.id} className="text-center transition-all hover:shadow-xl hover:-translate-y-1">
                            <CardHeader className="items-center">
                                <Avatar className="h-28 w-28 mb-4 border-4 border-white dark:border-gray-800 shadow-lg">
                                    {member.image_url && <AvatarImage src={member.image_url} alt={member.name} />}
                                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
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
