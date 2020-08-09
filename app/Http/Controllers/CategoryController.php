<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;
use Session;

class CategoryController extends Controller
{
    public function index(){
       $category= Category::all();

       $level = Category::where('parent_id',0)->pluck('name');

        return view('backend/modules/category/index',compact('category','level'));
    }

    public function show(){
        $level = Category::where('parent_id',0)->get();

            return view('backend/modules/category/addcategory', compact('level'));
        }

    public function Destroy($id){
        $category=Category::find($id);
        $category->delete();
        Session::flash('message', 'Category Deleted Successfully!!!');
        return redirect()->back();
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'parent_id' => 'required',


        ]);
            $insert = new Category();
            $insert->name = $request->name;
            $insert->parent_id =  $request->parent_id;
            $insert->save();
             Session::flash('message', 'New Category Created Successfully!!!');
            return redirect()->back();

        }
    public function edit($id){
        $category= Category::find($id);
       $level = Category::where('parent_id',0)->get();

        return view('backend/modules/category/editCategory',compact('category','level'));
    }
    public function updatecategory(Request $request)
    {
        $update = Category::find($request->id);
        $update->name = $request->name;
        $update->parent_id = $request->parent_id;
        Session::flash('message', 'New 
        Category Updated Successfully!!!');
        $update->update();
        echo "FFF";
        return redirect('admin/category');
    }
}