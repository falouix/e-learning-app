<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';


$data = json_decode(file_get_contents("php://input"));
if (isset($data->enseignant_name)
    && isset($data->enseignant_email)
    && !empty(trim($data->enseignant_name))
    && !empty(trim($data->enseignant_email))
    ) {
    $enseignantid = mysqli_real_escape_string($conn, trim($data->enseignant_id));
    $enseignantname = mysqli_real_escape_string($conn, trim($data->enseignant_name));
    $enseignantprenom = mysqli_real_escape_string($conn, trim($data->enseignant_prenom));
    $enseignantcin = mysqli_real_escape_string($conn, trim($data->enseignant_cin));
    $enseignanttel = mysqli_real_escape_string($conn, trim($data->enseignant_tel));
    $enseignantemail = mysqli_real_escape_string($conn, trim($data->enseignant_email));
    $enseignantlogin = mysqli_real_escape_string($conn, trim($data->enseignant_login));
    if (filter_var($enseignantemail, FILTER_VALIDATE_EMAIL)) {
        $insertenseignant = mysqli_query($conn, "UPDATE un_enseignant SET  nom_enseignant='$enseignantname', prenom_enseignant='$enseignantprenom' ,cin_enseignant='$enseignantcin' ,tel_enseignant='$enseignanttel' , mail_enseignant='$enseignantemail' , login_enseignant='$enseignantlogin'   WHERE id_enseignant='$enseignantid'") ;
        if ($insertenseignant) {
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