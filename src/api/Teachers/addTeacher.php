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
if (isset($data->enseignant_name)
    && isset($data->enseignant_email)
    && !empty(trim($data->enseignant_name))
    && !empty(trim($data->enseignant_email))
    ) {
    $enseignantname = mysqli_real_escape_string($conn, trim($data->enseignant_name));
    $enseignantprenom = mysqli_real_escape_string($conn, trim($data->enseignant_prenom));
    $enseignantcin = mysqli_real_escape_string($conn, trim($data->enseignant_cin));
    $enseignanttel = mysqli_real_escape_string($conn, trim($data->enseignant_tel));
    $enseignantemail = mysqli_real_escape_string($conn, trim($data->enseignant_email));
    $enseignantlogin = mysqli_real_escape_string($conn, trim($data->enseignant_login));
    $teacherpass = generateRandomString(10);
    $confierm_key_teacher = generateRandomString(30);
    $teacherpass_hached = md5("un_".$teacherpass.strtoupper($teacherpass));
    if (filter_var($enseignantemail, FILTER_VALIDATE_EMAIL)) {
        if (mysqli_num_rows(mysqli_query($conn, "SELECT * FROM  un_enseignant WHERE mail_enseignant='$enseignantemail'"))>0) {
            echo json_encode(["success"=>0,"msg"=>"Email already exist"]);
        } else {
            if (mysqli_num_rows(mysqli_query($conn, "SELECT * FROM  un_enseignant WHERE login_enseignant='$enseignantlogin'"))>0) {
                $id_teacher = $conn->insert_id;
                //$message = "Bonjour Mr ";
                $header  = "MIME-Version: 1.0\r\n";
                $header .= "Content-type: text/html; charset: utf8\r\n";
                $message = "<html><head><meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\" /></head><body>Bonjour Mr ".$enseignantname." ".$enseignantprenom.",<br/><br/>Vous avez été ajouter comme Etudiant sous l'application un_app<br/><br/>Votre Login : ".$enseignantemail."<br/>Votre Mot de pass : ".$teacherpass."<br/><br/>Veuillez confirmer votre enregistrement en accédant au lien suivant : <a href=\"https://it-open-sprite.com/api/confirmetudiant.php?key=".$confierm_key_teacher."&id_etudiant=".$id_teacher."\">Connexion</a>.<br/><br/>Cordialement.</body></html>";

                // Dans le cas où nos lignes comportent plus de 70 caractères, nous les coupons en utilisant wordwrap()
                $message = wordwrap($message, 70, "\r\n");

                mail($studentemail, 'UN_APP E-mail inscription', $message, $header);
                
                echo json_encode(["success"=>0,"msg"=>"Login already exist"]);
            } else {
                if (mysqli_num_rows(mysqli_query($conn, "SELECT * FROM  un_enseignant WHERE cin_enseignant='$enseignantcin'"))>0) {
                    echo json_encode(["success"=>0,"msg"=>"Cin already exist"]);
                } else {
                    $insertenseignant = mysqli_query($conn, "INSERT INTO un_enseignant ( nom_enseignant, prenom_enseignant ,cin_enseignant ,tel_enseignant , mail_enseignant , login_enseignant,pass_enseignant, confierm_key_enseignant,add_date_eseignant) VALUES('$enseignantname','$enseignantprenom','$enseignantcin','$enseignanttel','$enseignantemail','$enseignantlogin','$teacherpass_hached','$confierm_key_teacher',SYSDATE())");
                    if ($insertenseignant) {
                        echo json_encode(["success"=>1,"msg"=>"enseignant Inserted"]);
                    } else {
                        echo json_encode(["success"=>0,"msg"=>"enseignant Not Inserted!"]);
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