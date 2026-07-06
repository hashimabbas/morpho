import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Trash2, ChevronUp, ChevronDown, Upload } from 'lucide-react';
import { availableIcons, getIcon } from '@/lib/icons';

type ContentHero = {
    title?: string;
    subtitle?: string;
    description?: string;
    badge?: string;
    badgeIcon?: string;
    image?: string;
    images?: { src: string; alt: string }[];
};

type ContentItem = {
    icon?: string;
    title?: string;
    description?: string;
    label?: string;
    value?: string;
    name?: string;
    step?: string;
};

type ContentStat = {
    label: string;
    value: string;
    icon?: string;
};

type ContentSection = {
    type: string;
    title?: string;
    description?: string;
    subtitle?: string;
    image?: string;
    bgColor?: string;
    features?: string[];
    items?: ContentItem[];
    stats?: ContentStat[];
};

type Content = {
    hero?: ContentHero;
    sections?: ContentSection[];
};

interface Props {
    value: string;
    onChange: (value: string) => void;
    onError: (error: string) => void;
    onFileSelect?: (path: string, file: File) => void;
}

const sectionTypes = [
    { value: 'formula', label: 'Formula' },
    { value: 'challenges', label: 'Challenges' },
    { value: 'problems', label: 'Problems' },
    { value: 'solution', label: 'Solution' },
    { value: 'capabilities', label: 'Capabilities' },
    { value: 'values', label: 'Values' },
    { value: 'sectors', label: 'Sectors' },
    { value: 'overview', label: 'Overview' },
    { value: 'offerings', label: 'Offerings' },
    { value: 'workflow', label: 'Workflow' },
    { value: 'security', label: 'Security' },
    { value: 'decision-support', label: 'Decision Support' },
];

