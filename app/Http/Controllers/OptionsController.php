<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Enums\Age;
use App\Enums\Countries;
use App\Enums\Gender;
use App\Enums\Race;
use App\Enums\Symptoms;
use App\Enums\Treatments;
use App\Enums\RecoveryPercentage;
use App\Enums\Weight;

class OptionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private function formatTags($obj)
    {
        $Array = [];
        $Collection = collect($obj);
        $index = 0;
        foreach ($Collection as $key => $value) {
            $Array[] = [
                // 'id' => $index,
                'value' => $key,
                'label' => $value
            ];
            $index++;
        }
        return $Array;
    }

    public function index()
    {
        return response()->json([
            'message' => 'success',
            'data' => [
                'age'=> Age::asArray(),
                'countries'=> Countries::asArray(),
                'gender'=> Gender::asArray(),
                'race'=> Race::asArray(),
                'recoveryPercentage'=> RecoveryPercentage::asArray(),
                'weight'=> Weight::asArray(),
                'symptoms'=>$this->formatTags(Symptoms::asArray()),
                'treatment'=>$this->formatTags(Treatments::asArray())
            ],
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
