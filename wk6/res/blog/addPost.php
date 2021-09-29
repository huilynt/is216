<?php
require_once 'common.php';
$status = false;
$result = [];

if( isset($_GET['subject']) && isset($_GET['entry']) && isset($_GET['mood']) ) {
    $subject = $_GET['subject'];
    $entry = $_GET['entry'];
    $mood = $_GET['mood'];

    $result["subject"] = $subject;

    $dao = new PostDAO();
    $status = $dao->add($subject, $entry, $mood);
} else {
    try {
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        
        $subject = $data->subject;
        $entry = $data->entry;
        $mood = $data->mood;
    
        $result["subject"] = $subject;
    
        $dao = new PostDAO();
        $status = $dao->add($subject, $entry, $mood);
       
    } catch (Exception $e) {
        $status = false;
    }
  
}


if ($status)
    $result["status"] = "Post added successfully";
else 
    $result["status"] = "Post was not added";

$postJSON = json_encode($result);
echo $postJSON;
?>


