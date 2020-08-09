

@extends('backend/layouts/layout')



@section('content')


<section class="content">
	<form role="form" method="post" action="{{URL::to('')}}/admin/updateuser">
		{{csrf_field()}}
		<input type="hidden" name="id" value="{{$user->id}}">

		<div class="card-body">
			<div class="form-group">
				<label for="exampleInputEmail1">User Name</label>
				<input type="text" name="name" class="form-control" id=" "
				value="{{$user->name}}"
				>
			</div>
			<div class="form-group">
				<label for="exampleInputEmail1">Email address</label>
				<input type="email" name="email" class="form-control"
				value="{{$user->email}}">
			</div>

			<div class="form-group">
				<label for="exampleInputPassword1">Password</label>
				<input type="password" name="password" class="form-control" id=" " value="{{$user->password}}">
			</div>
			<div class="form-group">
				<label for="exampleInputPassword1">Role</label>
				<select name="role" class="form-control">
						<option value="{{$user->role}} @if($user->role == 0){{'selected'}} @endif">Admin</option>


						<option value="{{$user->role}} @if($user->role == 1){{'selected'}} @endif">User</option>

				</select>

			</div>
			<div class="form-group">
				<label for="exampleInputFile">File input</label>
				<div class="input-group">
					<div class="custom-file">
						<input type="file" class="custom-file-input" id="exampleInputFile">
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
			<button type="submit" class="btn btn-success">Submit</button>
		</div>
	</form>
</section>



@stop

