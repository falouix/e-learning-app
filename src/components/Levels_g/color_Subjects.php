<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
require '../db_connection.php';
$data = json_decode(file_get_contents("php://input"));
if (isset($data->subject_id)) {
    $color_Subject = mysqli_real_escape_string($conn, trim($data->color_Subject));
    $subject_id = mysqli_real_escape_string($conn, trim($data->subject_id));
    $sql="UPDATE un_matiere SET colorbg_matiere='$color_Subject' WHERE id_matiere='$color_Subject'";
    if ($result=mysqli_query($conn, $sql)) {
        // Return the number of rows in result set
        $Classes = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode(["success"=>1,"Classes"=>$Classes]);
        // Free result set
        mysqli_free_result($result);
    }
} else {
    echo json_encode(["success"=>0,"msg"=>"Please fill all the required fields!"]);
}