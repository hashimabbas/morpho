import { usePage } from '@inertiajs/react';
import { useCallback } from 'react';
import type { SharedData } from '@/types';

function resolveValue(obj: Record<string, unknown>, parts: string[]): string | undefined {
    let value: unknown = obj;
    for (const part of parts) {
        if (value && typeof value === 'object' && part in (value as Record<string, unknown>)) {
            value = (value as Record<string, unknown>)[part];
        } else {
            return undefined;
        }
    }
    return typeof value === 'string' ? value : undefined;
}

export function useTranslation() {
    const { translations, locale } = usePage<SharedData>().props;

    const __ = useCallback((key: string, replacements?: Record<string, string>): string => {
        const parts = key.split('.');

        // First, try searching inside each group (e.g. common.nav.home)
        for (const group of Object.values(translations) as Record<string, unknown>[]) {
            const text = resolveValue(group, parts);
            if (text !== undefined) {
                if (replacements) {
                    let result = text;
                    for (const [k, v] of Object.entries(replacements)) {
                        result = result.replace(`:${k}`, v);
                    }
                    return result;
                }
                return text;
            }
        }

        // Fallback: try first segment as group name (e.g. homepage.hero.cta -> group homepage, path hero.cta)
        if (parts.length > 1 && parts[0] in translations) {
            const group = translations[parts[0]];
            if (group && typeof group === 'object') {
                const text = resolveValue(group as Record<string, unknown>, parts.slice(1));
                if (text !== undefined) {
                    if (replacements) {
                        let result = text;
                        for (const [k, v] of Object.entries(replacements)) {
                            result = result.replace(`:${k}`, v);
                        }
                        return result;
                    }
                    return text;
                }
            }
        }

        return key;
    }, [translations]);

    const isRtl = locale === 'ar';

    return { __, locale, isRtl };
}
