

@extends('backend/layouts/layout')



@section('content')

    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">All Orders</h3>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>Id</th>
                  <th>Total</th>
                  <th>User_Id</th>
                  <th>Time</th>
                  <th>Payment_Status</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                   @foreach($orders as $order)
                <tr>
                 
                  <td>{{$order->id}}</td>
                  <td>{{$order->total}}</td>
                  <td>{{$order->user_id}}</td>
                  <td>{{$order->time}}</td>
                  <td>
                    @if($order->payment_status==0)
                    <span class="btn btn-danger">Pending</span>
                    @else
                    <span class="btn btn-success">Payment Done!</span>
                    @endif
                    </td>
                  
                  <td>
                     @if($order->payment_status==0)
                    <a href="" class ="btn btn-sm btn-secondary">Disable</a>
                    @else
                    <a href="" class ="btn btn-sm btn-primary">Enable</a>
                    @endif


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