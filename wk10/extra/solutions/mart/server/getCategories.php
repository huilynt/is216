<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

require_once 'model/Mart.php';
$mgr = new Mart();


echo json_encode( $mgr->getCategories(), JSON_PRETTY_PRINT );