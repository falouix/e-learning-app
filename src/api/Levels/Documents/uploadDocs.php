<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
require '../db_connection.php';
$dirname= $_SERVER['DOCUMENT_ROOT']."/php-react/un_app/src/Docs/";

echo json_encode(["success"=>1,"msg"=>$_FILES["myFile"]["name"]]);
if (file_exists($dirname.$_FILES["myFile"]["name"])) {
    unlink($dirname.$_FILES["myFile"]["name"]);
    move_uploaded_file($_FILES["myFile"]["tmp_name"], $dirname.$_FILES["myFile"]["name"]);
    exit;
} else {
    move_uploaded_file($_FILES["myFile"]["tmp_name"], $dirname.$_FILES["myFile"]["name"]);
    exit;
}