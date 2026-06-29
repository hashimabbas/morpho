import { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { getIcon } from '@/lib/icons';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';

type Ecosystem = {
    id: number;
    type: string;
    icon: string;
    title: string;
    description: string;
    image: string | null;
    href: string | null;
    features: string[];
    subtitle: string | null;
};

export default function ServicesSolutions() {
    const { __, locale, isRtl } = useTranslation();
    const [items, setItems] = useState<Ecosystem[]>([]);
    const subtitle = items.find(i => i.subtitle)?.subtitle || '';

    useEffect(() => {
        fetch('/api/ecosystems')
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(() => {});
    }, [locale]);

    const services = items.filter(i => i.type === 'service');
    const projects = items.filter(i => i.type === 'project');

    return (
        <section className="bg-slate-50 py-16 sm:py-24 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center opacity-100 transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        {__('sections.services_solutions.title')}
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        {subtitle}
                    </p>
                </div>

                {services.length > 0 && (
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-12 lg:max-w-none lg:grid-cols-2">
                        {services.map((sector) => {
                            const Icon = getIcon(sector.icon);
                            return (
                                <Link key={sector.id} href={sector.href ?? '#'} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                                    <div className="relative opacity-100 transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                                        <img className="h-64 w-full object-cover" src={sector.image ?? ''} alt={sector.title} />
                                        <div className="absolute top-4 right-4">
                                            <Badge className="bg-morpho text-white hover:bg-morpho/90">{__('sections.services_solutions.service_badge')}</Badge>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col p-8 opacity-100 transition-all delay-200 duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                                        <Icon className="h-10 w-10 text-morpho" />
                                        <h3 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">{sector.title}</h3>
                                        <p className="mt-2 text-base text-gray-600 dark:text-gray-400">{sector.description}</p>
                                        <ul role="list" className="mt-8 flex-1 space-y-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                            {sector.features.map((feature, i) => (
                                                <li key={i} className="flex gap-x-3">
                                                    <CheckCircle className="mt-0.5 h-5 w-5 flex-none text-morpho" aria-hidden="true" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
                                            <span className="inline-flex items-center gap-2 text-morpho font-bold group-hover:gap-3 transition-all">
                                                {__('sections.services_solutions.learn_more')} {isRtl ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {projects.length > 0 && (
                    <div className="mt-20">
                        <div className="mx-auto max-w-3xl text-center opacity-100 transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                                {__('sections.services_solutions.featured_projects_title')}
                            </h3>
                            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                                {__('sections.services_solutions.featured_projects_description')}
                            </p>
                        </div>
                        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-12 lg:max-w-none lg:grid-cols-2">
                            {projects.map((project) => {
                                const Icon = getIcon(project.icon);
                                return (
                                    <Link key={project.id} href={project.href ?? '#'} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                                        <div className="relative opacity-100 transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                                            <img className="h-64 w-full object-cover" src={project.image ?? ''} alt={project.title} />
                                            <div className="absolute top-4 right-4">
                                                <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400">{__('sections.services_solutions.project_badge')}</Badge>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 flex-col p-8 opacity-100 transition-all delay-200 duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
                                            <Icon className="h-10 w-10 text-morpho" />
                                            <h3 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                                            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">{project.description}</p>
                                            <ul role="list" className="mt-8 flex-1 space-y-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                                {project.features.map((feature, i) => (
                                                    <li key={i} className="flex gap-x-3">
                                                        <CheckCircle className="mt-0.5 h-5 w-5 flex-none text-morpho" aria-hidden="true" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
                                                <span className="inline-flex items-center gap-2 text-morpho font-bold group-hover:gap-3 transition-all">
                                                    {__('sections.services_solutions.view_project')} {isRtl ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
