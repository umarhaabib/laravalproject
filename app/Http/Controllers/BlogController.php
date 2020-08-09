<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Blog;
use Session;
class BlogController extends Controller

{
    public function index()
    {
       if(Auth::check()  && Auth::user()->role==="1"){
    	$blogs=Blog::all();
    	return view('backend/modules/blogs/index',compact('blogs'));
      }
      else{
            Auth::logout();
            return redirect('tetenter/error');
        }
    }

     public function destroy($id)
     {
    	$blog=blog::find($id);
    	$blog->delete();
    	return redirect()->back();
    }

        public function store(Request $request)
        {
          $validatedData = $request->validate([
        'name' => 'required',
        'description' => 'required',
        'image' => 'required',
    ]);



    	$store=new Blog();

      

       if($request->file('image'))
       
       {
        $image=$request->file('image');
        
        $name=time().'.'.$image->getClientOriginalExtension();
        $path = 'uploads/';
        $image->move($path,$name);

        $store->image=$name;
        
      }
      else{

        $store->image='0';

      }

       



    	$store->name=$request->name;
    	$store->description=$request->description;
    	
    	$store->save(); 
      Session::flash('message','Blog Added Successfuly!');
    	return redirect('admin/Blogs');
    }

       public function updateblog(Request $request)
        {
    	$blog=blog::find($request->id);

     if($request->file('image'))
       
       {
        $image=$request->file('image');
        
        $name=time().'.'.$image->getClientOriginalExtension();
        $path = 'uploads/';
        $image->move($path,$name);

      
        $blog->name=$request->name;
      $blog->description=$request->description;
    
      $blog->update();
        
      }
      
    return redirect('admin/Blogs');
  }


       public function edit($id)
       {

      $blog = Blog::find($id);
      return view('backend/modules/blogs/editblog', compact('blog'));
       }

      public function getDownload()
{
    //PDF file is stored under project/public/download/info.pdf
    $file= public_path(). "/assets/frontend/files/Estateguru_General_Loan_Terms_V08-10-2017.pdf";

    $headers = [
              'Content-Type' => 'application/pdf',
           ];

return response()->download($file, 'filename.pdf', $headers);
}


}



