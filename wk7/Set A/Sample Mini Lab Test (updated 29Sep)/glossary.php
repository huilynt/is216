<?php
    // how to call: glossary.php. 
    // no params are required. This PHP file will return a JSON object

    header("Access-Control-Allow-Origin: *");
  
    // send json string back to client
    $text = '{"glossary": {"title": "example glossary","GlossDiv": {"title": "S","GlossList": {"GlossEntry": {"ID": "SGML","SortAs": "SGML","GlossTerm": "Standard Generalized Markup Language","Acronym": "SGML","Abbrev": "ISO 8879:1986","GlossDef": {"para": "A meta-markup language, used to create markup languages such as DocBook.","GlossSeeAlso": ["GML", "XML"]},"GlossSee": "markup"}}}}}';
    echo $text;
?>
