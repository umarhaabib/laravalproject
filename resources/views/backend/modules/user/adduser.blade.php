

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

	<form role="form" method="post" action="{{URL::to('')}}/admin/saveuser" enctype="multipart/form-data">
		{{csrf_field()}}

		<div class="card-body">
			<div class="form-group">
				<label for="exampleInputEmail1">User Name</label>
				<input type="text" name="name" class="form-control" id=" " placeholder="User name">
			</div>
			<div class="form-group">
				<label for="exampleInputEmail1">Email address</label>
				<input type="email" name="email" class="form-control" id=" " placeholder="Enter email">
			</div>
			
			<div class="form-group">
				<label for="exampleInputPassword1">Password</label>
				<input type="password" name="password" class="form-control" id=" " placeholder="Password">
			</div>
			<div class="form-group">
				<label for="exampleInputPassword1">Role</label>
				<select name="role" class="form-control">

					<option value="1">Admin</option>
					<option value="2">User</option>

				</select>

			</div>
			<div class="form-group">
                    <label for="exampleInputFile">File input</label>
                    <div class="input-group">
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" id="exampleInputFile" name="image">
                        <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                      </div>
                      <div class="input-group-append">
                        <span class="input-group-text" id="">Upload</span>
                      </div>
                    </div>
                  </div>			<div class="form-check">
				<input type="checkbox" class="form-check-input" id="exampleCheck1">
				<label class="form-check-label" for="exampleCheck1">Check me out</label>
			</div>
		</div>
		<!-- /.card-body -->

		<div class="card-footer">
			<button type="submit" class="btn btn-success">Submit</button>
		</div>
	</form>
</section>
</div>


@stop





