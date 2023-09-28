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

function switchImage(num) {
    const active = document.querySelector(".image-container");
    const thumbnails = document.querySelectorAll(".thumbnails img");

    if (num === 0) {
        thumbnails.forEach(image => {
            image.addEventListener('click', () => {
                active.querySelector('img').src = image.src
            });
        });
        return;
    }

    active.querySelector('img').src = thumbnails[num - 1].src
}

function popupToggle() {
    const popup = document.querySelector(".popup");

    popup.classList.toggle("active")
}

function addCart(id) {
    const select = document.querySelector("select");

    if (select.selectedIndex === 0) {
        return alert("Please select a color!");
    }

    if (person.length > 0 && person.find(user => user.loggedin === true)) {
        return addBasket(id, select.selectedIndex ,select.value);
    }
    
    const result = confirm("You're not logged in, go to login page?");
    result ? window.location = `${window.location.origin}/login.html` : "";
}

function addBasket(id, index, color) {
    let search = basket.find(item => item.id === id && item.color.index === index);

    if (search !== undefined && search.color.index === index ) {
        return alert("Product is already in cart!");
    }

    basket.push({
        id: id,
        color: {index: index, name: color},
        num: 1
    })

    localStorage.setItem("cart", JSON.stringify(basket));

    calculate();
}