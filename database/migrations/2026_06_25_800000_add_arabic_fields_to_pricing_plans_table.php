<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pricing_plans', function (Blueprint $table) {
            $table->string('name_ar')->nullable()->after('name');
            $table->text('description_ar')->nullable()->after('description');
            $table->json('features_ar')->nullable()->after('features');
            $table->string('cta_ar')->nullable()->after('cta');
            $table->string('price_label_ar')->nullable()->after('price_label');
            $table->string('price_period_ar')->nullable()->after('price_period');
        });
    }

    public function down(): void
    {
        Schema::table('pricing_plans', function (Blueprint $table) {
            $table->dropColumn(['name_ar', 'description_ar', 'features_ar', 'cta_ar', 'price_label_ar', 'price_period_ar']);
        });
    }
};
