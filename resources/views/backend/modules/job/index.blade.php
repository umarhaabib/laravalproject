

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
                  <th>Job Title</th>
                  <th>Country Name</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                   @foreach($jobs as $job)
                <tr>
                 
                  <td>{{$job->id}}</td>
                  <td>{{$job->title}}</td>
                  <td>{{$job->country}}</td>

                  <td>
                     
                    <img src="{{URL::to('')}}/uploads/{{$job->image}}" style="width: 70px;"></td>
                    
                  
                   
                  <td><a href="{{URL::to('')}}/admin/job/edit/{{$job->id}}" class ="btn btn-warning">Edit</a>
                    <a href="{{URL::to('')}}/admin/job/del/{{$job->id}}" class ="btn btn-danger">Delete</a>


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