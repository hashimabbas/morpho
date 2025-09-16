<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactFormSubmitted extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @param string $name The sender's name
     * @param string $email The sender's email address
     * @param string $subject The message subject
     * @param string $message The message body
     */
    public function __construct(
        public string $name,
        public string $email,
        public string $subject,
        public string $message,
    ) {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address($this->email, $this->name),
            replyTo: [new Address($this->email, $this->name)],
            subject: 'Contact Form Submission: ' . $this->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        // We will create this view next
        return new Content(
            markdown: 'emails.contact.submitted',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
