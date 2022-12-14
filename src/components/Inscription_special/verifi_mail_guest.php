<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));
                    $sql="UPDATE un_guest SET status_etudiant='1'";
                    $verifi_guest = mysqli_query($conn, $sql);
                    if ($verifi_guest) {
                        echo json_encode(["success"=>1,"msg"=>"mail vefiried");
                    }else{
                        echo json_encode(["success"=>0,"msg"=>"mail not vefiried");
                    }
$conn->close();