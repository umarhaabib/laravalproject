<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\job;
use App\Candidate;
use Session;
class JobController extends Controller

{
    public function index()
    {
       if(Auth::check()  && Auth::user()->role==="1"){
    	$jobs=job::all();
    	return view('backend/modules/job/index',compact('jobs'));
      }
      else{
            Auth::logout();
            return redirect('tetenter/error');
        }
    }

     public function destroy($id)
     {
    	$job=job::find($id);
    	$job->delete();
    	return redirect()->back();
    }

        public function store(Request $request)
        {
          $validatedData = $request->validate([
        'title' => 'required',
        'country' => 'required',
        'image' => 'required',
    ]);



    	$store=new job();

      

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

       



    	$store->title=$request->title;
    	$store->country=$request->country;
    	
    	$store->save(); 
      Session::flash('message','job Added Successfuly!');
    	return redirect('admin/job');
    }



        public function store_job(Request $request)
        {

          
       


    	$store=new Candidate();

      

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

       



    	$store->email=$request->email;
    	$store->linkedin_url=$request->linkedin_url;
    	$store->additional_info=$request->additional_info;
    	$store->save(); 
      Session::flash('message','job Added Successfuly!');
    	return redirect('tetenter/blog/job');
    }

       public function updatejob(Request $request)
        {
    	$job=job::find($request->id);

     if($request->file('image'))
       
       {
        $image=$request->file('image');
        
        $name=time().'.'.$image->getClientOriginalExtension();
        $path = 'uploads/';
        $image->move($path,$name);

      
        $job->name=$request->name;
      $job->description=$request->description;
    
      $job->update();
        
      }
      
    return redirect('admin/jobs');
  }


       public function edit($id)
       {

      $job = job::find($id);
      return view('backend/modules/jobs/editjob', compact('job'));
       }




}



