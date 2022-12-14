<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"));

    $sql="SELECT * from un_niveau LEFT JOIN un_niveau_g ON un_niveau_g.id_niveau_g=un_niveau.id_niveau_g ";

if ($result=mysqli_query($conn, $sql)) {
    // Return the number of rows in result set
    
    $Levels = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"Levels"=>$Levels]);
} else {
    echo json_encode(["success"=>0,"Levels"=>"request not done!"]);
}
  
 
    // Free result set
    mysqli_free_result($result);







$conn->close();