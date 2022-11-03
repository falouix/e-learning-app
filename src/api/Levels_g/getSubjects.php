<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"));
$id= mysqli_real_escape_string($conn, trim($data->id));
    $sql="SELECT * from un_matiere WHERE id_niveau_g='$id' ";


if ($result=mysqli_query($conn, $sql)) {
    // Return the number of rows in result set
    
    $Subjects_g = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"Subjects_g"=>$Subjects_g]);

  
 
    // Free result set
    mysqli_free_result($result);
}





$conn->close();