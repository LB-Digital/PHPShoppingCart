<?php

session_start();

if ($_POST['type'] && $_POST['quantity'] && $_POST['category']) {

  $category = $_POST['category'];

  $foodData = [
    "type" => $_POST['type'],
    "quantity" => (int)$_POST['quantity']
  ];
  if ($category == "pizza") { // if pizza, needs a size too
    $foodData['size'] = $_POST['size'];
  }


  if (count($_SESSION['shoppingCart'][$category]) < 1) { // cart is empty of this category
    $_SESSION['shoppingCart'][$category] = [$foodData];
  }else{ // cart isn't empty

    // check if food item already in cart
    $matched = False;
    foreach ($_SESSION['shoppingCart'][$category] as $key => $value) { // for each food item of this category in cart
      if ($value['type'] == $foodData['type']) { // this food type already exists

        if ($category == "pizza") {
          if ($value['size'] == $foodData['size']) {
            $matched = True;
          }
        }else{
          $matched = True;
        }
        if ($matched) {
          $_SESSION['shoppingCart'][$category][$key]['quantity'] += $foodData['quantity']; // update quantity of this food item
        }
      }
    }

    if (!$matched) { // food item didn't already exist
      array_push($_SESSION['shoppingCart'][$category], $foodData); // so need to add it to cart, in correct category
    }

  }

  // echo json_encode($_SESSION['shoppingCart']);
  echo "success";

}else{
  echo "ERROR";
}


 ?>
