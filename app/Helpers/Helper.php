<?php   
namespace App\Helpers;
use App\User;
use App\Blog;



 function UserCount(){
$users=User::count();
return $users;
}
function BlogCount(){
	$blogs=Blog::count();
	return $blogs;
}


?>