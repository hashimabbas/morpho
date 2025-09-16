// resources/js/components/input-error.tsx

import { twMerge } from 'tailwind-merge';

interface Props {
    message?: string;
    className?: string;
}

export default function InputError({ message, className = '' }: Props) {
    return message ? (
        <p className={twMerge('text-sm text-destructive dark:text-destructive-foreground', className)}>
            {message}
        </p>
    ) : null;
}
