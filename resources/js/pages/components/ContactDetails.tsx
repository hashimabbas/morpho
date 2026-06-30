import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Linkedin, Instagram, Twitter, Globe } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';

interface ContactInfoItem {
    id: number;
    type: string;
    label: string;
    value: string;
    icon: string;
    href: string | null;
}

interface SocialLinkItem {
    id: number;
    platform: string;
    url: string;
    icon: string;
    label: string;
}

interface Props {
    contactInfos: ContactInfoItem[];
    socialLinks: SocialLinkItem[];
}

const iconMap: Record<string, any> = {
    phone: Phone,
    mail: Mail,
    'map-pin': MapPin,
    linkedin: Linkedin,
    instagram: Instagram,
    twitter: Twitter,
};

export default function ContactDetails({ contactInfos, socialLinks }: Props) {
    const { __ } = useTranslation();
    const { locale } = usePage<PageProps>().props;
    const isRtl = locale === 'ar';

    const getIcon = (iconName: string) => iconMap[iconName] || Globe;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{__('contact.details.title')}</h2>
                <p className="mt-2 text-muted-foreground dark:text-gray-400">
                    {__('contact.details.description')}
                </p>
            </div>
            <div className="space-y-6">
                {contactInfos.map((item) => {
                    const IconComp = getIcon(item.icon);
                    return (
                        <div key={item.id} className="flex items-start gap-4">
                            <div className="bg-primary/10 text-primary p-3 rounded-full">
                                <IconComp className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.label}</h3>
                                {item.href ? (
                                    <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-primary">
                                        {item.value}
                                    </a>
                                ) : (
                                    <p className="text-muted-foreground dark:text-gray-400">{item.value}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            {socialLinks.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{__('contact.details.follow_us')}</h3>
                    <div className={`flex items-center gap-4 ${isRtl ? 'flex-row' : 'flex-row'}`}>
                        {socialLinks.map((link) => {
                            const IconComp = getIcon(link.icon);
                            return (
                                <Button key={link.id} variant="outline" size="icon" asChild>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                                        <IconComp className="h-5 w-5" />
                                    </a>
                                </Button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
