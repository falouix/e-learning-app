<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../../db_connection.php';
$data = json_decode(file_get_contents("php://input"));
            $Starting = mysqli_real_escape_string($conn, trim($data->Starting));
            $Ending = mysqli_real_escape_string($conn, trim($data->Ending));
            $day=mysqli_real_escape_string($conn, trim($data->day));
            $idme = mysqli_real_escape_string($conn, trim($data->id_me));
            $sql="INSERT INTO un_semaine (jour_semaine,debut_semaine,fin_semaine,id_matiere_enseignant) VALUES ('$day','$Starting','$Ending','$idme')";
            if ($result=mysqli_query($conn, $sql)) {
                echo json_encode(["success"=>1,"msg"=>"period inserted"]);
                $id_week = $conn->insert_id;
            } else {
                echo json_encode(["success"=>0,"msg"=>"period not inserted"]);
            }
           
            $sql_id_niveau = "SELECT un_matiere_enseignant.id_niveau,un_matiere.nom_matiere FROM un_matiere_enseignant LEFT JOIN un_matiere ON un_matiere_enseignant.id_matiere = un_matiere.id_matiere WHERE id_matiere_enseignant = '$idme'";
            echo($sql_id_niveau);
            $result_id_niveau=mysqli_query($conn, $sql_id_niveau);
            $id_niveau = mysqli_fetch_all($result_id_niveau, MYSQLI_ASSOC);
            $sql_periodes = "SELECT * FROM un_periode_etude WHERE id_niveau = ".$id_niveau[0]['id_niveau'];
            echo($sql_periodes);
            $result_periodes=mysqli_query($conn, $sql_periodes);
            $periodes = mysqli_fetch_all($result_periodes, MYSQLI_ASSOC);
            $Starting_array = explode(":", $Starting);
            $Ending_array = explode(":", $Ending);
            $Starting_s = ((int) $Starting_array[0] * 3600)+((int) $Starting_array[1] * 60);
            $Ending_s = ((int) $Ending_array[0] * 3600)+((int) $Ending_array[1] * 60);
            var_dump($Starting_array, $Ending_array, $Starting_s, $Ending_s);
            $jours = array();
            $jours = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
            foreach ($periodes as $periode) {
                var_dump($periode['dated_periode_etude']);
                $dated = date_create($periode['dated_periode_etude']);
                $md = date_format($dated, 'm');
                $dd = date_format($dated, 'd');
                $Yd = date_format($dated, 'Y');
                $datef = date_create($periode['datef_periode_etude']);
                $mf = date_format($datef, 'm');
                $df = date_format($datef, 'd');
                $Yf = date_format($datef, 'Y');
                $debut_date = mktime(0, 0, 0, (int)$md, (int) $dd, (int) $Yd);
                $fin_date = mktime(0, 0, 0, (int)$mf, (int) $df, (int) $Yf);
                //$debut_date_hi_deb = mktime((int) $Starting_array[0], (int) $Starting_array[1], 0, (int)$md, (int) $dd, (int) $Yd);
                //$debut_date_hi_fin = mktime((int) $Ending_array[0], (int) $Ending_array[1], 0, (int)$md, (int) $dd, (int) $Yd);
                for ($i = $debut_date; $i <= $fin_date; $i+=86400) {
                    if (date("l", $i) == $jours[(int)$day - 1 ]) {
                        //$datei = date("Y-m-d H:i:s", $i);
                        $mi = date("m", $i);//date_format($datei, 'm');
                        $di = date("d", $i);//date_format($datei, 'd');
                        $Yi = date("Y", $i);//date_format($datei, 'Y');
                        $i1 = mktime(0, 0, 0, (int)$mi, (int) $di, (int) $Yi);
                        $i = $i1;
                        echo($Yi.'<br/>');
                        //echo(date("l", $i).'<br/>');
                        //$sql_insert_seance = "INSERT INTO `un_seance` (`titre_sceance`, `id_matiere_enseignant`, `date_deb_seance`, `date_fin_seance`) VALUES ('".$id_niveau[0]['nom_matiere']."', ".$idme.", '".date("Y-m-d H:i:s", $i+($debut_date_hi_deb - $debut_date))."', '".date("Y-m-d H:i:s", $i+($debut_date_hi_fin - $debut_date))."')";
                        $js = $i1 + $Starting_s;
                        $je = $i1 + $Ending_s;
                        //echo($js.'<br/>');
                        //echo(date("l", $js).'<br/>');
                        $sql_insert_seance = "INSERT INTO `un_seance` (`titre_sceance`, `id_matiere_enseignant`, `date_deb_seance`, `date_fin_seance`,`id_semaine`) VALUES ('".$id_niveau[0]['nom_matiere']."', ".$idme.", '".date("Y-m-d H:i:s", $js)."', '".date("Y-m-d H:i:s", $je)."',$id_week)";
                        echo($sql_insert_seance);
                        echo($i.'<br/>');
                        mysqli_query($conn, $sql_insert_seance);
                    }
                }
            }
            
    

$conn->close();