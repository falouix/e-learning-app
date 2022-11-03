<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"));
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if ($_GET['etats_payment'] != 0) {
    $sql1 = "UPDATE un_guest SET etat_payment= " . $_GET['etats_payment'] . " WHERE id_guest = " . $_GET['id_niveau_etudiant'];

    if ($conn->query($sql1) === TRUE) {
        echo "Record updated successfully";
        return json_encode(['status' => true]);
    } else {
        echo "Error updating record: " . $conn->error;
        return json_encode(['status' => false]);
    }
}
$conn->close();