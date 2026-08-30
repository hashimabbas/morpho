<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Existing rows hold plain strings (e.g. "medical"); wrap them in a
        // JSON array before the columns are converted to json, since MySQL
        // rejects a non-JSON value when changing the column type.
        DB::table('request_demos')->orderBy('id')->each(function ($row) {
            DB::table('request_demos')->where('id', $row->id)->update([
                'logistics_sector' => json_encode(array_values(array_filter([$row->logistics_sector]))),
                'solution_type' => json_encode(array_values(array_filter([$row->solution_type]))),
                'demo_goal' => json_encode(array_values(array_filter([$row->demo_goal]))),
            ]);
        });

        Schema::table('request_demos', function (Blueprint $table) {
            $table->json('logistics_sector')->change();
            $table->json('solution_type')->change();
            $table->json('demo_goal')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('request_demos', function (Blueprint $table) {
            $table->string('logistics_sector')->change();
            $table->string('solution_type')->change();
            $table->string('demo_goal')->change();
        });
    }
};
