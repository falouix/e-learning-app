<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"));
if (isset($data->user_id)
    ) {
    $userid = mysqli_real_escape_string($conn, trim($data->user_id));
    $sql="UPDATE un_users SET status_users=1  WHERE id_users='$userid'";
    echo $sql;
    $insertUser = mysqli_query($conn, $sql) ;
    if ($insertUser) {
        echo json_encode(["success"=>1,"msg"=>"User desactivated"]);
    } else {
        echo json_encode(["success"=>0,"msg"=>"User Not desactivated!"]);
    }
} else {
    echo json_encode(["success"=>0,"msg"=>"Please fill all the required fields!"]);
}

$conn->close();