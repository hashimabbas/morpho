import { Button } from '@/components/ui/button';
import { Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';

const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+968 7997 6223', href: 'tel:+96879976223' },
    { icon: Mail, label: 'Email', value: 'info@morphosct.com', href: 'mailto:info@morphosct.com' },
];

const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/morpho-supply-chain-technologies/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/morpho_om/', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/morpho_om', label: 'Twitter (X)' },
];

export default function ContactDetails() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold">Contact Information</h2>
                <p className="mt-2 text-muted-foreground">
                    Reach out to us directly through any of the channels below.
                </p>
            </div>
            <div className="space-y-6">
                {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full">
                            <item.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{item.label}</h3>
                            <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                                {item.value}
                            </a>
                        </div>
                    </div>
                ))}
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Our Office</h3>
                        <p className="text-muted-foreground">Muscat – Ghala, Sultanate of Oman</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Follow Us</h3>
                <div className="flex items-center gap-4">
                    {socialLinks.map((social) => (
                        <Button key={social.label} variant="outline" size="icon" asChild>
                            <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                                <social.icon className="h-5 w-5" />
                            </a>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}
