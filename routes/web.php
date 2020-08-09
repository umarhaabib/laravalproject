<?php

use App\User;
use App\Blog;
use App\Job;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/




    Route::get('tetenter/blog', function () {
        $blogs = Blog::all();
    return view('frontend/pages/blog',compact('blogs'));
});
       Route::get('tetenter/blog/job', function () {
        $jobs = Job::all();
    return view('frontend/pages/job',compact('jobs'));
});
       Route::get('/login', function () {
    return view('frontend/pages/signup');
});
   
Route::get('/', function () {
    return view('frontend/pages/index');
});
Route::get('tetenter', function () {
    return view('frontend/pages/index');
});
Route::get('tetenter/login', function () {
    return view('frontend/pages/signup');
});
Route::post('tetenter/logout', function () {
    return view('frontend/pages/index');
});
Route::get('tetenter/error', function () {
    return view('frontend/pages/error');
});

 Route::get('tetenter/funding', function () {
    return view('frontend/pages/funding');
});


Route::get('tetenter/invester', function () {
    return view('frontend/pages/invester');
});
Route::get('tetenter/account', function () {
    return view('frontend/pages/registration/account');
});
Route::get('tetenter/help', function () {
    return view('frontend/pages/help');
});

Route::get('tetenter/about', function () {
    return view('frontend/pages/aboutus');
});

Route::get('tetenter/contact_us', function () {
    return view('frontend/pages/contactus');
});

Route::get('tetenter/signup', function () {
    return view('frontend/pages/signup');
});

Route::get('tetenter/blog/investing_tips', function () {
    return view('frontend/pages/investing_tips');
});
Route::get('tetenter/blog/case_study', function () {
    return view('frontend/pages/case_study');
});
Route::get('tetenter/blog/office_life', function () {
    return view('frontend/pages/office_life');
});

Route::get('tetenter/blog/statics', function () {
    return view('frontend/pages/statics');
});

Route::get('tetenter/blog/affiliate', function () {
    return view('frontend/pages/affiliate');
});
Route::get('tetenter/blog/compaigns', function () {
    return view('frontend/pages/compaigns');
});

Route::get('tetenter/blog/news', function () {
    return view('frontend/pages/news');
});

Route::get('tetenter/blog/price_list', function () {
    return view('frontend/pages/price_list');
});
Route::get('tetenter/blog/presskit', function () {
    return view('frontend/pages/press');
});
Route::get('tetenter/blog/videocase_detail', function () {
    return view('frontend/pages/videocase_detail');
});

Route::get('tetenter/blog/borror_detail', function () {
    return view('frontend/pages/borror_detail');
});
Route::get('tetenter/blog/finance_detail', function () {
    return view('frontend/pages/finance_detail');
});

Route::get('tetenter/blog/ninehouse_detail', function () {
    return view('frontend/pages/ninehouse_detail');
});
Route::get('tetenter/blog/jomas_detail', function () {
    return view('frontend/pages/jomas_detail');
});
Route::get('tetenter/blog/diversification_detail', function () {
    return view('frontend/pages/diversification_detail');
});

Route::get('tetenter/blog/loanportfolio_detail', function () {
    return view('frontend/pages/loanportfolio_detail');
});
Route::get('tetenter/blog/seederfunding', function () {
    return view('frontend/pages/seederfunding');
});

Route::get('tetenter/blog/investing_crises', function () {
    return view('frontend/pages/investing_crises');
});
Route::get('tetenter/blog/people_invested', function () {
    return view('frontend/pages/people_invested');
});

Route::get('tetenter/blog/employee_investment', function () {
    return view('frontend/pages/employee_investment');
});
Route::get('tetenter/details/bridge_loan', function () {
    return view('frontend/pages/bridge_loan');
});




Route::get('tetenter/Development-loan_Lithuania', function () {
    return view('frontend/pages/loans/Development-loan_Lithuania');
});

Route::get('tetenter/Business-loan-7stageFinland', function () {
    return view('frontend/pages/loans/Business-loan-7stageFinland');
});

Route::get('tetenter/Development-loan_2stageFinland', function () {
    return view('frontend/pages/loans/Development-loan_2stageFinland');
});
Route::get('tetenter/Bridge-loan_Lithuania', function () {
    return view('frontend/pages/loans/Bridge-loan_Lithuania');
});
Route::get('tetenter/Bridge-loan-1stage_Estonia', function () {
    return view('frontend/pages/loans/Bridge-loan-1stage_Estonia');
});
Route::get('tetenter/Development-loan-1stageEstonia', function () {
    return view('frontend/pages/loans/Development-loan-1stageEstonia');
});
Route::get('tetenter/Business-loan_Estonia', function () {
    return view('frontend/pages/loans/Business-loan_Estonia');
});
Route::get('tetenter/Business-loan-1stageLatvia', function () {
    return view('frontend/pages/loans/Business-loan-1stageLatvia');
});

Route::get('tetenter/primery_market', function () {
    return view('frontend/pages/loans/primery_market');
});
Route::get('tetenter/user_terms', function () {
    return view('frontend/pages/user_terms');
});
Route::get('tetenter/privacy_policy', function () {
    return view('frontend/pages/privacy_policy');
});
Route::get('tetenter/general-loan_terms', function () {
    return view('frontend/pages/general-loan_terms');
});
Route::get('tetenter/general-loan-other_countries', function () {
    return view('frontend/pages/general-loan-other_countries');
});
Route::get('tetenter/Cookie-Policy', function () {
    return view('frontend/pages/Cookie-Policy');
});
Route::get('tetenter/Policy-of-Avoidance', function () {
    return view('frontend/pages/Policy-of-Avoidance');
});
Route::get('tetenter/Investor-Risk-Statement', function () {
    return view('frontend/pages/Investor-Risk-Statement');
});
Route::get('tetenter/procedure-for-settlement-of-disputes', function () {
    return view('frontend/pages/procedure-for-settlement-of-disputes');
});



