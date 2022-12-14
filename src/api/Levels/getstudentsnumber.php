<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';


$data = json_decode(file_get_contents("php://input"));
$niveauid = mysqli_real_escape_string($conn, trim($data->level_id));
$sql="SELECT * FROM `un_niveau_etudiant` WHERE id_niveau='$niveauid' ";

if ($result=mysqli_query($conn, $sql)) {
    $row_cnt = $result->num_rows;
    echo json_encode(["success"=>1,"Levels"=>$row_cnt]);
 
    // Free result set
    mysqli_free_result($result);
}




$conn->close();