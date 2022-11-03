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
            $day=mysqli_real_escape_string($conn, trim($data->day));
            $idme = mysqli_real_escape_string($conn, trim($data->id_me));
            $ids = mysqli_real_escape_string($conn, trim($data->id_s));
        $sql="UPDATE un_semaine SET jour_semaine='$day',debut_semaine='$Starting',fin_semaine='$Ending',id_matiere_enseignant='$idme' WHERE id_semaine='$ids' ";
        if ($result=mysqli_query($conn, $sql)) {
            echo json_encode(["success"=>1,"msg"=>"Class updated"]);
        } else {
            echo json_encode(["success"=>0,"msg"=>"class not updated"]);
        }
    

$conn->close();