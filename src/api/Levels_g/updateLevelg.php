<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"));
if (isset($data->levelg_name)&& isset($data->levelg_name)) {
    $levelg_name = mysqli_real_escape_string($conn, trim($data->levelg_name));
    $levelg_order = mysqli_real_escape_string($conn, trim($data->levelg_order));
    $levelg_id = mysqli_real_escape_string($conn, trim($data->levelg_id));
    
    $insertUser = mysqli_query($conn, "UPDATE un_niveau_g SET  nom_niveau_g='$levelg_name',order_niveau_g='$levelg_order'   WHERE id_niveau_g='$levelg_id'");
    if ($insertUser) {
        echo json_encode(["success"=>1,"msg"=>"Level_g update"]);
    } else {
        echo json_encode(["success"=>0,"msg"=>"Level_g Not update!"]);
    }
} else {
    echo json_encode(["success"=>0,"msg"=>"Please fill all the required fields!"]);
}
$conn->close();