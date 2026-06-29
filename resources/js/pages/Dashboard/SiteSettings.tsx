import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface Props {
    settings: Record<string, string>;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard.index') },
    { title: 'Site Settings', href: route('dashboard.settings.index'), isCurrent: true },
];

export default function SiteSettings({ settings }: Props) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        show_target_entities_section: settings.show_target_entities_section ?? '1',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('dashboard.settings.update'), {
            preserveScroll: true,
        });
    };

    const isTargetEntitiesVisible = data.show_target_entities_section === '1';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Site Settings" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Site Settings</CardTitle>
                            <CardDescription>
                                Control visibility of sections on the public website.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <Label htmlFor="show_target_entities_section" className="text-base cursor-pointer">
                                        Our Target Entities Section
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Show or hide the "Target Entities" section on the homepage and sector pages.
                                    </p>
                                </div>
                                <button
                                    id="show_target_entities_section"
                                    type="button"
                                    role="switch"
                                    aria-checked={isTargetEntitiesVisible}
                                    onClick={() => setData('show_target_entities_section', isTargetEntitiesVisible ? '0' : '1')}
                                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                                        isTargetEntitiesVisible ? 'bg-morpho' : 'bg-input'
                                    }`}
                                >
                                    <span
                                        className={`pointer-events-none flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out ${
                                            isTargetEntitiesVisible ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                    >
                                        {isTargetEntitiesVisible ? (
                                            <Eye className="h-3 w-3 text-morpho" />
                                        ) : (
                                            <EyeOff className="h-3 w-3 text-muted-foreground" />
                                        )}
                                    </span>
                                </button>
                            </div>
                        </CardContent>
                        <div className="flex items-center gap-4 border-t px-6 py-4">
                            <Button type="submit" disabled={processing}>
                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                            {recentlySuccessful && (
                                <span className="text-sm text-green-600">Saved!</span>
                            )}
                        </div>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