function ImageField({ value, onChange, label, onFileSelect, path }: {
    value?: string;
    onChange: (val: string) => void;
    label: string;
    onFileSelect?: (path: string, file: File) => void;
    path: string;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFile = (file: File | null) => {
        if (file) {
            const blobUrl = URL.createObjectURL(file);
            setPreview(blobUrl);
            const placeholder = `__UPLOAD__${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
            onChange(placeholder);
            onFileSelect?.(placeholder, file);
        } else {
            setPreview(null);
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    const displaySrc = preview || value || '';

    return (
        <div className="space-y-1.5">
            <Label className="text-xs">{label}</Label>
            <div className="flex items-center gap-2">
                {onFileSelect && (
                    <div className="relative">
                        <Input
                            ref={inputRef}
                            type="file"
                            accept="image/png,image/jpg,image/jpeg,image/webp,image/svg+xml"
                            className="w-36 text-xs h-8"
                            onChange={e => handleFile(e.target.files?.[0] || null)}
                        />
                    </div>
                )}
                <Input
                    value={value || ''}
                    onChange={e => { onChange(e.target.value); setPreview(null); }}
                    placeholder="/images/example.png"
                    className="h-8 text-xs flex-1"
                />
            </div>
            {displaySrc && (
                <img src={displaySrc} alt="" className="h-16 w-auto object-contain rounded border" />
            )}
        </div>
    );
}

function HeroEditor({ hero, onChange, onFileSelect }: { hero: ContentHero; onChange: (h: ContentHero) => void; onFileSelect?: Props['onFileSelect'] }) {
    const [expanded, setExpanded] = useState(true);

    const update = (key: string, val: any) => onChange({ ...hero, [key]: val });

    const addImage = () => {
        const images = hero.images || [];
        onChange({ ...hero, images: [...images, { src: '', alt: '' }] });
    };

    const removeImage = (idx: number) => {
        const images = hero.images || [];
        onChange({ ...hero, images: images.filter((_, i) => i !== idx) });
    };

    const updateImage = (idx: number, key: 'src' | 'alt', val: string) => {
        const images = hero.images || [];
        images[idx] = { ...images[idx], [key]: val };
        onChange({ ...hero, images });
    };

    return (
        <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Hero Content</h3>
                <Button type="button" variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
                    {expanded ? 'Collapse' : 'Expand'}
                </Button>
            </div>
            {expanded && (
                <>
                    <div className="grid gap-3">
                        <div>
                            <Label>Title</Label>
                            <Input value={hero.title || ''} onChange={e => update('title', e.target.value)} placeholder="Hero title" />
                        </div>
                        <div>
                            <Label>Subtitle</Label>
                            <Input value={hero.subtitle || ''} onChange={e => update('subtitle', e.target.value)} placeholder="Hero subtitle" />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea value={hero.description || ''} onChange={e => update('description', e.target.value)} rows={3} placeholder="Hero description" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label>Badge</Label>
                                <Input value={hero.badge || ''} onChange={e => update('badge', e.target.value)} placeholder="e.g. Smart Solution" />
                            </div>
                            <div>
                                <Label>Badge Icon</Label>
                                <Select value={hero.badgeIcon || ''} onValueChange={v => update('badgeIcon', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select icon" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        {availableIcons.map(name => <SelectItem key={name} value={name}>{name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <ImageField
                            value={hero.image}
                            onChange={v => update('image', v)}
                            label="Hero Image"
                            onFileSelect={onFileSelect}
                            path="hero.image"
                        />
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <Label>Carousel Images</Label>
                                <Button type="button" variant="outline" size="sm" onClick={addImage}>
                                    <PlusCircle className="h-3 w-3 mr-1" /> Add Image
                                </Button>
                            </div>
                            {(hero.images || []).map((img, idx) => (
                                <div key={idx} className="flex flex-col gap-1 mb-2 p-2 border rounded">
                                    <div className="flex gap-2 items-start">
                                        <div className="flex-1 space-y-1">
                                            {onFileSelect ? (
                                                <div className="flex gap-1">
                                                    <Input
                                                        type="file"
                                                        accept="image/png,image/jpg,image/jpeg,image/webp,image/svg+xml"
                                                        className="w-36 text-xs h-8"
                                                        onChange={e => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const placeholder = `__UPLOAD__${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
                                                                onFileSelect(placeholder, file);
                                                                updateImage(idx, 'src', placeholder);
                                                            }
                                                        }}
                                                    />
                                                    <Input
                                                        value={img.src}
                                                        onChange={e => updateImage(idx, 'src', e.target.value)}
                                                        placeholder="Image URL"
                                                        className="text-xs h-8 flex-1"
                                                    />
                                                </div>
                                            ) : (
                                                <Input
                                                    value={img.src}
                                                    onChange={e => updateImage(idx, 'src', e.target.value)}
                                                    placeholder="Image URL"
                                                    className="text-xs h-8"
                                                />
                                            )}
                                            <Input
                                                value={img.alt}
                                                onChange={e => updateImage(idx, 'alt', e.target.value)}
                                                placeholder="Alt text"
                                                className="text-xs h-8"
                                            />
                                        </div>
                                        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0" onClick={() => removeImage(idx)}>
                                            <Trash2 className="h-3 w-3 text-red-500" />
                                        </Button>
                                    </div>
                                    {img.src && (
                                        <img src={img.src.startsWith('__UPLOAD__') ? URL.createObjectURL(new File([], '')) : img.src} alt="" className="h-12 w-auto object-contain rounded border" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

function ItemsEditor({ items, onChange, fields }: {
    items: ContentItem[];
    onChange: (items: ContentItem[]) => void;
    fields: ('icon' | 'title' | 'description' | 'label' | 'value' | 'name' | 'step')[];
}) {
    const add = () => {
        const item: ContentItem = {};
        fields.forEach(f => { if (f === 'icon') item.icon = 'cpu'; else (item as any)[f] = ''; });
        onChange([...items, item]);
    };

    const updateItem = (idx: number, key: string, val: string) => {
        const updated = items.map((item, i) => i === idx ? { ...item, [key]: val } : item);
        onChange(updated);
    };

    const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx));

    return (
        <div className="space-y-3">
            {(items || []).map((item, idx) => (
                <div key={idx} className="border border-dashed rounded p-3 space-y-2 relative">
                    <Button type="button" variant="ghost" size="sm" className="absolute top-1 right-1 h-6 w-6 p-0" onClick={() => removeItem(idx)}>
                        <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                    <div className="grid gap-2 pr-6">
                        {fields.includes('icon') && (
                            <div>
                                <Label className="text-xs">Icon</Label>
                                <Select value={item.icon || 'cpu'} onValueChange={v => updateItem(idx, 'icon', v)}>
                                    <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {availableIcons.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        {fields.includes('step') && (
                            <div>
                                <Label className="text-xs">Step</Label>
                                <Input value={item.step || ''} onChange={e => updateItem(idx, 'step', e.target.value)} placeholder="1" className="h-8 text-xs" />
                            </div>
                        )}
                        {fields.includes('title') && (
                            <div>
                                <Label className="text-xs">Title</Label>
                                <Input value={item.title || ''} onChange={e => updateItem(idx, 'title', e.target.value)} placeholder="Title" className="h-8 text-xs" />
                            </div>
                        )}
                        {fields.includes('name') && (
                            <div>
                                <Label className="text-xs">Name</Label>
                                <Input value={item.name || ''} onChange={e => updateItem(idx, 'name', e.target.value)} placeholder="Name" className="h-8 text-xs" />
                            </div>
                        )}
                        {fields.includes('description') && (
                            <div>
                                <Label className="text-xs">Description</Label>
                                <Input value={item.description || ''} onChange={e => updateItem(idx, 'description', e.target.value)} placeholder="Description" className="h-8 text-xs" />
                            </div>
                        )}
                        {fields.includes('label') && (
                            <div>
                                <Label className="text-xs">Label</Label>
                                <Input value={item.label || ''} onChange={e => updateItem(idx, 'label', e.target.value)} placeholder="Label" className="h-8 text-xs" />
                            </div>
                        )}
                        {fields.includes('value') && (
                            <div>
                                <Label className="text-xs">Value</Label>
                                <Input value={item.value || ''} onChange={e => updateItem(idx, 'value', e.target.value)} placeholder="Value" className="h-8 text-xs" />
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={add}>
                <PlusCircle className="h-3 w-3 mr-1" /> Add Item
            </Button>
        </div>
    );
}

function FeaturesEditor({ features, onChange }: { features: string[]; onChange: (f: string[]) => void }) {
    const add = () => onChange([...features, '']);
    const update = (idx: number, val: string) => onChange(features.map((f, i) => i === idx ? val : f));
    const remove = (idx: number) => onChange(features.filter((_, i) => i !== idx));

    return (
        <div className="space-y-2">
            {(features || []).map((f, idx) => (
                <div key={idx} className="flex gap-2">
                    <Input value={f} onChange={e => update(idx, e.target.value)} placeholder="Feature" className="h-8 text-xs flex-1" />
                    <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => remove(idx)}>
                        <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={add}>
                <PlusCircle className="h-3 w-3 mr-1" /> Add Feature
            </Button>
        </div>
    );
}

function StatsEditor({ stats, onChange }: { stats: ContentStat[]; onChange: (s: ContentStat[]) => void }) {
    const add = () => onChange([...(stats || []), { label: '', value: '', icon: '' }]);
    const update = (idx: number, key: string, val: string) =>
        onChange((stats || []).map((s, i) => i === idx ? { ...s, [key]: val } : s));
    const remove = (idx: number) => onChange((stats || []).filter((_, i) => i !== idx));

    return (
        <div className="space-y-2">
            {(stats || []).map((stat, idx) => (
                <div key={idx} className="border border-dashed rounded p-3 space-y-2 relative">
                    <Button type="button" variant="ghost" size="sm" className="absolute top-1 right-1 h-6 w-6 p-0" onClick={() => remove(idx)}>
                        <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                    <div className="grid grid-cols-3 gap-2 pr-6">
                        <div>
                            <Label className="text-xs">Label</Label>
                            <Input value={stat.label} onChange={e => update(idx, 'label', e.target.value)} placeholder="Label" className="h-8 text-xs" />
                        </div>
                        <div>
                            <Label className="text-xs">Value</Label>
                            <Input value={stat.value} onChange={e => update(idx, 'value', e.target.value)} placeholder="Value" className="h-8 text-xs" />
                        </div>
                        <div>
                            <Label className="text-xs">Icon</Label>
                            <Select value={stat.icon || ''} onValueChange={v => update(idx, 'icon', v)}>
                                <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Optional" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    {availableIcons.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={add}>
                <PlusCircle className="h-3 w-3 mr-1" /> Add Stat
            </Button>
        </div>
    );
}

function SectionEditor({ section, index, onUpdate, onDelete, onMoveUp, onMoveDown, isFirst, isLast, onFileSelect }: {
    section: ContentSection;
    index: number;
    onUpdate: (s: ContentSection) => void;
    onDelete: () => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
    isFirst: boolean;
    isLast: boolean;
    onFileSelect?: Props['onFileSelect'];
}) {
    const [expanded, setExpanded] = useState(true);

    const update = (key: string, val: any) => onUpdate({ ...section, [key]: val });

    const renderTypeSpecificFields = () => {
        switch (section.type) {
            case 'formula':
                return (
                    <>
                        <div>
                            <Label>Subtitle</Label>
                            <Input value={section.subtitle || ''} onChange={e => update('subtitle', e.target.value)} placeholder="Formula subtitle" />
                        </div>
                        <div>
                            <Label>Background Color</Label>
                            <Select value={section.bgColor || ''} onValueChange={v => update('bgColor', v)}>
                                <SelectTrigger><SelectValue placeholder="Default" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Default (morpho)</SelectItem>
                                    <SelectItem value="blue">Blue</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </>
                );

            case 'challenges':
            case 'capabilities':
            case 'offerings':
            case 'problems':
                return (
                    <>
                        <div>
                            <Label>Description</Label>
                            <Textarea value={section.description || ''} onChange={e => update('description', e.target.value)} rows={2} />
                        </div>
                        <div>
                            <Label>Items</Label>
                            <ItemsEditor items={section.items || []} onChange={v => update('items', v)} fields={['icon', 'title', 'description']} />
                        </div>
                    </>
                );

            case 'solution':
            case 'security':
                return (
                    <>
                        <div>
                            <Label>Description</Label>
                            <Textarea value={section.description || ''} onChange={e => update('description', e.target.value)} rows={2} />
                        </div>
                        <ImageField
                            value={section.image}
                            onChange={v => update('image', v)}
                            label="Image"
                            onFileSelect={onFileSelect}
                            path={`sections[${index}].image`}
                        />
                        {section.type === 'security' && (
                            <div>
                                <Label>Subtitle (right panel title)</Label>
                                <Input value={section.subtitle || ''} onChange={e => update('subtitle', e.target.value)} placeholder="e.g. Sovereign Architecture" />
                            </div>
                        )}
                        <div>
                            <Label>Features</Label>
                            <FeaturesEditor features={section.features || []} onChange={v => update('features', v)} />
                        </div>
                    </>
                );

            case 'values':
                return (
                    <>
                        <div>
                            <Label>Background Color</Label>
                            <Select value={section.bgColor || ''} onValueChange={v => update('bgColor', v)}>
                                <SelectTrigger><SelectValue placeholder="Default" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Default (white/dark)</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Items</Label>
                            <ItemsEditor items={section.items || []} onChange={v => update('items', v)} fields={['label', 'value']} />
                        </div>
                    </>
                );

            case 'sectors':
                return (
                    <div>
                        <Label>Sectors</Label>
                        <ItemsEditor items={section.items || []} onChange={v => update('items', v)} fields={['name', 'icon']} />
                    </div>
                );

            case 'overview':
                return (
                    <>
                        <div>
                            <Label>Description</Label>
                            <Textarea value={section.description || ''} onChange={e => update('description', e.target.value)} rows={2} />
                        </div>
                        <ImageField
                            value={section.image}
                            onChange={v => update('image', v)}
                            label="Image"
                            onFileSelect={onFileSelect}
                            path={`sections[${index}].image`}
                        />
                        <div>
                            <Label>Stats</Label>
                            <StatsEditor stats={section.stats || []} onChange={v => update('stats', v)} />
                        </div>
                    </>
                );

            case 'workflow':
                return (
                    <div>
                        <Label>Steps</Label>
                        <ItemsEditor items={section.items || []} onChange={v => update('items', v)} fields={['step', 'title', 'description']} />
                    </div>
                );

            case 'decision-support':
                return (
                    <div>
                        <Label>Items</Label>
                        <ItemsEditor items={section.items || []} onChange={v => update('items', v)} fields={['title', 'description']} />
                    </div>
                );

            default:
                return <p className="text-sm text-muted-foreground">Select a section type to see fields.</p>;
        }
    };

    return (
        <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded font-mono">#{index + 1}</span>
                    <span className="text-sm font-medium truncate">{sectionTypes.find(t => t.value === section.type)?.label || section.type}</span>
                    {section.title && <span className="text-sm text-muted-foreground truncate hidden sm:inline">— {section.title}</span>}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                    <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onMoveUp} disabled={isFirst}>
                        <ChevronUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onMoveDown} disabled={isLast}>
                        <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setExpanded(!expanded)}>
                        <span className="text-xs">{expanded ? 'Hide' : 'Show'}</span>
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onDelete}>
                        <Trash2 className="h-3.5 w-3.5 text-red-500" />
                    </Button>
                </div>
            </div>

            {expanded && (
                <div className="space-y-3 pt-2 border-t">
                    <div>
                        <Label>Section Type</Label>
                        <Select value={section.type} onValueChange={v => update('type', v)}>
                            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                            <SelectContent>
                                {sectionTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Title</Label>
                        <Input value={section.title || ''} onChange={e => update('title', e.target.value)} placeholder="Section title" />
                    </div>
                    {renderTypeSpecificFields()}
                </div>
            )}
        </div>
    );
}

export default function ContentSectionBuilder({ value, onChange, onError, onFileSelect }: Props) {
    const [content, setContent] = useState<Content>({});
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized && value) {
            try {
                const parsed = JSON.parse(value);
                setContent(parsed);
                onError('');
            } catch {
                onError('Invalid JSON in existing content. Switch to JSON mode to fix.');
            }
            setInitialized(true);
        }
    }, [value, initialized, onError]);

    const emitChange = useCallback((newContent: Content) => {
        try {
            const json = JSON.stringify(newContent, null, 2);
            onChange(json);
            onError('');
        } catch {
            onError('Failed to serialize content.');
        }
    }, [onChange, onError]);

    const handleHeroChange = (hero: ContentHero) => {
        const newContent = { ...content, hero };
        setContent(newContent);
        emitChange(newContent);
    };

    const handleSectionUpdate = (index: number, section: ContentSection) => {
        const sections = [...(content.sections || [])];
        sections[index] = section;
        const newContent = { ...content, sections };
        setContent(newContent);
        emitChange(newContent);
    };

    const addSection = (type: string) => {
        const newSection: ContentSection = { type };
        const sections = [...(content.sections || []), newSection];
        const newContent = { ...content, sections };
        setContent(newContent);
        emitChange(newContent);
    };

    const deleteSection = (index: number) => {
        const sections = (content.sections || []).filter((_, i) => i !== index);
        const newContent = { ...content, sections };
        setContent(newContent);
        emitChange(newContent);
    };

    const moveSection = (index: number, direction: 'up' | 'down') => {
        const sections = [...(content.sections || [])];
        const target = direction === 'up' ? index - 1 : index + 1;
        if (target < 0 || target >= sections.length) return;
        [sections[index], sections[target]] = [sections[target], sections[index]];
        const newContent = { ...content, sections };
        setContent(newContent);
        emitChange(newContent);
    };

    const [newSectionType, setNewSectionType] = useState('formula');

    return (
        <div className="space-y-4">
            <HeroEditor hero={content.hero || {}} onChange={handleHeroChange} onFileSelect={onFileSelect} />

            <div className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Sections ({content.sections?.length || 0})</h3>
                    <div className="flex items-center gap-2">
                        <Select value={newSectionType} onValueChange={setNewSectionType}>
                            <SelectTrigger className="w-40 h-8 text-xs"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {sectionTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Button type="button" size="sm" onClick={() => addSection(newSectionType)}>
                            <PlusCircle className="h-3.5 w-3.5 mr-1" /> Add Section
                        </Button>
                    </div>
                </div>

                {(content.sections || []).length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">
                        No sections yet. Select a type and click "Add Section" to start building the page content.
                    </p>
                )}

                {(content.sections || []).map((section, index) => (
                    <SectionEditor
                        key={index}
                        section={section}
                        index={index}
                        onUpdate={s => handleSectionUpdate(index, s)}
                        onDelete={() => deleteSection(index)}
                        onMoveUp={() => moveSection(index, 'up')}
                        onMoveDown={() => moveSection(index, 'down')}
                        isFirst={index === 0}
                        isLast={index === (content.sections || []).length - 1}
                        onFileSelect={onFileSelect}
                    />
                ))}
            </div>
        </div>
    );
}
