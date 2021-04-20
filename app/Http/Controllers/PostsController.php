<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Carbon\Carbon;
use App\Enums\Age;
use App\Enums\Gender;
use App\Enums\Race;
use App\Enums\Symptoms;
use App\Enums\Treatments;
use App\Enums\Countries;
use App\Enums\RecoveryPercentage;
use App\Enums\Weight;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $post = new Post;
        $post->title = $request->title;
        $post->name = $request->name;
        $post->age = $request->age;
        $post->gender = $request->gender;
        $post->race = $request->race;
        $post->weight = $request->weight;
        $post->ip_address = $request->ip();
        $post->country = $request->country;
        $post->infected_date = new Carbon($request->date_infected);
        $post->fully_recovered = ($request->fully_recovered=='yes')?1:0;
        $post->recovery_percentage = $request->recovery_percentage;
        $post->story = $request->story;
        $post->treatments = implode(",", $request->treatment);
        $post->symptoms = implode(",", $request->symptoms);

        $post->save();

        return response()->json([
            'message' => 'success',
            'data' => [
                'request' => $post
            ],
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        function filterTags($data, $set){
            $array = [];
            $data = explode(",", $data);
            foreach ($data as $key => $value) {
                $array[] = $set[$value];
            }

            return $array;

        }

        $post = Post::find($id);
        $post->age = Age::asArray()[$post->age];
        $post->race = Race::asArray()[$post->race];
        $post->gender = Gender::asArray()[$post->gender];
        $post->country = Countries::asArray()[$post->country];
        $post->weight = Weight::asArray()[$post->weight];
        if($post->fully_recovered == 0){
            $post->recovery_percentage = RecoveryPercentage::asArray()[$post->recovery_percentage];
        }
        $post->treatments = filterTags($post->treatments, Treatments::asArray());
        $post->symptoms = filterTags($post->symptoms, Symptoms::asArray());

        $carbon = new Carbon($post->infected_date);
        $post->infected_date = $carbon->toFormattedDateString();

        return response()->json([
            'message' => 'success',
            'data' => $post,
        ], 200);
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
