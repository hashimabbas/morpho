import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from './input-error';
import { availableIcons } from '@/lib/icons';

type TargetEntity = {
    id: number;
    group_name: string;
    group_slug: string;
    owner: string | null;
    entity_name: string;
    activity: string | null;
    morpho_solution: string;
    icon: string | null;
    image: string | null;
    sort_order: number;
    is_visible: boolean;
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
    targetEntity?: TargetEntity | null;
}

const groupOptions = [
    { slug: 'nataj', name: 'Nataj — Food Investment' },
    { slug: 'asyad', name: 'ASYAD — Global Logistics' },
    { slug: 'oq', name: 'OQ Group — Energy' },
    { slug: 'mining', name: 'Mining Development' },
    { slug: 'nama', name: 'Nama — Water & Wastewater' },
];

export default function TargetEntityFormDialog({ isOpen, onClose, targetEntity }: Props) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST' as string,
        group_name: '',
        group_slug: '',
        owner: 'Oman Investment Authority',
        entity_name: '',
        activity: '',
        morpho_solution: '',
        icon: '',
        image: '',
        sort_order: 0,
        is_visible: true,
    });

    const isEditing = !!targetEntity;

    useEffect(() => {
        if (isOpen && isEditing && targetEntity) {
            setData({
                _method: 'PATCH',
                group_name: targetEntity.group_name || '',
                group_slug: targetEntity.group_slug || '',
                owner: targetEntity.owner || '',
                entity_name: targetEntity.entity_name || '',
                activity: targetEntity.activity || '',
                morpho_solution: targetEntity.morpho_solution || '',
                icon: targetEntity.icon || '',
                image: targetEntity.image || '',
                sort_order: targetEntity.sort_order || 0,
                is_visible: targetEntity.is_visible ?? true,
            });
        } else if (isOpen) {
            setData({
                _method: 'POST',
                group_name: '',
                group_slug: '',
                owner: 'Oman Investment Authority',
                entity_name: '',
                activity: '',
                morpho_solution: '',
                icon: '',
                image: '',
                sort_order: 0,
                is_visible: true,
            });
        }
    }, [isOpen, targetEntity, isEditing]);

    const handleGroupChange = (slug: string) => {
        const group = groupOptions.find(g => g.slug === slug);
        setData({
            ...data,
            group_slug: slug,
            group_name: group?.name || '',
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            onSuccess: () => onClose(),
            preserveScroll: true,
        };

        if (isEditing && targetEntity) {
            post(route('dashboard.target-entities.update', targetEntity.id), options);
        } else {
            post(route('dashboard.target-entities.store'), options);
        }
    };

    const handleClose = () => {
        if (!processing) {
            clearErrors();
            reset();
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Target Entity' : 'Create New Target Entity'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Update the details for this entity.' : 'Fill in the details for the new entity.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto px-1">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Group</Label>
                            <Select value={data.group_slug} onValueChange={handleGroupChange}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a group" />
                                </SelectTrigger>
                                <SelectContent>
                                    {groupOptions.map(g => (
                                        <SelectItem key={g.slug} value={g.slug}>{g.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.group_slug} className="col-span-4 col-start-2" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="entity_name" className="text-right">Entity Name</Label>
                            <Input id="entity_name" value={data.entity_name} onChange={e => setData('entity_name', e.target.value)} className="col-span-3" />
                            <InputError message={errors.entity_name} className="col-span-4 col-start-2" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="owner" className="text-right">Owner</Label>
                            <Input id="owner" value={data.owner} onChange={e => setData('owner', e.target.value)} className="col-span-3" />
                            <InputError message={errors.owner} className="col-span-4 col-start-2" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="activity" className="text-right">Activity</Label>
                            <Textarea id="activity" value={data.activity} onChange={e => setData('activity', e.target.value)} className="col-span-3" rows={3} />
                            <InputError message={errors.activity} className="col-span-4 col-start-2" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="morpho_solution" className="text-right">Morpho Solution</Label>
                            <Textarea id="morpho_solution" value={data.morpho_solution} onChange={e => setData('morpho_solution', e.target.value)} className="col-span-3" rows={2} />
                            <InputError message={errors.morpho_solution} className="col-span-4 col-start-2" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="icon" className="text-right">Icon</Label>
                            <Select value={data.icon} onValueChange={v => setData('icon', v)}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select an icon" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableIcons.map(icon => (
                                        <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.icon} className="col-span-4 col-start-2" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="sort_order" className="text-right">Order</Label>
                            <Input id="sort_order" type="number" value={data.sort_order} onChange={e => setData('sort_order', Number(e.target.value))} className="col-span-3" />
                            <InputError message={errors.sort_order} className="col-span-4 col-start-2" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="is_visible" className="text-right">Visible</Label>
                            <Select value={data.is_visible ? '1' : '0'} onValueChange={v => setData('is_visible', v === '1')}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Visible</SelectItem>
                                    <SelectItem value="0">Hidden</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.is_visible} className="col-span-4 col-start-2" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={handleClose}>Cancel</Button>
                        <Button type="submit" disabled={processing}>{processing ? 'Saving...' : 'Save'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
