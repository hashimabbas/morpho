<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pricing_comparison_features', function (Blueprint $table) {
            $table->string('feature_name_ar')->nullable()->after('feature_name');
        });
    }

    public function down(): void
    {
        Schema::table('pricing_comparison_features', function (Blueprint $table) {
            $table->dropColumn('feature_name_ar');
        });
    }
};
