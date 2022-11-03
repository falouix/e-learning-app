<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';
 function generateRandomString($length = 10)
 {
     $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
     $charactersLength = strlen($characters);
     $randomString = '';
     for ($i = 0; $i < $length; $i++) {
         $randomString .= $characters[rand(0, $charactersLength - 1)];
     }
     return $randomString;
 }

$data = json_decode(file_get_contents("php://input"));
if (isset($data->student_name)
    && isset($data->student_email)
    && !empty(trim($data->student_name))
    && !empty(trim($data->student_email))
    ) {
    $studentname = mysqli_real_escape_string($conn, trim($data->student_name));
    $studentprenom = mysqli_real_escape_string($conn, trim($data->student_prenom));
    $studentcin = mysqli_real_escape_string($conn, trim($data->student_cin));
    $studenttel = mysqli_real_escape_string($conn, trim($data->student_tel));
    $studentemail = mysqli_real_escape_string($conn, trim($data->student_email));
    $studentlogin = mysqli_real_escape_string($conn, trim($data->student_login));
    $studentlevel = mysqli_real_escape_string($conn, trim($data->student_level));
    $studentpass = generateRandomString(10);
    $confierm_key_etudiant = generateRandomString(30);
    $etudiantpass_hached = md5("un_".$studentpass.strtoupper($studentpass));
    if (filter_var($studentemail, FILTER_VALIDATE_EMAIL)) {
        //echo("INSERT INTO un_etudiants ( nom_etudiants, prenom_etudiants ,cin_etudiants ,tel_etudiants , mail_etudiants , login_etudiants , pass_etudiants , rool_etudiant , confierm_key_etudiant , add_date_etudiant) VALUES('$etudiantname','$etudiantprenom','$etudiantcin','$etudianttel','$etudiantemail','$etudiantlogin','$etudiantpass_hached','2','$confierm_key_etudiant',SYSDATE())");die();
        if (mysqli_num_rows(mysqli_query($conn, "SELECT * FROM  un_etudiant WHERE mail_etudiant='$studentemail'"))>0) {
            echo json_encode(["success"=>0,"msg"=>"Email already exist"]);
        } else {
            if (mysqli_num_rows(mysqli_query($conn, "SELECT * FROM  un_etudiant WHERE login_etudiant='$studentlogin'"))>0) {
                echo json_encode(["success"=>0,"msg"=>"Login already exist"]);
            } else {
                $insertetudiant = mysqli_query($conn, "INSERT INTO un_etudiant ( nom_etudiant, prenom_etudiant ,cin_etudiant ,tel_etudiant , mail_etudiant , login_etudiant , pass_etudiant , confierm_key_etudiant , add_date_etudiant) VALUES('$studentname','$studentprenom','$studentcin','$studenttel','$studentemail','$studentlogin','$etudiantpass_hached','$confierm_key_etudiant',SYSDATE())");
                if ($insertetudiant) {
                    $id_etudiant = $conn->insert_id;
                    //$message = "Bonjour Mr ";
                    $header  = "MIME-Version: 1.0\r\n";
                    $header .= "Content-type: text/html; charset: utf8\r\n";
                    $message = "<html><head><meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\" /></head><body>Bonjour Mr ".$studentname." ".$studentprenom.",<br/><br/>Vous avez été ajouter comme Etudiant sous l'application un_app<br/><br/>Votre Login : ".$studentemail."<br/>Votre Mot de pass : ".$studentpass."<br/><br/>Veuillez confirmer votre enregistrement en accédant au lien suivant : <a href=\"https://it-open-sprite.com/api/confirmetudiant.php?key=".$confierm_key_etudiant."&id_etudiant=".$id_etudiant."\">Connexion</a>.<br/><br/>Cordialement.</body></html>";

                    // Dans le cas où nos lignes comportent plus de 70 caractères, nous les coupons en utilisant wordwrap()
                    $message = wordwrap($message, 70, "\r\n");

                    mail($studentemail, 'UN_APP E-mail inscription', $message, $header);

                    echo json_encode(["success"=>1,"msg"=>"student Inserted"]);
                    //insert level table level_etudiant
                    $insertlevel = mysqli_query($conn, "INSERT INTO un_niveau_etudiant ( id_etudiant,id_niveau) VALUES('$id_etudiant' , '$studentlevel')");
                    if ($insertlevel) {
                        echo "level done!";
                    }
                } else {
                    echo json_encode(["success"=>0,"msg"=>"student Not Inserted!"]);
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