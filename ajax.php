<?php
    $url = "http://misc.mymagic.my/interview-frontend/vuejs/json.php";
    $string = file_get_contents($url); // Read JSON file 
    $json_a = json_decode($string, true); // Create String to JSON object
    if(isset($json_a['data'])) { // Check Data property is has or not
        $data = array_reverse($json_a['data']); // if has then reverse it becouse we need result in DESC formate
        $json_a['data'] = $data;
    }

    echo json_encode($json_a); // Print or return data so our ajax call get it with JSON format