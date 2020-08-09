<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Route;
use App\User;
use App\Profile;
use App\Investor;
use App\Representer;
use App\Questionaire;
use Session;
use Hash;
use DB;
use Auth;
class UserController extends Controller
{

  public function UserCheck()
    {
       if(Auth::check()  && Auth::user()->role==="1"){
      
      return view('backend/modules/dashboard/dashboard');
      }
      else{
            Auth::logout();
            return redirect('tetenter/error');
        }
    }
    public function index()
    {
    	$users=User::all();
    	return view('backend/modules/user/index',compact('users'));
    }


     public function destroy($id)
     {
    	$user=user::find($id);
    	$user->delete();
        Session::flash('message','User Deleted Successfully!');
    	return redirect()->back();
      }


        public function store(Request $request)
        {
                $validatedData = $request->validate([
        'name' => 'required',
        'email' => 'required',
        'password' => 'required',
        
         ]);



            $store=new User();
    	   $store->name=$request->name;
         $store->role=$request->role;
    	   $store->email=$request->email;
    	   $store->password=Hash::make($request->password);
    	   $store->save();
         Session::flash('message','User Added Successfully!');
    	   return redirect('admin/user');
        }

       public function edit($id){
       $user = User::find($id);
       return view('backend/modules/user/edituser', compact('user'));
        } 


    


      public function PostLogin(Request $request){
      $email = $request->email;
      $password = $request->password;
      if (Auth::attempt(['email' => $email, 'password' => $password]))
      {
        $results = DB::select( DB::raw("SELECT * FROM `users` WHERE `email` = '$email'" ));         
        
        if ($results[0]->role == 1) {
          return redirect('admin');
        }else{
          return redirect('tetenter');
        }
        
        
      }

      return redirect('tetenter/error');
    }



    public function StoreUser(Request $request)
        {
                $validatedData = $request->validate([
        'name' => 'required',
        'email' => 'required',
        'password' => 'required',
        
    ]);
      $store=new User();   
      $store->name=$request->name;
      $store->email=$request->email;
      $store->password=Hash::make($request->password);
      if(Route::has('tetenter/signup')){
        $store->role=$request->role(2);
        $store->image=$request->image('0');
      }
     
      $store->save();
      Session::flash('message','User Added Successfully!');
      return redirect('tetenter/contact_info');
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

        $blog->image=$name;
        $blog->name=$request->name;
      $blog->description=$request->description;
      $blog->update();
        
      }
      else{


      $blog->name=$request->name;
      $blog->description=$request->description;
      $blog->update();
      
    
    }
    return redirect('admin/blogs');
  }

  public function Investor_Profile(Request $request)
        {    


          $validatedData = $request->validate([
        'investment_purpose' => 'required',
        'planned_invested' => 'required',
        'occupation' => 'required',
        'average_income' => 'required',
        'beneficial_information' => 'required',
        'fund_source' => 'required',
        'politically_persons' => 'required',
        'statement_approvals' => 'required',
         ]);
           



            $store=new Profile();

      
         $store->investment_purpose=$request->investment_purpose;
         $store->planned_invested=$request->planned_invested;
         $store->occupation=$request->occupation;
         $store->average_income=$request->average_income;
         $store->beneficial_information=$request->beneficial_information;
         $store->fund_source =implode(',',$request->fund_source);
         $store->politically_persons=$request->politically_persons;
         $store->statement_approvals=$request->statement_approvals;
         
         $store->save();
         Session::flash('message','User Added Successfully!');
         return redirect('tetenter/appropriate_questionaire');
        }

        public function Private_Investor(Request $request)
        {
           
 $validatedData = $request->validate([
        'gender' => 'required',
        'fname' => 'required',
        'lname' => 'required',
        'country' => 'required',
        'residencea_address' => 'required',
        'mobile' => 'required',
        'referal_code' => 'required',
         ]);


            $store=new Investor();

      
         $store->gender=$request->gender;
         $store->fname=$request->fname;
         $store->lname=$request->lname;
         $store->country=$request->country;
         $store->residencea_address=$request->residencea_address;
         $store->mobile=$request->mobile;
         $store->referal_code=$request->referal_code;
         
         $store->save();
         Session::flash('message','User Added Successfully!');
         return redirect('tetenter/investor_profile');
        }
         public function Company_Representer(Request $request)
        {
          $validatedData = $request->validate([
        'gender' => 'required',
        'fname' => 'required',
        'lname' => 'required',
        'country' => 'required',
        'residencea_address' => 'required',
        'mobile' => 'required',
        'referal_code' => 'required',
        'company_name' => 'required',
        'company_registery' => 'required',
        'company_country' => 'required',
        'company_address' => 'required',
        'companyregistery_file' => 'required',
        'right_representation' => 'required',
        'article_file' => 'required',
         ]);



            $store=new Representer();

      
         $store->gender=$request->gender;
         $store->fname=$request->fname;
         $store->lname=$request->lname;
         $store->country=$request->country;
         $store->residencea_address=$request->residencea_address;
         $store->mobile=$request->mobile;
         $store->referal_code=$request->referal_code;
         $store->company_name=$request->company_name;
         $store->company_registery=$request->company_registery;
         $store->company_country=$request->company_country;
         $store->company_address=$request->company_address;
         $store->right_representation=$request->right_representation;
         if($request->file('article_file'))
        { 
            $article_file=$request->file('article_file');

          $name=time().'.'.$article_file->getClientOriginalExtension();
          $path='uploads/';
          $article_file->move($path,$name);
          $store->article_file=$name;
          
          }
          else
          {
            $store->article_file='0';
          }
          if($request->file('companyregistery_file'))
        { 
            $companyregistery_file=$request->file('companyregistery_file');

          $name=time().'.'.$companyregistery_file->getClientOriginalExtension();
          $path='uploads/';
          $companyregistery_file->move($path,$name);
          $store->companyregistery_file=$name;
          
          }
          else
          {
            $store->companyregistery_file='0';
          }
         
         $store->save();
         Session::flash('message','User Added Successfully!');
         return redirect('tetenter/investor_profile');
        }
        public function Questionaire(Request $request)
        {
                 $validatedData = $request->validate([
        'isWorkingFinMarket' => 'required',
        'investorDescribe' => 'required',
        'investmentMainGoal' => 'required',
        'investmentInstrumentList' => 'required',
        'backedRealEstateLoanRatio' => 'required',
        'totalPayBackAmountList' => 'required',
        'ltvMeaning' => 'required',
        'defaultLoanFundsList' => 'required',
        'riskMinimizeStrategy' => 'required',
        'firstRankingMortgageHolder' => 'required',
        
         ]);



            $store=new Questionaire();

      
         $store->isWorkingFinMarket=$request->isWorkingFinMarket;
         $store->investorDescribe=$request->investorDescribe;
         $store->investmentMainGoal=$request->investmentMainGoal;
         $store->investmentInstrumentList=implode(',',$request->investmentInstrumentList);
         $store->backedRealEstateLoanRatio=$request->backedRealEstateLoanRatio;
         $store->totalPayBackAmountList=implode(',',$request->totalPayBackAmountList);
         $store->ltvMeaning=$request->ltvMeaning;
         $store->defaultLoanFundsList=implode(',',$request->defaultLoanFundsList);
         $store->riskMinimizeStrategy=$request->riskMinimizeStrategy;
         $store->firstRankingMortgageHolder=$request->firstRankingMortgageHolder;
         $store->save();
         Session::flash('message','User Added Successfully!');
         return redirect('tetenter/congrats');
        }
        





}       








