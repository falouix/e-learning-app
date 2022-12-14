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
    $username = mysqli_real_escape_string($conn, trim($data->user_name));
    $userprenom = mysqli_real_escape_string($conn, trim($data->user_prenom));
    $usercin = mysqli_real_escape_string($conn, trim($data->user_cin));
    $usertel = mysqli_real_escape_string($conn, trim($data->user_tel));
    $useremail = mysqli_real_escape_string($conn, trim($data->user_email));
    $userlogin = mysqli_real_escape_string($conn, trim($data->user_login));
        
    if (filter_var($useremail, FILTER_VALIDATE_EMAIL)) {
        if (mysqli_num_rows(mysqli_query($conn, "SELECT * FROM  un_users WHERE mail_users='$useremail'"))>0) {
            echo json_encode(["success"=>0,"msg"=>"Email already exist"]);
        } else {
            if (mysqli_num_rows(mysqli_query($conn, "SELECT * FROM  un_users WHERE login_users='$userlogin'"))>0) {
                echo json_encode(["success"=>0,"msg"=>"Login already exist"]);
            } else {
                if (mysqli_num_rows(mysqli_query($conn, "SELECT * FROM  un_users WHERE cin_users='$usercin'"))>0) {
                    echo json_encode(["success"=>0,"msg"=>"Cin already exist"]);
                } else {
                    $insertUser = mysqli_query($conn, "INSERT INTO un_users ( nom_users, prenom_users ,cin_users ,tel_users , mail_users , login_users ) VALUES('$username','$userprenom','$usercin','$usertel','$useremail','$userlogin')");
                    if ($insertUser) {
                        echo json_encode(["success"=>1,"msg"=>"User Inserted"]);
                    } else {
                        echo json_encode(["success"=>0,"msg"=>"User Not Inserted!"]);
                    }
                }
            }
        }
    } else {
        echo json_encode(["success"=>0,"msg"=>"Invalid Email Address!"]);
    }
} else {
    echo json_encode(["success"=>0,"msg"=>"Please fill all the required fields!"]);
}

$conn->close();