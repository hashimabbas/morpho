<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_sections', function (Blueprint $table) {
            $table->id();
            $table->string('subtitle');
            $table->string('subtitle_ar');
            $table->text('heading');
            $table->text('heading_ar');
            $table->text('description');
            $table->text('description_ar');
            $table->string('feature_1');
            $table->string('feature_1_ar');
            $table->string('feature_2');
            $table->string('feature_2_ar');
            $table->string('feature_2_desc');
            $table->string('feature_2_desc_ar');
            $table->string('cta_text');
            $table->string('cta_text_ar');
            $table->string('explore_text');
            $table->string('explore_text_ar');
            $table->json('images')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_sections');
    }
};
