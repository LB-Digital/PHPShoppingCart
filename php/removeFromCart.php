<?php

session_start();

$category = $_POST['category'];

$matchedKey = -1;
foreach ($_SESSION['shoppingCart'][$category] as $key => $value) { // for each food item of this category in cart
  if ($value['type'] == $_POST['type']) { // this food type exists

    if ($category == "pizza") {
      if ($value['size'] == $_POST['size']) {
        $matchedKey = $key;
      }
    }else{
      $matchedKey = $key;
    }
  }
}

if ($matchedKey > -1) {
  array_splice($_SESSION['shoppingCart'][$category], $matchedKey, 1); // remove food item from cart
}



 ?>
