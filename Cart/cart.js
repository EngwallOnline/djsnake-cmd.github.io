function getCart() {
    let cart = JSON.parse(localStorage.getItem("cartList"));
    let total = 0;

    const container = document.getElementById("cartProducts");
    container.innerHTML = "";
    for (let i = 0; i < cart.length; i++) {
        container.innerHTML += `
            <tr style="margin: 10px;">
                <td class="title-txt">${cart[i].title}</td>
                <td>$${cart[i].price*cart[i].quantity}</td>
                <td style="text-align: center;"><img src="${cart[i].image}" style="max-height: 30px;"></td>
                <td>Quantity: ${cart[i].quantity} </td>
                <td style="text-align: center;">
                <button onclick="removeProduct(${i})" class="rmv-btn"><i class="fa fa-trash"></i></button> 
                <button onclick="removeOneFromCart(${i})" class="rmv-btn"><i class="fa fa-minus"></i></button>
                <button onclick="addOneToCart(${i})"class="rmv-btn"><i class="fa fa-plus"></i></button>
            </tr>
        `;
        total += parseFloat(cart[i].price*cart[i].quantity);
    }
    total = total.toFixed(2);
    const totalDiv = document.getElementById("totals");
    totalDiv.innerHTML="";
    totalDiv.innerHTML = `Total: $${total}`;
}

function removeProduct(itemPosition) {
    let cart = JSON.parse(localStorage.getItem("cartList"));
    cart.splice(itemPosition, 1);
    localStorage.setItem("cartList", JSON.stringify(cart));
    getCart();  
}

function removeOneFromCart(itemPosition){
    let cart = JSON.parse(localStorage.getItem("cartList"));
    cart[itemPosition].quantity--;
    if (cart[itemPosition].quantity < 1) {cart.splice(itemPosition, 1);}
    localStorage.setItem("cartList", JSON.stringify(cart));
    getCart();  
}

function addOneToCart(itemPosition){
    let cart = JSON.parse(localStorage.getItem("cartList"));
    cart[itemPosition].quantity++;
    localStorage.setItem("cartList", JSON.stringify(cart));
    getCart();  
}

function clearCart(){
    localStorage.clear();
    getCart();
}

function proceedToDetails(){
    window.location.href="../Order/order.html"
}

getCart();