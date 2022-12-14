<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"));
if (isset($data->nomg)) {
    $nomg = mysqli_real_escape_string($conn, trim($data->nomg));
    $sql="SELECT * from un_niveau INNER JOIN un_niveau_g ON un_niveau_g.id_niveau_g=un_niveau.id_niveau_g WHERE un_niveau.active_niveau='1' AND un_niveau.ID_niveau <> '$nomg'";
} else {
    $sql="SELECT * from un_niveau INNER JOIN un_niveau_g ON un_niveau_g.id_niveau_g=un_niveau.id_niveau_g WHERE un_niveau.active_niveau='1'";
}

if ($result=mysqli_query($conn, $sql)) {
    // Return the number of rows in result set
    
    $all_Levels = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"Levels"=>$all_Levels]);
}
  
 
    // Free result set
    mysqli_free_result($result);







$conn->close();