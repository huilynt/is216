<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

require_once 'model/Mart.php';

$results = [
    "status" =>  false
];

if ( isset($_GET['category']) ) {
    $category = $_GET['category'];
    
    $mgr = new Mart();
    
    $results = $mgr->getItems($category);
}

echo json_encode( $results, JSON_PRETTY_PRINT );