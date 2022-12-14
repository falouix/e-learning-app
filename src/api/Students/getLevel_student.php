<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';


$data = json_decode(file_get_contents("php://input"));
$studentid =mysqli_real_escape_string($conn, trim($data->id));
$sql="SELECT id_niveau FROM `un_niveau_etudiant` WHERE id_etudiant='$studentid' ";


if ($result=mysqli_query($conn, $sql)) {
    // Return the number of rows in result set
    
    $idniveau = mysqli_fetch_all($result, MYSQLI_ASSOC);
  
    foreach ($idniveau as $row) {
        $idn=$row['id_niveau'];
    
    
        $sql1="SELECT * FROM `un_niveau` WHERE id_niveau='$idn' ";
        if ($result1=mysqli_query($conn, $sql1)) {
            $levels = mysqli_fetch_all($result1, MYSQLI_ASSOC);
        
            foreach ($levels as $rows) {
                $idg=$rows['id_niveau_g'];
                $sql2="SELECT * FROM `un_niveau_g` WHERE 	id_niveau_g='$idg' ";
                if ($result2=mysqli_query($conn, $sql2)) {
                    $levelsg = mysqli_fetch_all($result2, MYSQLI_ASSOC);
                    echo json_encode(["successg"=>1,"levelsg"=>$levelsg]);
                }
            }
        }
    }
    // Free result set
    mysqli_free_result($result);
}



$conn->close();