<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db_connection.php';


$data = json_decode(file_get_contents("php://input"));
if (isset($data->nom)
    && !empty(trim($data->nom))
    ) {
    $id_matiere_enseignant = mysqli_real_escape_string($conn, trim($data->id));
    $nom_matiere = mysqli_real_escape_string($conn, trim($data->nom));
    $id_enseignant = mysqli_real_escape_string($conn, trim($data->teacher));
    
    $update = mysqli_query($conn, "UPDATE un_matiere_enseignant SET  id_enseignant='$id_enseignant'   WHERE id_matiere_enseignant='$id_matiere_enseignant'") ;
    if ($update) {
        echo json_encode(["success"=>1,"msg"=>"Subject updated"]);
    } else {
        echo json_encode(["success"=>0,"msg"=>"Subject Not updated!"]);
    }
} else {
    echo json_encode(["success"=>0,"msg"=>"Please fill all the required fields!"]);
}

$conn->close();