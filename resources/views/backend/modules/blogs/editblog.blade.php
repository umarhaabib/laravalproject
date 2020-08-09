   

@extends('backend/layouts/layout')



@section('content')  
   
<section class="content">
  <form role="form" method="post" action="{{URL::to('')}}/admin/updateblog" enctype="multipart/form-data">
    {{csrf_field()}}
  <input type="hidden" name="id" value="{{$blog->id}}">
    <div class="card-body">
      <div class="form-group">
        <label for="exampleInputEmail1">Blog Name</label>
        <input type="text" name="name" class="form-control" id=" " value="{{$blog->name}}">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Blog Discription</label>
        <input type="text" name="description" class="form-control" id=" " value="{{$blog->description}}" >
      </div>
      
      <div class="form-group">
        <label for="exampleInputFile">File input</label>
        <div class="input-group">
          <div class="custom-file">
            <input type="file" name="image" class="custom-file-input" id="exampleInputFile">
            <label class="custom-file-label" for="exampleInputFile">Choose file</label>
          </div>
          <div class="input-group-append">
            <span class="input-group-text" id="">Upload</span>
          </div>
        </div>
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
    </div>
    <!-- /.card-body -->

    <div class="card-footer">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</section>   
@stop
