import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from './input-error';

type TeamMember = {
    id: number;
    name: string;
    role: string;
    description: string;
    image_url: string | null;
    name_ar: string | null;
    role_ar: string | null;
    description_ar: string | null;
    sort_order: number;
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
    teamMember?: TeamMember | null;
}

export default function TeamMemberFormDialog({ isOpen, onClose, teamMember }: Props) {
    const [langTab, setLangTab] = useState<'en' | 'ar'>('en');

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST' as string,
        name: '',
        role: '',
        description: '',
        image_url: '',
        name_ar: '',
        role_ar: '',
        description_ar: '',
        sort_order: 0,
    });

    const isEditing = !!teamMember;

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (teamMember) {
                setData({
                    _method: 'PUT' as string,
                    name: teamMember.name,
                    role: teamMember.role,
                    description: teamMember.description,
                    image_url: teamMember.image_url || '',
                    name_ar: teamMember.name_ar || '',
                    role_ar: teamMember.role_ar || '',
                    description_ar: teamMember.description_ar || '',
                    sort_order: teamMember.sort_order,
                });
            } else {
                setData({
                    _method: 'POST' as string,
                    name: '',
                    role: '',
                    description: '',
                    image_url: '',
                    name_ar: '',
                    role_ar: '',
                    description_ar: '',
                    sort_order: 0,
                });
            }
        }
    }, [isOpen, teamMember]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const routeName = isEditing ? 'dashboard.team-members.update' : 'dashboard.team-members.store';
        const routeParams = isEditing ? { teamMember: teamMember!.id } : {};
        post(route(routeName, routeParams), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const handleClose = () => {
        reset();
        clearErrors();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Team Member' : 'Create Team Member'}</DialogTitle>
                    <DialogDescription>This information will be displayed on the About page.</DialogDescription>
                </DialogHeader>

                <div className="flex gap-2 border-b pb-2 mb-4">
                    <button
                        type="button"
                        onClick={() => setLangTab('en')}
                        className={`px-4 py-2 text-sm font-medium rounded-t transition ${langTab === 'en' ? 'border-b-2 border-morpho text-morpho' : 'text-muted-foreground'}`}
                    >
                        English
                    </button>
                    <button
                        type="button"
                        onClick={() => setLangTab('ar')}
                        className={`px-4 py-2 text-sm font-medium rounded-t transition ${langTab === 'ar' ? 'border-b-2 border-morpho text-morpho' : 'text-muted-foreground'}`}
                    >
                        العربية
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {langTab === 'en' ? (
                        <>
                            <div>
                                <Label htmlFor="name">Name (English)</Label>
                                <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
                                <InputError message={errors.name} />
                            </div>
                            <div>
                                <Label htmlFor="role">Role (English)</Label>
                                <Input id="role" value={data.role} onChange={e => setData('role', e.target.value)} />
                                <InputError message={errors.role} />
                            </div>
                            <div>
                                <Label htmlFor="description">Description (English)</Label>
                                <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows={3} />
                                <InputError message={errors.description} />
                            </div>
                            <div>
                                <Label htmlFor="image_url">Image URL</Label>
                                <Input id="image_url" value={data.image_url} onChange={e => setData('image_url', e.target.value)} placeholder="/images/team/photo.jpg" />
                                <InputError message={errors.image_url} />
                            </div>
                            <div>
                                <Label htmlFor="sort_order">Sort Order</Label>
                                <Input id="sort_order" type="number" value={data.sort_order} onChange={e => setData('sort_order', Number(e.target.value))} />
                                <InputError message={errors.sort_order} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <Label htmlFor="name_ar">الاسم (عربي)</Label>
                                <Input id="name_ar" value={data.name_ar} onChange={e => setData('name_ar', e.target.value)} dir="rtl" className="font-arabic" />
                                <InputError message={errors.name_ar} />
                            </div>
                            <div>
                                <Label htmlFor="role_ar">المسمى (عربي)</Label>
                                <Input id="role_ar" value={data.role_ar} onChange={e => setData('role_ar', e.target.value)} dir="rtl" className="font-arabic" />
                                <InputError message={errors.role_ar} />
                            </div>
                            <div>
                                <Label htmlFor="description_ar">الوصف (عربي)</Label>
                                <Textarea id="description_ar" value={data.description_ar} onChange={e => setData('description_ar', e.target.value)} rows={3} dir="rtl" className="font-arabic" />
                                <InputError message={errors.description_ar} />
                            </div>
                        </>
                    )}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        <Button type="submit" disabled={processing}>
                            {isEditing ? 'Update' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
