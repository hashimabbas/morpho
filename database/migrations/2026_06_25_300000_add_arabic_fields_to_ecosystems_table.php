<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ecosystems', function (Blueprint $table) {
            $table->string('title_ar', 255)->nullable()->after('title');
            $table->text('description_ar')->nullable()->after('description');
            $table->string('subtitle_ar', 255)->nullable()->after('subtitle');
            $table->json('features_ar')->nullable()->after('features');
        });
    }

    public function down(): void
    {
        Schema::table('ecosystems', function (Blueprint $table) {
            $table->dropColumn(['title_ar', 'description_ar', 'subtitle_ar', 'features_ar']);
        });
    }
};
