let cartIcon =  document.querySelector('#crat-icon');
let opencart = document.querySelector('.cart')
let clossIcon =  document.querySelector('#close-cart');

cartIcon.addEventListener('click', function(){
    opencart.classList.add('active')
})
clossIcon.addEventListener('click', function(){
    opencart.classList.remove('active')
})




if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready();
}

function ready() {
    var removeCartButtons = document.querySelectorAll('.cart-remove')
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', function(){
            button.parentElement.remove();
            updatetotal()
        });;
    }

    var quantityinputes = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityinputes.length; i++) {
        var input = quantityinputes[i]
        input.addEventListener('change', quantityChanged)
    }

    var addcart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addcart.length; i++) {
        var button = addcart[i]
        button.addEventListener('click', addcartClicked)
    }
    document.getElementsByClassName('btn-buy')[0].addEventListener('click',buyButtonClicked)
}
function buyButtonClicked(){
    alert('your order is placed')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updatetotal()
}
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatetotal()
}

function addcartClicked(event) {
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText
    var price = shopProducts.getElementsByClassName('price')[0].innerText
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src
    addProductToCart(title, price, productImg)
    updatetotal()
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div')
    cartShopBox.classList.add('cart-box')

    var cartItem = document.getElementsByClassName('cart-content')[0]
    var cartItemesNames = document.getElementsByClassName('cart-product-title')

    for (var i = 0; i < cartItemesNames.length; i++) {
        if (cartItemesNames[i].innerText == title) {
            alert("You have already added this item to cart.")
            return
        }
    }

    var cartBoxContent = 
        `<img src="${productImg}" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <span class="cart-remove"><i class="fa fa-trash"></i></span>`
    
    cartShopBox.innerHTML = cartBoxContent
    cartItem.appendChild(cartShopBox)

    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', 
    function(){
        this.parentElement.remove()
    })
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
}

function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var boxesCart = cartContent.getElementsByClassName('cart-box')
    var total = 0;
    for (var i = 0; i < boxesCart.length; i++) {
        var boxCart = boxesCart[i]
        var priceElement = boxCart.getElementsByClassName('cart-price')[0]
        var quantityElement = boxCart.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ""))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName('total-price')[0].innerText = "$" + total.toFixed(2)
}

function removeCartButtonsfun() {
    var button = event.target
    button.parentElement.remove();
    updatetotal()
}



