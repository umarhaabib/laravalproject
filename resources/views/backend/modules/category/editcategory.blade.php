 

@extends('backend/layouts/layout')



@section('content')


<div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>  <i class="fa fa-list-alt nav-icon"></i> Categories</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Edit Category <i class="fa fa-list-alt nav-icon"></i></li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <!-- left column -->
                    <div class="col-md-12">
                        <!-- general form elements -->
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fa fa-list-alt nav-icon"></i> Edit Category</h3>
                            </div>
                            <!-- /.card-header -->
                            <!-- form start -->
                            <form role="form" method="POST" action="{{URL::to('')}}/admin/updatecategory" enctype="multipart/form-data">
                                {{ csrf_field() }}
                                <div class="card-body">
                                    <div class="form-group">
                                        <input type="hidden" class="form-control" id="" value="{{$category->id}}" name="id">
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Category Name</label>
                                        <input type="text" class="form-control" id="exampleInputEmail1" value="{{$category->name}}" name="name">
                                    </div>

                                    <div class="form-group">
                                        <label>Parent Category</label>
                                        <select class="form-control select2" style="width: 100%;" name="parent_id">

                                <option class="form-control" value="0">Select Parent</option>

                                                @foreach($level as $levels)

                                                @if($levels->name == $category->name)
                                                @else
                                                    <option class="form-control" value="{{$levels->id}}"
                                                            @if($levels->id == $category->parent_id)
                                                            selected
                                                            @endif>{{$levels->name}}
                                                    </option>
                                                @endif
                                                @endforeach
                                                            </select>
            </div>

                                </div>

                                <div class="card-footer">
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>


                    </div>

                </div>

            </div>
        </section>
    </div>
@stop

