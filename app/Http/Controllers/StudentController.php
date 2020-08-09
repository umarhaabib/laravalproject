<?php

namespace App\Http\Controllers;

use App\Productcategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Datatables;
use Mockery\CountValidator\AtMost;

class ProductcategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {        
        if(Auth::check()  && Auth::user()->role==="Admin")
        {
            $productcategory=Productcategory::all();
            return view('productcategories.index',['productcategories'=>$productcategory]);
        }
        else{
            Auth::logout();
            return view('auth.login');
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (Auth::check() && Auth::user()->role==="Admin") {
            
            $productcategory=new Productcategory();
            $productcategory->id=rand(100,1000).time().rand(10,99);
            $productcategory->name=$request->input('name');
            $productcategory->description=$request->input('description');
            $productcategory->status=$request->input('status');
            $productcategory->added_by=Auth::User()->client_id;
            $imageName = $request->input('name').time().'.'.$request->image->extension();  
            $productcategory->image="images/Category/".$imageName;
            $productcategory->save();
      
            $request->image->move(public_path('images/Category'), $imageName);
            $productcategories = Productcategory::all();
            return view('productcategories.index',['productcategories'=>$productcategories]);

        }
        else {
            Auth::logout();
            return view('auth.login');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Productcategory  $productcategory
     * @return \Illuminate\Http\Response
     */
    public function show(Productcategory $productcategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Productcategory  $productcategory
     * @return \Illuminate\Http\Response
     */
    public function edit(Productcategory $productcategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Productcategory  $productcategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Productcategory $productcategory)
    {
        if(Auth::check()&& Auth::user()->role==="Admin")
        {
            $id=$request->input('id');
            
            $productcategory= Productcategory::find($id)
            ->update(
                [
                    'name' => $request->input('name'),
                    'description' => $request->input('description'),
                    'status' => $request->input('status'),
                ]
            );
            
            echo "<script>window.location = '/productcategories'</script>";

        }
        else{
            Auth::logout();
            return view('auth.login');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Productcategory  $productcategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(Productcategory $productcategory)
    {
        //
    }

    public function allcategories(Request $request)
    {
        if(Auth::check())
        {
            
            

        }
    }


    public function categorysaleproducts($id){
        
        $productcategories = Productcategory::where('status','Enable')->get();
        return view('productcategories.categorysaleproducts',[
            'pageTitle'=>"Shop All",
            'productcategories'=>$productcategories,
        ]);
    }
}
