   

@extends('backend/layouts/layout')



@section('content')  
   
<section class="content">
  <div class="container">

@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif




  <form role="form" method="post" action="{{URL::to('')}}/admin/saveblog" enctype="multipart/form-data">
    {{csrf_field()}}

    <div class="card-body">
      <div class="form-group">
        <label for="exampleInputEmail1">Blog Title</label>
        <input type="text" name="name" class="form-control" id=" " placeholder="Blog Title">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Blog Discription</label>
        <input type="text" name="description" class="form-control" id=" " placeholder="Blog Discription">
      </div>
      
      <!-- <div class="form-group">
        <label for="exampleInputPassword1">Price</label>
        <input type="text" name="price" class="form-control" id=" " placeholder="Price">
      </div> -->
      <div class="form-group">
        <label for="exampleInputFile">File input</label>
        <div class="input-group">
          <div class="custom-file">
            <input type="file" class="custom-file-input" name="image">
            <label class="custom-file-label" for="exampleInputFile">Choose file</label>
          </div>
          
        </div>
      </div>
      
    </div>
    <!-- /.card-body -->

    <div class="card-footer">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
  </div>
</section>   
@stop
