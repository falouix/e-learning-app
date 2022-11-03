<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
require 'db_connection.php';
$folderPath= "../img/teachers/";

echo json_encode(["success"=>1,"msg"=>$_FILES["image"]["name"]]);
$file_tmp = $_FILES['image']['tmp_name'];
$file_ext = strtolower(end(explode('.', $_FILES['image']['name'])));
$file = $folderPath . $_FILES["image"]["name"].'.jpg';
move_uploaded_file($file_tmp, $file);
