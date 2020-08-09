
@extends('backend/layouts/layout')



@section('content')

<section class="content">
<div class="row">

          <div class="col-12">


            <!-- Button trigger modal -->






  @if(Session::has('message'))
  <p class="{{Session::get('alert-class','alert-success')}}">
  {{ Session::get('message') }}
  </p>
  @endif

            <div class="card">
              <div class="card-header">
                <h3 class="card-title">All Blogss</h3>

                <div class="card-tools">
                  <div class="input-group input-group-sm" style="width: 150px;">
                    <input type="text" name="table_search" class="form-control float-right" placeholder="Search">

                    <div class="input-group-append">
                      <button type="submit" class="btn btn-default"><i class="fas fa-search"></i></button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0" style="height: 300px;">
                <table class="table table-head-fixed">
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>name</th>
                      <th>description</th>
                      <th>image</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>

                    @foreach($blogs as $blog)


                    <tr>
                  <td>{{$blog->id}}</td>
                  <td>{{$blog->name}}</td>
                  <td>{{$blog->description}}</td>
                  <td>{{$blog->price}}</td>
                  <td><img src="{{URL::to('')}}/uploads/{{$blog->image}}" style="width: 70px"></td>
                      <td><a href="{{URL::to('')}}/admin/blogs/del/{{$blog->id}}" class="btn btn-danger">Delete</a>
                        <a href="{{URL::to('')}}/admin/blogs/edit/{{$blog->id}}" class="btn btn-warning">Edit</a>
          
                    </tr>
                    @endforeach



                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
      </section>


      @stop