// ====FAQ Routing======//
Route::get('tetenter/adding_funds', function () {
    return view('frontend/pages/faq/adding_funds');
});
Route::get('tetenter/investing', function () {
    return view('frontend/pages/faq/investing');
});
Route::get('tetenter/auto_invest', function () {
    return view('frontend/pages/faq/auto_invest');
});
Route::get('tetenter/about_loans', function () {
    return view('frontend/pages/faq/about_loans');
});
Route::get('tetenter/withdrawals', function () {
    return view('frontend/pages/faq/withdrawals');
});
Route::get('tetenter/most_asked', function () {
    return view('frontend/pages/faq/most_asked');
});
Route::get('tetenter/faq_secondery', function () {
    return view('frontend/pages/faq/faq_secondery');
});
Route::get('tetenter/contact_info', function () {
    return view('frontend/pages/registration/contact_info');
});
Route::get('tetenter/private_investor', function () {
    return view('frontend/pages/registration/private_investor');
});
Route::get('tetenter/company_representer', function () {
    return view('frontend/pages/registration/company_representer');
});
Route::get('tetenter/investor_profile', function () {
    return view('frontend/pages/registration/investor_profile');
});
Route::get('tetenter/appropriate_questionaire', function () {
    return view('frontend/pages/registration/appropriate_questionaire');
});
Route::get('tetenter/appropriate_questionaire', function () {
    return view('frontend/pages/registration/appropriate_questionaire');
});
Route::get('tetenter/congrats', function () {
    return view('frontend/pages/registration/congrats');
});
Route::get('tetenter/account_overview', function () {
    return view('frontend/pages/registration/account_overview');
});
Route::get('tetenter/msg', function () {
    return view('frontend/pages/registration/msg');
});
Route::get('tetenter/portfolio', function () {
    return view('frontend/pages/registration/portfolio');
});
// ====FAQ Routing end======//


Route::get('admin/user/adduser', function () {
    return view('backend/modules/user/adduser');
});

Route::get('admin/blogs/addblog', function () {
    return view('backend/modules/blogs/addblog');
});
Route::get('admin/category/addcategory', function () {
    return view('backend/modules/category/addcategory');
});

Route::get('admin/job/addjob', function () {
    return view('backend/modules/job/addjob');
});

 

//  Route::get('admin/user', function () {
//     return view('backend/modules/user/index');
// });


// User Routing Via Controller//
 Route::get('admin', 'UserController@UserCheck');
 Route::get('admin/user', 'UserController@index');
 Route::get('admin/user/del/{id}', 'UserController@destroy');
 Route::get('admin/user/edit/{id}','UserController@edit');
 Route::post('admin/saveuser', 'UserController@store');
 Route::post('admin/updateuser', 'UserController@updateuser');
 Route::post('tetenter', 'UserController@PostLogin');
 Route::post('tetenter/save', 'UserController@StoreUser');
 Route::post('tetenter/profile', 'UserController@Investor_Profile');
 Route::post('tetenter/private_investor', 'UserController@Private_Investor');
 Route::post('tetenter/company_representer', 'UserController@Company_Representer');
 Route::post('tetenter/questionaire', 'UserController@Questionaire');


// <<<end>>>//

// job routing //

 Route::post('admin/savejob', 'JobController@store');
 Route::get('admin/job', 'JobController@index');
Route::get('admin/job_detail/{id}', 'CartController@job_detail');
 Route::post('admin/acceptjob', 'JobController@store_job');
 Route::get('admin/blog_detail/{id}', 'CartController@blog_detail');


 // end job //




// Product Routing Via Controller//
Route::get('admin/Blogs', 'BlogController@index');
Route::get('admin/blogs/del/{id}', 'BlogController@destroy');
Route::get('admin/blogs/edit/{id}', 'BlogController@edit');
Route::post('admin/blogs', 'BlogController@destroy');
Route::post('admin/saveblog', 'BlogController@store');  
Route::post('admin/updateblog', 'BlogController@updateblog');
Route::get('tetenter/download', 'BlogController@getDownload');
// <<<end>>>//



// Category Routing Via Controller//
Route::get('admin/category', 'CategoryController@index');
Route::get('admin/category/del/{id}', 'CategoryController@Destroy');
Route::get('admin/category/edit/{id}','CategoryController@edit');
Route::post('admin/savecategory', 'CategoryController@store');
Route::post('admin/updatecategory', 'CategoryController@updatecategory');
Route::get('admin/category/addcategory', 'CategoryController@Show');

// <<<end>>>//




// Frontend(Shop) Routing Via Controller//


Route::get('shope/viewcart/del/{id}', 'CartController@destroy');
Route::get('shope/wishlist/del/{id}', 'CartController@destroy');
Route::get('shope/detailpage/{id}', 'CartController@detail');
Route::get('shope/wishlist/{id}', 'CartController@wishlist');
Route::get('shope/checkout/{id}', 'CartController@placeorder');
Route::get('shope/viewcart/update/{id}', 'CartController@UpdateItem');
Route::get('shope/myorders', 'CartController@MyOrders');
Route::get('shope/emtycart', 'CartController@EmptyCart');
Route::get('shope/updatecart', 'CartController@UpdateCartItem');


Route::get('admin/order', 'CartController@allorders');


Route::get('admin/order/orderdetail', 'CartController@orderdetail');


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
// <<<end>>>//

Route::get('shop/viewcart/{id}','FashiController@AddtoCart');
Route::get('shop/del/{id}','FashiController@Destroy');
Route::get('shop/del','FashiController@EmptyCart');