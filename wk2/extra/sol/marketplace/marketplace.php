<!DOCTYPE html>
<body>
    <?php

        $i = count($_GET);
        echo "You have selected the following : ";

        if ($i==1){
            echo " - ";
        }
        else
        {
            $all_list = $_GET;
            echo "<ol>";
            foreach ($all_list as $key => $value){
                if ($key <> "submit"){
                    echo "<li> $key  </li>
                            <ul>";
                    foreach ($value as $item){
                        echo "<li>" . $item . "</li>";
                    }
                    echo "</ul>";
                }
            }

            echo "</ol>";
        }
    ?>
</body>
</html>
