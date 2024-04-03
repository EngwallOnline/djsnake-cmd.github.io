class Product {
    constructor(id, image,title, price, description, category, rating, quantity) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.rating = rating;
        this.quantity = quantity;
    }
}

let productList;

async function fetchProducts() {
    let resp = await fetch(`https://fakestoreapi.com/products`);
    productList = await resp.json();

    let products = productList.map(product => {
        return new Product(
            product.id,
            product.image,
            product.title,
            product.price,
            product.description,
            product.category,
            product.rating,
            1 //quantity
        );
    });
    createCards(products);
}

function filterByCategory(apiCategory) {
    console.log("Inne i filterByCategory");
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://fakestoreapi.com/products${apiCategory}`)
    xhr.onload = function () {
        const products = JSON.parse(xhr.responseText);
        const container = document.getElementById('container');
        container.innerHTML = '';
        createCards(products)
    }
    xhr.send();
}

function createCards(products) {
    const container = document.getElementById('container');
    products.forEach(product =>{
        const div = document.createElement('div');
        div.className = "col-sm-6 col-md-3 col-lg-2 ms-3 mt-3 full-page d-flex justify-content-center";
        div.innerHTML = `
        <div class="card">
                <div class="card-img-container">
                    <img src="${product.image}" class="card-img-top" style="max-width: 80%; height: auto;" alt="">
                </div>
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                            <div class="bread-container">
                                <p class="card-text">Price: $${product.price}</p>
                                <button class="btn-custom" onclick="addToCart(${product.id})">Add to cart</button>
                            </div>
                    </div>
        </div>`;
        container.appendChild(div);
    })
}

function addToCart(productId){
    let cartList = JSON.parse(localStorage.getItem("cartList")) || [];
    const productToCart = productList.find(product => product.id === productId);
    let existingProduct = cartList.find(item => item.id === productId);

    if(existingProduct){
         existingProduct.quantity++;
     } else{
         productToCart.quantity = 1;
         cartList.push(productToCart);
     }
    
    localStorage.setItem("cartList", JSON.stringify(cartList));
}

const mensClothing = encodeURIComponent("men's clothing")
const womensClothing = encodeURIComponent("women's clothing")

const btnMappings =
    [
        {
            elementId: "category-all-btn",
            urlPath: ""
        },
        {
            elementId: "category-jewelry-btn",
            urlPath: "/category/jewelery"
        },
        {
            elementId: "category-mens-btn",
            urlPath: `/category/${mensClothing}`
        },
        {
            elementId: "category-womens-btn",
            urlPath: `/category/${womensClothing}`
        },
        {
            elementId: "category-electronics-btn",
            urlPath: "/category/electronics"
        }
    ]

function populateButtons(btnMappings) {
    btnMappings.forEach(element => {
        document.getElementById(element.elementId).addEventListener('click', function () {
            filterByCategory(element.urlPath);
        })
    });
}

populateButtons(btnMappings);
fetchProducts();