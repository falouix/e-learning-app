<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';


$data = json_decode(file_get_contents("php://input"));
if (isset($data->user_name)
    && isset($data->user_email)
    && !empty(trim($data->user_name))
    && !empty(trim($data->user_email))
    ) {
    $userid = mysqli_real_escape_string($conn, trim($data->user_id));
    $username = mysqli_real_escape_string($conn, trim($data->user_name));
    $userprenom = mysqli_real_escape_string($conn, trim($data->user_prenom));
    $usercin = mysqli_real_escape_string($conn, trim($data->user_cin));
    $usertel = mysqli_real_escape_string($conn, trim($data->user_tel));
    $useremail = mysqli_real_escape_string($conn, trim($data->user_email));
    $userlogin = mysqli_real_escape_string($conn, trim($data->user_login));
    if (filter_var($useremail, FILTER_VALIDATE_EMAIL)) {
        $insertUser = mysqli_query($conn, "UPDATE un_users SET  nom_users='$username', prenom_users='$userprenom' ,cin_users='$usercin' ,tel_users='$usertel' , mail_users='$useremail' , login_users='$userlogin'   WHERE id_users='$userid'") ;
        if ($insertUser) {
            echo json_encode(["success"=>1,"msg"=>"User Inserted."]);
        } else {
            echo json_encode(["success"=>0,"msg"=>"User Not Inserted!"]);
        }
    } else {
        echo json_encode(["success"=>0,"msg"=>"Invalid Email Address!"]);
    }
} else {
    echo json_encode(["success"=>0,"msg"=>"Please fill all the required fields!"]);
}

$conn->close();