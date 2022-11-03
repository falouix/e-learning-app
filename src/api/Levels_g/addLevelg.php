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

    $insertUser = mysqli_query($conn, "INSERT INTO un_niveau_g ( nom_niveau_g,order_niveau_g) VALUES('$levelg_name','$levelg_order')");
    if ($insertUser) {
        echo json_encode(["success"=>1,"msg"=>"Level_g Inserted"]);
    } else {
        echo json_encode(["success"=>0,"msg"=>"Level_g Not Inserted!"]);
    }
} else {
    echo json_encode(["success"=>0,"msg"=>"Please fill all the required fields!"]);
}

$conn->close();