<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$sql="SELECT * FROM `un_users` ORDER BY id_users DESC";
if ($result=mysqli_query($conn, $sql)) {
    // Return the number of rows in result set
    $all_users = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"users"=>$all_users]);
 
    // Free result set
    mysqli_free_result($result);
}
$conn->close();