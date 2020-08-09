

@extends('backend/layouts/layout')



@section('content')

    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Order Details</h3>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>Id</th>
                  <th>Order_Id</th>
                  <th>Product_Id</th>
                  <th>Quantity</th>
                  <th>Product_Name</th>
                  <th>Product_Price</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                   @foreach($orderdetails as $orderdetail)
                <tr>
                 
                  <td>{{$orderdetail->id}}</td>
                  <td>{{$orderdetail->order_id}}</td>
                  <td>{{$orderdetail->product_id}}</td>
                  <td>{{$orderdetail->quantity}}</td>
                  <td>{{$orderdetail->product_name}}</td>
                  <td>{{$orderdetail->product_price}}</td>
                  
                  <td><a href="{{URL::to('')}}" class ="btn btn-warning">Enable</a>
                    <a href="{{URL::to('')}}" class ="btn btn-danger">Disable</a>


                  </td>
                </tr>
                @endforeach
                </tbody>
                <tfoot>
                <tr>
                  <th>Rendering engine</th>
                  <th>Browser</th>
                  <th>Platform(s)</th>
                  <th>Engine version</th>
                  <th>CSS grade</th>
                </tr>
                </tfoot>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->

          <!-- /.card -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>



   

      </section>
</div>

      @stop