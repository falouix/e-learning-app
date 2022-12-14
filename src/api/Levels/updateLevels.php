<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';


$data = json_decode(file_get_contents("php://input"));
if (isset($data->schoolyear)
    && !empty(trim($data->schoolyear))
    ) {
    $schoolyear = mysqli_real_escape_string($conn, trim($data->schoolyear));
    $levelorder = mysqli_real_escape_string($conn, trim($data->levelorder));
    $semester = mysqli_real_escape_string($conn, trim($data->semester));
    $levelid = mysqli_real_escape_string($conn, trim($data->levelid));
    $sql="UPDATE `un_niveau` SET `annee_niveau` = '$schoolyear',`semestre_niveau` = '$semester',`id_niveau_g` = '$levelorder' WHERE `un_niveau`.`id_niveau` = '$levelid'";
    $updatelevel = mysqli_query($conn, $sql) ;
    if ($updatelevel) {
        echo json_encode(["success"=>1,"msg"=>"Level updated"]);
    } else {
        echo json_encode(["success"=>0,"msg"=>"Level Not updated!"]);
    }
} else {
    echo json_encode(["success"=>0,"msg"=>"Please fill all the required fields!"]);
}

$conn->close();