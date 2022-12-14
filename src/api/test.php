<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname="un_base";

// Create connection
$conn =mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
    exit();
} else {
    echo "connected";
}

?>