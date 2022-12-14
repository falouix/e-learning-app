<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';


$data = json_decode(file_get_contents("php://input"));
$niveauid = mysqli_real_escape_string($conn, trim($data->level_id));
$id_niveau_g=mysqli_real_escape_string($conn, trim($data->id_niveau_g));
$sql="SELECT * FROM un_matiere m LEFT JOIN un_matiere_enseignant me ON m.id_matiere=me.id_matiere AND me.id_niveau = '$niveauid' LEFT JOIN un_enseignant e ON e.id_enseignant=me.id_enseignant WHERE m.id_niveau_g ='$id_niveau_g'";

if ($result=mysqli_query($conn, $sql)) {
    // Return the number of rows in result set
    $Subjects = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"Subjects"=>$Subjects]);
 
    // Free result set
    mysqli_free_result($result);
}




$conn->close();