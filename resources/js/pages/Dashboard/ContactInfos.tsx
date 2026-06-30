import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Phone, Mail, MapPin } from 'lucide-react';
import ContactInfoFormDialog from '@/pages/components/dashboard/ContactInfoFormDialog';

interface ContactInfo {
    id: number;
    type: string;
    label: string;
    label_ar: string;
    value: string;
    value_ar: string | null;
    icon: string;
    href: string | null;
    sort_order: number;
}

const iconMap: Record<string, any> = { phone: Phone, mail: Mail, 'map-pin': MapPin };

export default function ContactInfos({ contactInfos }: { contactInfos: ContactInfo[] }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingContactInfo, setEditingContactInfo] = useState<ContactInfo | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard.index') },
        { title: 'Contact Infos', href: route('dashboard.contact-infos.index'), isCurrent: true },
    ];

    const openCreate = () => {
        setEditingContactInfo(null);
        setDialogOpen(true);
    };

    const openEdit = (contactInfo: ContactInfo) => {
        setEditingContactInfo(contactInfo);
        setDialogOpen(true);
    };

    const handleDelete = (contactInfo: ContactInfo) => {
        if (confirm('Delete this contact info?')) {
            router.delete(route('dashboard.contact-infos.destroy', contactInfo.id), { preserveScroll: true });
        }
    };

    const Icon = (name: string) => iconMap[name] || Phone;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Infos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Contact Infos</h1>
                    <Button onClick={openCreate}>
                        <Plus className="h-4 w-4 mr-2" /> Add Contact Info
                    </Button>
                </div>
                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border dark:bg-gray-800 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                <th className="px-4 py-3 text-left font-medium">Icon</th>
                                <th className="px-4 py-3 text-left font-medium">Type</th>
                                <th className="px-4 py-3 text-left font-medium">Label (EN)</th>
                                <th className="px-4 py-3 text-left font-medium">Label (AR)</th>
                                <th className="px-4 py-3 text-left font-medium">Value (EN)</th>
                                <th className="px-4 py-3 text-left font-medium">Value (AR)</th>
                                <th className="px-4 py-3 text-left font-medium">Sort</th>
                                <th className="px-4 py-3 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactInfos.map((info) => {
                                const IconComp = Icon(info.icon);
                                return (
                                    <tr key={info.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="px-4 py-3"><IconComp className="h-5 w-5 text-morpho" /></td>
                                        <td className="px-4 py-3 capitalize">{info.type}</td>
                                        <td className="px-4 py-3">{info.label}</td>
                                        <td className="px-4 py-3">{info.label_ar}</td>
                                        <td className="px-4 py-3">{info.value}</td>
                                        <td className="px-4 py-3">{info.value_ar || '-'}</td>
                                        <td className="px-4 py-3">{info.sort_order}</td>
                                        <td className="px-4 py-3 text-right">
                                            <Button variant="ghost" size="icon" onClick={() => openEdit(info)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(info)}>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {contactInfos.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">No contact infos yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <ContactInfoFormDialog
                isOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
                contactInfo={editingContactInfo}
            />
        </AppLayout>
    );
}
