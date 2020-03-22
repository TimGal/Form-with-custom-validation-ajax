<?php

if (isset($_POST["email"]) && isset($_POST["password"]) ) {

	// Формируем массив для JSON ответа
    $result = array(
    	'first_name' => $_POST["first_name"],
    	'last_name' => $_POST["last_name"],
    	'nationality' => $_POST["nationality"],
    	'email' => $_POST["email"],
    	'date_of_birth' => $_POST["date_of_birth"],
    	'month_of_birth' => $_POST["month_of_birth"],
    	'year_of_birth' => $_POST["year_of_birth"],
    	'gender' => $_POST["gender"],
    	'password' => $_POST["password"],
    );

    // Переводим массив в JSON
    echo json_encode($result);
}
