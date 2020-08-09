

@extends('backend/layouts/layout')



@section('content')

    <section class="content">
      <div class="row">
        @if(Session::has('message'))
  <p class="alert {{Session::get('alert-class','alert-success')}}">
    {{ Session::get('message') }}
  </p>

   @endif
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Image</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                   @foreach($users as $user)
                <tr>
                 
                  <td>{{$user->id}}</td>
                  <td>{{$user->name}}</td>
                  <td>{{$user->email}}</td>

                  <td>
                     @if($user->role==1)
                    <img src="{{URL::to('')}}/uploads/{{$user->image}}" style="width: 70px;"></td>
                    @else
                    <img src="{{URL::to('')}}/uploads/user.png" style="width: 70px;"></td>
                    @endif
                  <td>
                    @if($user->role==1)
                      <span class="btn btn-success">Admin</span>
          @else
                       <span class="btn btn-warning">User</span>
                  </td>
                    @endif
                  <td><a href="{{URL::to('')}}/admin/user/edit/{{$user->id}}" class ="btn btn-warning">Edit</a>
                    <a href="{{URL::to('')}}/admin/user/del/{{$user->id}}" class ="btn btn-danger">Delete</a>


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