// resources/views/emails/contact/submitted.blade.php

<x-mail::message>
# New Contact Form Submission

You have received a new message from your website's contact form.

**From:** {{ $name }} <br>
**Email:** [{{ $email }}](mailto:{{ $email }}) <br>
**Subject:** {{ $subject }}

<x-mail::panel>
{{ $message }}
</x-mail::panel>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
