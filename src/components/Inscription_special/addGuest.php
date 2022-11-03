<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';


$data = json_decode(file_get_contents("php://input"));
if (
    !empty(trim($data->level_year))&&
    !empty(trim($data->level_order))&&!empty(trim($data->level_semester))
) {
    $levelyear = mysqli_real_escape_string($conn, trim($data->level_year));
    $levelorder = mysqli_real_escape_string($conn, trim($data->level_order));
    $levelsemester = mysqli_real_escape_string($conn, trim($data->level_semester));
    //$insertstudent = ;
    $sql="INSERT INTO un_niveau (annee_niveau,semestre_niveau,id_niveau_g,active_niveau) VALUES('$levelyear','$levelsemester','$levelorder','1')";
    if (mysqli_query($conn, $sql)) {
        echo json_encode(["success"=>1,"msg"=>"level Inserted"]);
    } else {
        echo json_encode(["success"=>0,"msg"=>"level Not Inserted!"]);
    }
}else {
    echo json_encode(["success"=>0,"msg"=>"please fill all the required field"]);
}

$conn->close();