<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

function doProcess($cart ) {
    
    // Mock up code to simulate purchase by issuing a receipt    
    $receiptID = "" . rand(0,1000000);
    while ( strlen($receiptID) < 6 ) {
        $receiptID = '0' + $receiptID;
    }

    $total = 0;
    foreach ($cart as $item) {
        $total += $item->price * $item->quantity;
    }
    $results = [
        "receiptID" => $receiptID,
        'cart' => $cart,
        'total' => $total
    ];

    return $results;
}

$results = [
    "status" =>  false
];

if ( isset($_POST['cart'])) {
    $cart = json_decode($_POST['cart']);    
    $results = doProcess($cart );

} else { // axios sends via raw data
    $cart = json_decode( file_get_contents("php://input") )->cart;
    $results = doProcess($cart );

}
echo json_encode( $results, JSON_PRETTY_PRINT );
