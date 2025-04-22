var removeCartItemButtons = document.getElementsByClassName('remove-btn');
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
}

var quantityInputs = document.getElementsByClassName('qty');
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
}

var addToCartButtons = document.getElementsByClassName('add-btn');
for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked); // Fixed function reference
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement;
    var title = shopItem.getElementsByClassName('name')[0].innerText;
    var price = shopItem.getElementsByClassName('price')[0].innerText
    console.log(title,price);
    addItemToCart(title,price)
}
function addItemToCart(title, price) {
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('name');

    // Prevent adding duplicate items
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            alert('This item is already in the cart');
            return;
        }
    }

    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-item');

    var cartRowContents = `
        <span class="name">${title}</span>
        <span class="price">${price}</span>
        <input class="qty" type="number" value="1">
        <button class="remove-btn">Remove</button>
    `;

    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);

    // Add event listeners to new elements
    cartRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('qty')[0].addEventListener('change', quantityChanged);

    updateCartTotal();
}


function updateCartTotal() {
    var cartItemsContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemsContainer.getElementsByClassName('cart-item');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('price')[0];
        var quantityElement = cartRow.getElementsByClassName('qty')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = Number(quantityElement.value);
        total += price * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total.toFixed(2);
}
document.getElementsByClassName('purchase-btn')[0].addEventListener('click', purchaseClicked);

function purchaseClicked() {
  if (confirm('Thank you for your purchase!')) {
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
  }
}
