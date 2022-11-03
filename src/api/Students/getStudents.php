<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$sql="SELECT * FROM un_etudiant e LEFT JOIN un_niveau_etudiant ne ON ne.id_etudiant=e.id_etudiant and ( ne.id_niveau IN ( SELECT n1.id_niveau FROM un_niveau n1 WHERE n1.active_niveau = 1 ) OR e.id_etudiant IN ( SELECT ne1.id_etudiant FROM un_niveau_etudiant ne1 LEFT JOIN un_niveau n2 ON n2.id_niveau=ne1.id_niveau GROUP BY ne1.id_etudiant HAVING SUM(n2.active_niveau) = 0 ) ) LEFT JOIN un_niveau n ON n.id_niveau=ne.id_niveau LEFT JOIN un_niveau_g ng ON ng.id_niveau_g=n.id_niveau_g";

if ($result=mysqli_query($conn, $sql)) {
    // Return the number of rows in result set
  
  
    $Students = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"Students"=>$Students]);
    $all_users = mysqli_fetch_all($result, MYSQLI_ASSOC);
   
 
    // Free result set
    mysqli_free_result($result);
}




$conn->close();