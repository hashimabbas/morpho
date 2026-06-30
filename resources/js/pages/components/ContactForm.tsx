import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useTranslation } from '@/hooks/useTranslation';

interface Props {
    successMessage?: string;
}

export default function ContactForm({ successMessage }: Props) {
    const { __ } = useTranslation();
    const { data, setData, post, processing, errors, reset, wasSuccessful, hasErrors } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    useEffect(() => {
        if (hasErrors) {
            console.error('Validation Errors from server:', errors);
        }
    }, [errors, hasErrors]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post(route('contact.store'), {
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                console.error('ERROR! Server responded with errors:', errors);
            },
        });
    }

    return (
        <div>
            {wasSuccessful && successMessage && (
                <Alert className="mb-6 border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300 [&>svg]:text-green-800 dark:[&>svg]:text-green-300">
                    <CheckCircle className="h-5 w-5" />
                    <AlertTitle>{__('contact.alert.success_title')}</AlertTitle>
                    <AlertDescription>
                        {successMessage}
                    </AlertDescription>
                </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">{__('contact.form.name_label')}</Label>
                    <Input id="name" type="text" value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required placeholder={__('contact.form.name_placeholder')} />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">{__('contact.form.email_label')}</Label>
                    <Input id="email" type="email" value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required placeholder={__('contact.form.email_placeholder')} />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subject">{__('contact.form.subject_label')}</Label>
                    <Input id="subject" type="text" value={data.subject}
                        onChange={(e) => setData('subject', e.target.value)}
                        required placeholder={__('contact.form.subject_placeholder')} />
                    {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">{__('contact.form.message_label')}</Label>
                    <Textarea id="message" value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        required rows={5} placeholder={__('contact.form.message_placeholder')} />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                </div>
                <Button type="submit" disabled={processing} className="w-full">
                    {processing ? __('contact.form.sending_text') : __('contact.form.submit_text')}
                </Button>
            </form>
        </div>
    );
}
