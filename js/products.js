function generateShop() {
    const productContainer = document.querySelector(".products-container");
    productContainer.innerHTML = products.map(item => {
        return `
        <div ${item.url === '#' ? 'class="products disabled"' : 'class="products"'} id="${item.id}">
            <a href="${item.url}">
                <div class="product-header">
                    <img src="./assets/products/${item.name}/phone.png" width="100%" alt="${item.name}" />
                </div>
                <div class="product-details">
                    <h1>${item.name}</h1>
                    <button>Learn More</button>
                </div>
            </a>
        </div>`
    }).join("");
};

function switchImage() {
    const active = document.querySelector(".image-container");
    const thumbnails = document.querySelectorAll(".thumbnails img");

    thumbnails.forEach(image => {
        image.addEventListener('click', () => {
            active.querySelector('img').src = image.src
        })
    })  
}

function addCart(id) {
    const select = document.querySelector("select");

    if (select.selectedIndex === 0) {
        alert("Please select a color!");
        return;
    }

    if (person.length > 0 && person.find(user => user.loggedin === true)) {
        addBasket(id, select.selectedIndex ,select.value);
        return;
    }
    
    const result = confirm("You're not logged in, go to login page?");
    result ? window.location = `${window.location.origin}/login.html` : "";
}

function addBasket(id, index, color) {
    let search = basket.find(item => item.id === id && item.color.index === index);

    if (search !== undefined && search.color.index === index ) {
        alert("Product is already in cart!");
        return;
    }

    basket.push({
        id: id,
        color: {index: index, name: color},
        num: 1
    })

    localStorage.setItem("cart", JSON.stringify(basket));

    calculate();
}