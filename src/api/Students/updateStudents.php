<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';


$data = json_decode(file_get_contents("php://input"));
if (isset($data->student_name)
    && isset($data->student_email)
    && !empty(trim($data->student_name))
    && !empty(trim($data->student_email))
    ) {
    $etudiantid = mysqli_real_escape_string($conn, trim($data->student_id));
    $etudiantname = mysqli_real_escape_string($conn, trim($data->student_name));
    $etudiantprenom = mysqli_real_escape_string($conn, trim($data->student_prenom));
    $etudiantcin = mysqli_real_escape_string($conn, trim($data->student_cin));
    $etudianttel = mysqli_real_escape_string($conn, trim($data->student_tel));
    $etudiantemail = mysqli_real_escape_string($conn, trim($data->student_email));
    $etudiantlogin = mysqli_real_escape_string($conn, trim($data->student_login));
    $etudiantlevel = mysqli_real_escape_string($conn, trim($data->student_level));
    $idlevel_student = mysqli_real_escape_string($conn, trim($data->student_level_etudiant));
    if (filter_var($etudiantemail, FILTER_VALIDATE_EMAIL)) {
        $updatestudent = mysqli_query($conn, "UPDATE un_etudiant SET  nom_etudiant='$etudiantname', prenom_etudiant='$etudiantprenom' ,cin_etudiant='$etudiantcin' ,tel_etudiant='$etudianttel' , mail_etudiant='$etudiantemail' , login_etudiant='$etudiantlogin'   WHERE id_etudiant='$etudiantid'") ;
        
        
        
        if ($updatestudent) {
            echo json_encode(["success"=>$idlevel_student,"msg"=>"etudiant updateed."]);
            $updatelevel=mysqli_query($conn, "UPDATE un_niveau_etudiant set id_niveau=$etudiantlevel WHERE id_niveau_etudiant=$idlevel_student");
        } else {
            echo json_encode(["success"=>0,"msg"=>"etudiant Not updated!"]);
        }
    } else {
        echo json_encode(["success"=>0,"msg"=>"Invalid Email Address!"]);
    }
} else {
    echo json_encode(["success"=>0,"msg"=>"Please fill all the required fields!"]);
}

$conn->close();