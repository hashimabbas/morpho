<x-mail::message>
# New Contact Form Submission

You have received a new message from your website's contact form.

---

**Name:**<br>
{{ $formData['name'] }}

**Email:**<br>
<a href="mailto:{{ $formData['email'] }}">{{ $formData['email'] }}</a>

**Subject:**<br>
{{ $formData['subject'] }}

---

**Message:**
<x-mail::panel>
{{ $formData['message'] }}
</x-mail::panel>

<br>
Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
