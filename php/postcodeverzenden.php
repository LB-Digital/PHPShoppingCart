<?php


// Verzend button naar de gekozen locatie website
if(isset($_POST['postcode'])) {
    $postcode = $_POST['postcode'];

    if ($postcode >= 1012 && $postcode <= 1109) {
        //is Amsterdam
        header('Location: /Pizza%20Sopranos/amsterdam.html');
    } elseif ($postcode >= 3011 && $postcode <= 3089) {
        //is Rotterdam
        header('Location: /Pizza%20Sopranos/rotterdam.html');
    } elseif ($postcode >= 3454 && $postcode <= 3585) {
        //is Utrecht
        header('Location: /Pizza%20Sopranos/utrecht.html');
    } else {
        echo "Sorry! Wij bezorgen hier niet!";
    }
}