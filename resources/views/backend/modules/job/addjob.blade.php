

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

	<form role="form" method="post" action="{{URL::to('')}}/admin/savejob" enctype="multipart/form-data">
		{{csrf_field()}}

		<div class="card-body">
			<div class="form-group">
				<label for="exampleInputEmail1">Job Title</label>
				<input type="text" name="title" class="form-control" id=" " placeholder="Job Title">
			</div>
			
			<div class="form-group">
				<label for="exampleInputPassword1">Select Country</label>
				<select name="country" class="form-control">

					<option value="United Kingdom">United Kingdom</option>
					<option value="Germany">Germany</option>
					<option value="Spain">Spain</option>

				</select>

			</div>
			<div class="form-group">
                    <label for="exampleInputFile">File input</label>
                    <div class="input-group">
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" id="exampleInputFile" name="image">
                        <label class="custom-file-label" for="exampleInputFile">Choose Country Flag</label>
                      </div>
                      <div class="input-group-append">
                        <span class="input-group-text" id="">Upload</span>
                      </div>
                    </div>
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





