<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"));
if (isset($data->id_etudiant)
    ) {
    $id_etudiant = mysqli_real_escape_string($conn, trim($data->id_etudiant));
    $sql="UPDATE un_etudiant SET status_etudiant=0  WHERE id_enseignant='$id_etudiant'";
    echo $sql;
    $insertUser = mysqli_query($conn, $sql) ;
    if ($insertUser) {
        echo json_encode(["success"=>1,"msg"=>"Student desactivated"]);
    } else {
        echo json_encode(["success"=>0,"msg"=>"Student Not desactivated!"]);
    }
} else {
    echo json_encode(["success"=>0,"msg"=>"Please fill all the required fields!"]);
}

$conn->close();