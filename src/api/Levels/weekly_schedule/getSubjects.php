<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db_connection.php';


$data = json_decode(file_get_contents("php://input"));
$niveauid = mysqli_real_escape_string($conn, trim($data->id_niveau));
$sql="SELECT * FROM un_matiere m LEFT JOIN un_matiere_enseignant me ON me.id_matiere=m.id_matiere LEFT JOIN un_niveau n ON n.id_niveau=me.id_niveau WHERE n.id_niveau='$niveauid'";

if ($result=mysqli_query($conn, $sql)) {
    $Subjects = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"Subjects"=>$Subjects]);
 
    // Free result set
    mysqli_free_result($result);
}




$conn->close();