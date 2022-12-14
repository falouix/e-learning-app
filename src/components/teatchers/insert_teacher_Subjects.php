<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db_connection.php';


$data = json_decode(file_get_contents("php://input"));
if (isset($data->prof)
    && ($data->id_matiere_ens !=''))
    {
    $id_matiere_enseignant = mysqli_real_escape_string($conn, trim($data->id_matiere_ens));
    $id_matiere_ens = mysqli_real_escape_string($conn, trim($data->id_niveau));
    $id_enseignant = mysqli_real_escape_string($conn, trim($data->prof));
    
    $update = mysqli_query($conn, "UPDATE un_matiere_enseignant SET  id_enseignant='$id_enseignant'   WHERE id_matiere_enseignant='$id_matiere_enseignant'") ;
    if ($update) {
        echo json_encode(["success"=>1,"msg"=>"Subject updated"]);
    } else {
        echo json_encode(["success"=>0,"msg"=>"Subject Not updated!"]);
    }
} else if
 (isset($data->prof) && ($data->id_matiere_ens == '') && ($data->nom_matiere != null)) {
    $nom_matiere =  mysqli_real_escape_string($conn, trim($data->nom_matiere));
    $id_niveau_g = mysqli_real_escape_string($conn, trim($data->id_niveau_g));
    $id_enseignant = mysqli_real_escape_string($conn, trim($data->prof));
    $id_niveau = mysqli_real_escape_string($conn, trim($data->id_niveau));

    $nom_matiere_string = serialize($data->nom_matiere) ; 
$stringdata = unserialize($nom_matiere_string);
    $sql="SELECT * FROM `un_matiere` WHERE `nom_matiere`= '$stringdata' AND `id_niveau_g` = $id_niveau_g ";
   
    if ($result = mysqli_query($conn, $sql)) {
        $matiere = mysqli_fetch_all($result, MYSQLI_ASSOC);
            $id_matiere = $matiere[0]['id_matiere'];

            $insertMat = mysqli_query($conn, "INSERT INTO un_matiere_enseignant ( id_matiere, id_enseignant, id_niveau  ) VALUES('$id_matiere','$id_enseignant','$id_niveau' )");  
            mysqli_query($conn, $insertMat);
            echo json_encode(["success"=>1,"msg"=>"Subject updated"]);
        

    }

}else{
    echo json_encode(["success"=>0,"msg"=>"Please fill all the required fields!"]);

}

$conn->close();