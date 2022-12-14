<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../../db_connection.php';
$data = json_decode(file_get_contents("php://input"));

        $Starting = mysqli_real_escape_string($conn, trim($data->Starting));
        $Ending = mysqli_real_escape_string($conn, trim($data->Ending));
        $idlevel = mysqli_real_escape_string($conn, trim($data->id_niveau));
        $sql="INSERT INTO un_periode_etude (dated_periode_etude,datef_periode_etude,id_niveau) VALUES ('$Starting','$Ending','$idlevel')";
        if ($result=mysqli_query($conn, $sql)) {
            // Return the number of rows in result set
    
    
            echo json_encode(["success"=>1,"msg"=>"Document inserted"]);
        } else {
            echo json_encode(["success"=>0,"msg"=>"Document not inserted"]);
        }
    

$conn->close();