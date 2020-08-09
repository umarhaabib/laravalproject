

@extends('backend/layouts/layout')



@section('content')



        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>  <i class="fa fa-list-alt nav-icon"></i> Category</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active"><a href="#">Category <i class="fa fa-list-alt nav-icon"></i></a></li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
        @if(Session::has('message'))
            <p class="alert {{ Session::get('alert-class', 'alert-success') }}">{{ Session::get('message') }}</p>
        @endif
        <section class="content">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title text-primary"><i class="fa fa-eye nav-icon"></i> View Category</h3>
                        </div>

                        <div class="card-body">
                            <table id="example1" class="table table-bordered table-dark table-condensed table-hover">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Category Name</th>
                                    <th>Parent Category</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($category as $category_show)
                                    <tr>
                                        <td>{{$category_show->id}}</td>
                                        <td>{{$category_show->name}}</td>
                                        <td>

                                                @if(!empty($category_show->parent_id))
                                                <?php  $name=DB::table('categories')->where('id',$category_show->parent_id)->first();    ?>
                                                   
                                                @else


                                                <h3 class="btn btn-warning">*</h3>


                                            @endif
                                        </td>

                                        <td>
                                            <a href="{{URL::to('')}}/admin/category/edit/{{ $category_show->id }}" class="btn btn-warning">Edit</a>
                                            <a href="{{URL::to('')}}/admin/category/del/{{ $category_show->id }}" class="btn btn-danger">Delete</a>
                                        </td>
                                    </tr>


                                @endforeach
                                </tbody>
                                <tfoot>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Parent Category</th>
                                    <th>Action</th>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- /.card -->
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </section>
        <!-- /.content -->
    

      @stop