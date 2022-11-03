<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db_connection.php';


$data = json_decode(file_get_contents("php://input"));
$subjectid = mysqli_real_escape_string($conn, trim($data->subject_id));
$sql="SELECT * FROM un_matiere WHERE id_matiere='$subjectid'";

if ($result=mysqli_query($conn, $sql)) {
    $subjects = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"subjects"=>$subjects]);
 
    // Free result set
    mysqli_free_result($result);
}


$conn->close();