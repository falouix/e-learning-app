<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';


$data = json_decode(file_get_contents("php://input"));
if (isset($data->subject_name)
    && isset($data->subject_name)
    ) {
    $subject_name = mysqli_real_escape_string($conn, trim($data->subject_name));
    $subject_id = mysqli_real_escape_string($conn, trim($data->subject_id));
    $updateSubject = mysqli_query($conn, "UPDATE un_matiere SET  nom_matiere='$subject_name'   WHERE id_matiere='$subject_id'");
    if ($updateSubject) {
        echo json_encode(["success"=>1,"msg"=>"Subject updated"]);
    } else {
        echo json_encode(["success"=>0,"msg"=>"Subject Not updated!"]);
    }
} else {
    echo json_encode(["success"=>0,"msg"=>"Please fill all the required fields!"]);
}

$conn->close();