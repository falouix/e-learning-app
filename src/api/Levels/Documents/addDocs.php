<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../../db_connection.php';
$data = json_decode(file_get_contents("php://input"));

        $realname = mysqli_real_escape_string($conn, trim($data->realname));
        $name = mysqli_real_escape_string($conn, trim($data->name));
        $iduser = mysqli_real_escape_string($conn, trim($data->id_user));
        $idlevel = mysqli_real_escape_string($conn, trim($data->id_niveau));
        $sql="INSERT INTO un_documents (nom_documents,nom_reelle_document,id_users,id_niveau,date_documents) VALUES ('$name','$realname','$iduser','$idlevel',SYSDATE())";
        if ($result=mysqli_query($conn, $sql)) {
            // Return the number of rows in result set
    
    
            echo json_encode(["success"=>1,"msg"=>"Document inserted"]);
        } else {
            echo json_encode(["success"=>0,"msg"=>"Document not inserted"]);
        }
    

$conn->close();