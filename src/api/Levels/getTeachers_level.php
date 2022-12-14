<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';


$data = json_decode(file_get_contents("php://input"));
$niveauid = mysqli_real_escape_string($conn, trim($data->level_id));
$sql="select * from un_enseignant e inner join un_matiere m on e.id_enseignant=m.id_enseignant where m.id_niveau='$niveauid' ";

if ($result=mysqli_query($conn, $sql)) {
    // Return the number of rows in result set
  
  
    $Teachers = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"Teachers"=>$Teachers]);
 
    // Free result set
    mysqli_free_result($result);
}




$conn->close();