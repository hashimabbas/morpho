import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Linkedin, Instagram, Twitter, Globe } from 'lucide-react';
import SocialLinkFormDialog from '@/pages/components/dashboard/SocialLinkFormDialog';

interface SocialLink {
    id: number;
    platform: string;
    url: string;
    icon: string;
    label: string;
    label_ar: string;
    sort_order: number;
    is_active: boolean;
}

const iconMap: Record<string, any> = { linkedin: Linkedin, instagram: Instagram, twitter: Twitter };

export default function SocialLinks({ socialLinks }: { socialLinks: SocialLink[] }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingSocialLink, setEditingSocialLink] = useState<SocialLink | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard.index') },
        { title: 'Social Links', href: route('dashboard.social-links.index'), isCurrent: true },
    ];

    const openCreate = () => {
        setEditingSocialLink(null);
        setDialogOpen(true);
    };

    const openEdit = (socialLink: SocialLink) => {
        setEditingSocialLink(socialLink);
        setDialogOpen(true);
    };

    const handleDelete = (socialLink: SocialLink) => {
        if (confirm('Delete this social link?')) {
            router.delete(route('dashboard.social-links.destroy', socialLink.id), { preserveScroll: true });
        }
    };

    const Icon = (name: string) => iconMap[name] || Globe;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Social Links" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Social Links</h1>
                    <Button onClick={openCreate}>
                        <Plus className="h-4 w-4 mr-2" /> Add Social Link
                    </Button>
                </div>
                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border dark:bg-gray-800 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                <th className="px-4 py-3 text-left font-medium">Icon</th>
                                <th className="px-4 py-3 text-left font-medium">Platform</th>
                                <th className="px-4 py-3 text-left font-medium">Label (EN)</th>
                                <th className="px-4 py-3 text-left font-medium">Label (AR)</th>
                                <th className="px-4 py-3 text-left font-medium">URL</th>
                                <th className="px-4 py-3 text-left font-medium">Active</th>
                                <th className="px-4 py-3 text-left font-medium">Sort</th>
                                <th className="px-4 py-3 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {socialLinks.map((link) => {
                                const IconComp = Icon(link.icon);
                                return (
                                    <tr key={link.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="px-4 py-3"><IconComp className="h-5 w-5 text-morpho" /></td>
                                        <td className="px-4 py-3 capitalize">{link.platform}</td>
                                        <td className="px-4 py-3">{link.label}</td>
                                        <td className="px-4 py-3">{link.label_ar}</td>
                                        <td className="px-4 py-3 max-w-[200px] truncate">
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{link.url}</a>
                                        </td>
                                        <td className="px-4 py-3">{link.is_active ? 'Yes' : 'No'}</td>
                                        <td className="px-4 py-3">{link.sort_order}</td>
                                        <td className="px-4 py-3 text-right">
                                            <Button variant="ghost" size="icon" onClick={() => openEdit(link)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(link)}>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {socialLinks.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">No social links yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <SocialLinkFormDialog
                isOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
                socialLink={editingSocialLink}
            />
        </AppLayout>
    );
}
