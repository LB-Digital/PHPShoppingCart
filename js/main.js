

$(document).ready(function(){
  displayCart();
});

$(document).on('click', '.toevoegenbox', function(ev){ // ADD TO CART
  var foodData = {};

  foodData['category'] = $(this).attr('data-foodCategory');
  foodData['type'] = $(this).attr('data-foodType');

  var foodSection = $('section#foodSection_' + foodData['type']);
  foodData['quantity'] = foodSection.find('input.aantalbox').val();

  if (foodData['category'] == "pizza") {
    foodData['size'] = foodSection.find('select.selectSize').val();
  }


  $.ajax({
    url: 'php/addToCart.php',
    method: 'POST',
    data: foodData,
    success: function(response){
      console.log(response);
      if (response == "success") {
        displayCart();
      }
    }

  });

});



var cartDict = {}; //  dictionary to store data about cart items
cartDict['itemPrices'] = { // itemType:price
  // pizza...
  'cheesySteak': 7.49,
  'vegetariano': 4.99,
  'quattroFormaggio': 9.99,
  'sopranosDeluxe': 12.74,
  // drink...
  'cocaCola': 1.49,
  'fanta': 1.49,
  'fernandes': 1.49,
  'sprite': 1.49,
  'liptonIceTeaGreen': 2.99,
  'liptonIceTeaSparkling': 2.99,
  'water': 0.99,
  'fusionCitroen': 1.99,
  // icecream...
  'cookieDough': 6.95,
  'caramelChewChew': 6.95,
  'chocolateFudgeBrownie': 6.95,
  'chunkyMonkey': 6.95,
  'karamelSutra': 6.95,
  'cinnamonBuns': 6.95,
  'oneSweetWorld': 6.95,
  'strawberryCheesecake': 6.95
}

cartDict['pizza'] = {
  'cheesySteak': "Cheesy Steak",
  'vegetariano': "Vegetariano",
  'quattroFormaggio': "Quattro Formaggio",
  'sopranosDeluxe': "Sopranos Deluxe"
}
cartDict['pizzaSizes'] = {
  '25cmmedium': "Medium Pizza (25 cm)",
  '35cmlarge': "Large Pizza (35 cm)",
  'calzone': "Calzone (Opgevouwen) Pizza"
}

cartDict['drink'] = {
  'cocaCola': "Coca Cola",
  'fanta': "Fanta",
  'fernandes': "Fernandes",
  'sprite': "Sprite",
  'liptonIceTeaGreen': "Lipton Ice Tea Green",
  'liptonIceTeaSparkling': "Lipton Ice Tea Sparkling",
  'water': "Water (Chaudfontaine)",
  'fusionCitroen': "Chaudfontaine Fusion Citroen"
}

cartDict['icecream'] = {
  'cookieDough': "Cookie Dough",
  'caramelChewChew': "Caramel Chew Chew",
  'chocolateFudgeBrownie': "Chocolate Fudge Brownie",
  'chunkyMonkey': "Chunky Monkey",
  'karamelSutra': "Karamel Sutra",
  'cinnamonBuns': "Cinnamon Buns",
  'oneSweetWorld': "One Sweet World",
  'strawberryCheesecake': "Strawberry Cheesecake"
}



function displayCart(){
  var cartEl = $('#shoppingCart');
  cartEl.html('');

  $.ajax({
    url: 'php/getCart.php',
    success: function(response){
      if (response != "null") {
        var cart = JSON.parse(response);
        console.log(cart);

        var cartPrice = 0.00;
        for (var foodCategory in cart) {
          if (cart.hasOwnProperty(foodCategory)) {

            for (foodItem of cart[foodCategory]){
              var newItem = foodItem['quantity'] + "x " + cartDict[foodCategory][foodItem['type']];
              newItem += "<span class='removeFromCart' data-foodCategory='" + foodCategory + "' data-foodType='" + foodItem['type'] + "'";
              if (foodCategory == "pizza") {
                newItem += " data-foodSize='" + foodItem['size'] + "'";
              }
              newItem += "><a>X</a></span><br>";
              if (foodCategory == "pizza"){
                newItem += cartDict['pizzaSizes'][foodItem['size']];
              }
              newItem += "<br><br>";
              cartEl.append(newItem);

              cartPrice += (cartDict['itemPrices'][foodItem['type']] * foodItem['quantity']);
            }

          }
        }

        $('#cartPrice').text('€' + cartPrice.toFixed(2));

      }

      $('#yourOrder').val($('#shoppingCart').html().replace(/<a>X<\/a>/g, ""));

    }
  });

}


$(document).on('click', '.removeFromCart', function(ev){
  var foodData = {};

  foodData['category'] = $(this).attr('data-foodCategory');
  foodData['type'] = $(this).attr('data-foodType');

  var foodSize = $(this).attr('data-foodSize');
  if (foodSize) {
    foodData['size'] = foodSize;
  }
  console.log(foodData);

  $.ajax({
    url: 'php/removeFromCart.php',
    method: 'POST',
    data: foodData,
    success: function(response){
      console.log(response);
      displayCart();
    }
  });
});
