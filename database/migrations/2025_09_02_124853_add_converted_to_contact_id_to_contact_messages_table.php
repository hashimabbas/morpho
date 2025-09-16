<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('contact_messages', function (Blueprint $table) {
            // This column will store the ID of the contact that was created from this message.
            // It's nullable because most messages won't be converted.
            // onDelete('set null') means if the contact is deleted, this field becomes null,
            // allowing the message to be converted again.
            $table->foreignId('converted_to_contact_id')
                  ->nullable()
                  ->after('is_read')
                  ->constrained('contacts')
                  ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contact_messages', function (Blueprint $table) {
            // Drop the foreign key constraint first before dropping the column.
            $table->dropForeign(['converted_to_contact_id']);
            $table->dropColumn('converted_to_contact_id');
        });
    }
};
