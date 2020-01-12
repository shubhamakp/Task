

$.getJSON("data.json", function(data) {
    var text = "";
    console.log(data.length);
    $.each(data,function(key,value){
        
        text+= '<div class="shop-item mine">';
        text+= '<span class="shop-item-title">' +  value.name + '</span>';
        text+= '<p  class="shop-item-ti"> <i>' + value.category + '</i></p>'
        text+= '<img class="shop-item-image" src="' + value.image + '">';
        text+= '<div class="shop-item-details">';
        text+= '<span class="shop-item-price">$ '+ value.price + '</span>';
        text+= '<button class="btn btn-primary shop-item-button btt" type="button">ADD TO CART</button>';
        text+= '</div>';
        text+= '</div>';
    })  ;           
    $(".hello").append(text);
});

$(window).on('load' ,
  function ready() {

    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('btt')
  // console.log((addToCartButtons.length))
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]

        button.addEventListener('click', addToCartClicked)
    }

    var purchase =  document.getElementsByClassName('btn-purchase')[0]

    purchase.addEventListener('click',add_db)
  // purchase.addEventListener('click', purchaseClicked)
   
})

function add_db() {

    var cartItems = document.getElementsByClassName('itm')
   for(var i=0;i<cartItems.length;i++)
   {
       console.log(cartItems[i])
   }
   purchaseClicked()
  
}
function purchaseClicked() {
    alert('Thank you for your purchase')
    console.log("pur")
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
       
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    console.log("remove")
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    var category = shopItem.getElementsByClassName('shop-item-ti')[0].innerText

    addItemToCart(title, price, imageSrc,category)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc,category) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    cartRow.classList.add('itm')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column ">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
       
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
        <form action="/" method="post">
        <input type="hidden" id="custId" name="title" value="${title}">
        <input type="hidden" id="custId" name="price" value="${price}">
        <input type="hidden" id="custId" name="category" value="${category}">
        </form>
        `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}