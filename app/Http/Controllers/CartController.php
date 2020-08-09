<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use App\Order;
use App\User;
use App\OrderDetail;
use Illuminate\Http\Request;
use App\Blog;
use App\Job;
use Session;
use Illuminate\Support\Facades\Auth;
use Syscover\ShoppingCart\Facades\CartProvider;
use Syscover\ShoppingCart\Item;


class CartController extends Controller
{
    public function AddtoCart($id){
    $blog = Blog::find($id);
    CartProvider::instance()->add(new Item($blog->name,$blog->description,1,$blog->id,1.00,true, [],['image'=>$blog->image]));
    
   
    return redirect('tetenter/blog/videocase_detail');

}
 public function job_detail($id)
       {

      $job = job::find($id);
      $jobs= job::all();

      return view('frontend/pages/job_detail',compact('job', 'jobs'));
       }
public function blog_detail($id)
       {

      $blog = Blog::find($id);
      // $jobs= job::all();

      return view('frontend/pages/videocase_detail',compact('blog'));
       }

   public function destroy($rowId){
    CartProvider::instance()->remove($rowId);
    Session::flash('message','Product Removed!');
    return redirect()->back();




}
  public function detail($id)
       {

      $product = Product::find($id);

      return view('frontend/pages/product_detail',compact('product'));
       }


    public function wishlist($id) { 
    	$product= Product::find($id);
    	CartProvider::instance('wishlist')->add(new Item($product->id,$product->image,1,$product->price));
    	Session::flash('message','Your Product Is Added Successfuly In Your Wishlist.');
    	return redirect('shope/wishlist');
    }

    public function EmptyCart(){
        $products = Product::all();
        CartProvider::instance()->destroy();
        return redirect()->back();

    }
    public function UpdateCartItem(Request $request){
 

        $rowId = $request->rowId;
        $quantity = $request->quantity;
        
        if($quantity <= 0){
            CartProvider::instance()->remove($rowId);
        }
        else{
            $product = CartProvider::instance()->setQuantity($rowId, $quantity);
        }
        return redirect()->back();
        





    }

    public function placeorder(){
    	$user = Auth::User();
    	
    	$order= new Order();
    	$order->user_id = $user->id;
    	$order->total = preg_replace('/[^a-zA-Z0-9_ -]/s','.',CartProvider::instance()->getTotal());
    	$order->time = new Carbon();
    	 $order->payment_status = 0;

    	$order->save();
    	$orderId = $order->id;

    	foreach(CartProvider::instance()->getCartItems() as $item){
    	$OrderDetail= new OrderDetail();
    	$OrderDetail->order_id = $user->id;
    	$OrderDetail->product_id = $item->id;
    	$OrderDetail->quantity = $item->getQuantity();
    	$OrderDetail->product_name = $item->name;
    	$OrderDetail->product_price = $item->price;
    	$OrderDetail->save();Session::flash ('message','Congratulation!,Your Order Placed Successfuly!');
    	
    
        return redirect('shope/myorders');

    }

}

    public function MyOrders(){
        $orders = Order::where('user_id',Auth::User()->id)->get();
     

 return view('frontend/pages/myorders',compact('orders'));

    }


    public function allorders()
    {
        $orders=Order::all();
        return view('backend/modules/order/allorders',compact('orders'));
    }

// 
    // public function counting()
    // {
    //     $users=User::count();
    //      $products=Product::count();
    //     $orders=Order::count();
    //     return view('backend/modules/dashboard/dashboard',compact('orders','users','products'));
    // }

    

     public function orderdetail(){

    $orderdetails = OrderDetail::all();
    return view('backend/modules/order/orderdetail',compact('orderdetails'));
     }

}




