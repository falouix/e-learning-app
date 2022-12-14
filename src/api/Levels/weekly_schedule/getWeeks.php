<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db_connection.php';


$data = json_decode(file_get_contents("php://input"));
$niveauid = mysqli_real_escape_string($conn, trim($data->level_id));
$sql="SELECT * FROM un_semaine INNER JOIN un_matiere_enseignant ON un_matiere_enseignant.id_matiere_enseignant=un_semaine.id_matiere_enseignant WHERE un_matiere_enseignant.id_niveau='$niveauid'";

if ($result=mysqli_query($conn, $sql)) {
    $Weeks = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"Weeks"=>$Weeks]);
 
    // Free result set
    mysqli_free_result($result);
}




$conn->close();