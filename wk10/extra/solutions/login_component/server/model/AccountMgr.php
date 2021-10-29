<?php

require_once 'Account.php';

/**
 * Quick and dirty DAO for retrieving accounts' details
 */
class AccountMgr {
    const FILENAME = "accounts.json";

    private $accounts; // assoc array

    public function __construct() {
        $this->accounts = [
            "apple.2020" => new Account("apple.2020","Apple TAN","apple.2020.pwd"),
            "orange.2020" => new Account("orange.2020","Orange CHAN","orange.2020.pwd"),
        ];
    }

    /**
     * @return array Account object
     * If not found, null
     */
    public function get($userid) {
        
        return $this->accounts[$userid] ?? null;
    }
    
}

// testing
if (basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
    $mgr = new AccountMgr();

    echo "Get Apple<br>
    ";
    var_dump($mgr->get('apple'));

    echo "Get unknown<br>
    ";
    var_dump($mgr->get('unknown'));

}