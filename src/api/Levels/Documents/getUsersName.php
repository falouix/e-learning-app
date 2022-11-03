<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db_connection.php';
$data = json_decode(file_get_contents("php://input"));
$id_users = mysqli_real_escape_string($conn, trim($data->id_users));
    $sql="SELECT * from un_users WHERE id_users='$id_users' ";

if ($result=mysqli_query($conn, $sql)) {
    // Return the number of rows in result set
    
    $users = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"users"=>$users]);
}
  
 
    // Free result set
   







$conn->close();