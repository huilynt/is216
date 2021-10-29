<?php

class Item implements \JsonSerializable{
   // properties
   
   private $id;
   private $name;
   private $price;

   // constructor
   
   public function __construct($id, $name, $price) {
      
      $this->id = $id;
      $this->name = $name;
      $this->price = $price;
   }


   // getters
   
   public function getId() {
      return $this->id;
   }

   public function getName() {
      return $this->name;
   }

   public function getPrice() {
      return $this->price;
   }


   // setters
   
   public function setId($id) {
      $this->id = $id;
   }

   public function setName($name) {
      $this->name = $name;
   }

   public function setPrice($price) {
      $this->price = $price;
   }


   // magic methods
   
   public function __toString() {
      return json_encode( [ 
            
         'id' => $this->id,

         'name' => $this->name,

         'price' => $this->price,
 
         ] );
   }

   public function jsonSerialize() { // for json_encode()
       return get_object_vars($this);
   }

} // end class Item