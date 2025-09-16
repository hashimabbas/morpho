// resources/js/components/ContactForm.tsx

import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Props {
    successMessage?: string;
}

export default function ContactForm({ successMessage }: Props) {
    const { data, setData, post, processing, errors, reset, wasSuccessful, hasErrors } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    // --- ADDED FOR DEBUGGING ---
    // This hook will log errors whenever they change.
    useEffect(() => {
        if (hasErrors) {
            console.error('Validation Errors from server:', errors);
        }
    }, [errors, hasErrors]);
    // --- END DEBUGGING ADDITION ---


    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // --- ADDED FOR DEBUGGING ---
        console.log('Submitting form with data:', data);
        // --- END DEBUGGING ADDITION ---

        post(route('contact.store'), {
            onSuccess: (page) => {
                // --- ADDED FOR DEBUGGING ---
                console.log('SUCCESS! Server responded successfully.', page);
                // --- END DEBUGGING ADDITION ---
                reset();
            },
            onError: (errors) => {
                // --- ADDED FOR DEBUGGING ---
                // This is crucial. If validation fails or there's a server error, it will show here.
                console.error('ERROR! Server responded with errors:', errors);
                // --- END DEBUGGING ADDITION ---
            },
            onFinish: () => {
                // --- ADDED FOR DEBUGGING ---
                console.log('Request finished (either success or error).');
                // --- END DEBUGGING ADDITION ---
            }
        });
    }

    return (
        <div>
            {wasSuccessful && successMessage && (
                <Alert className="mb-6 border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300 [&>svg]:text-green-800 dark:[&>svg]:text-green-300">
                    <CheckCircle className="h-5 w-5" />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>
                        {successMessage}
                    </AlertDescription>
                </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        placeholder="Your full name"
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        placeholder="you@company.com"
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                        id="subject"
                        type="text"
                        value={data.subject}
                        onChange={(e) => setData('subject', e.target.value)}
                        required
                        placeholder="How can we help?"
                    />
                    {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                        id="message"
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        required
                        rows={5}
                        placeholder="Your message..."
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                </div>

                <Button type="submit" disabled={processing} className="w-full">
                    {processing ? 'Sending...' : 'Send Message'}
                </Button>
            </form>
        </div>
    );
}
