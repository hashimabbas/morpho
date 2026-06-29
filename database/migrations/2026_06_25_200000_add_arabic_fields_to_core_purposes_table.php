<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('core_purposes', function (Blueprint $table) {
            $table->string('title_ar', 255)->nullable()->after('title');
            $table->text('description_ar')->nullable()->after('description');
            $table->text('subtitle_ar')->nullable()->after('subtitle');
        });
    }

    public function down(): void
    {
        Schema::table('core_purposes', function (Blueprint $table) {
            $table->dropColumn(['title_ar', 'description_ar', 'subtitle_ar']);
        });
    }
};
