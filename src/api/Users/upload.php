<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
require 'db_connection.php';
$dirname= $_SERVER['DOCUMENT_ROOT']."/php-react/un_app/src/img/";

echo json_encode(["success"=>1,"msg"=>$_FILES["image"]["name"]]);




if (file_exists($dirname.$_FILES["image"]["name"].".jpg")) {
    unlink($dirname.$_FILES["image"]["name"].".jpg");
    move_uploaded_file($_FILES["image"]["tmp_name"], $dirname.$_FILES["image"]["name"].".jpg");
    exit;
} else {
    move_uploaded_file($_FILES["image"]["tmp_name"], $dirname.$_FILES["image"]["name"].".jpg");
    exit;
}