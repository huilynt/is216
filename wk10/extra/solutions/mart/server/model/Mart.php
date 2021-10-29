<?php
require_once 'Item.php';

/**
 * Quick and dirty DAO for CRUD accounts' details
 */
class Mart {

    private $categoryItemsMap; // assoc array

    public function __construct() {
        $this->categoryItemsMap = [
            'fruit' => [
                new Item( 'f1', 'apple', 1.95),
                new Item( 'f2', 'orange', 1.85),
                new Item( 'f3', 'pear', 2.15),
                new Item( 'f4', 'grapes', 4.95),
            ],
            'meat' => [
                new Item( 'mc1', 'chicken thigh', 6.95),
                new Item( 'mc2', 'chicken wings', 5.45),
                new Item( 'mc3', 'chicken breast', 5.05),
            ],
            'drink' => [
                new Item( 'd1', 'mineral water', 1.50),
                new Item( 'd2', 'milk', 1.50),
                new Item( 'd3', 'apple juice', 1.60),
                new Item( 'd4', 'orange juice', 1.60),
            ]
        ];
    }

    /**
     * @param $category string
     * @return array indexed array of strings
     */
    public function getCategories() {        
        return array_keys( $this->categoryItemsMap);
    }
    
    /**
     * @return array associative array
     *      key is category of items
     *      value is indexed array of associative arrays whose keys are the item's id, name, price
     */
    public function getItems($category) {        
        if ( isset($this->categoryItemsMap[$category]))  {
            return $this->categoryItemsMap[$category];
        }

        return [];
    }


    
}

// testing
if (basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
    $mgr = new Mart();

    echo "Get categories<br>
    ";
    var_dump($mgr->getCategories());

    echo "Get items('fruit')<br>
    ";
    var_dump($mgr->getItems('fruit'));

    echo "Get items('unknown')<br>
    ";
    var_dump($mgr->getItems('unknown'));

}