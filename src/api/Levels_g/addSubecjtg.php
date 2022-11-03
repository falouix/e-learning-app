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
    $id_niveau_g = mysqli_real_escape_string($conn, trim($data->id_niveau_g));
    $insertSubject = mysqli_query($conn, "INSERT INTO un_matiere ( nom_matiere,id_niveau_g  ) VALUES('$subject_name','$id_niveau_g')");
    if ($insertSubject) {
        echo json_encode(["success"=>1,"msg"=>"Subject Inserted"]);
    } else {
        echo json_encode(["success"=>0,"msg"=>"Subject Not Inserted!"]);
    }
} else {
    echo json_encode(["success"=>0,"msg"=>"Please fill all the required fields!"]);
}

$conn->close();