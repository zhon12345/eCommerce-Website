function generateShop() {
    const productContainer = document.querySelector(".grid-container");
    productContainer.innerHTML = products.map(item => {
        return `
        <div class="products" id="${item.id}">
            <a href="${item.url}">
                <div class="product-header">
                    <img src="/assets/products/${item.folder}/phone.png" width="100%" alt="${item.name}" />
                </div>
                <div class="product-details">
                    <h1>${item.name}</h1>
                    <button>Learn More</button>
                </div>
            </a>
        </div>`
    }).join("");
};

const active = document.querySelector(".image-container");
const thumbnails = document.querySelectorAll(".thumbnails img");

thumbnails.forEach(image => {
    image.addEventListener('click', () => {
        active.querySelector('img').src = image.src
    })
})  

function addCart(id) {
    const select = document.querySelector("select");

    if (select.selectedIndex === 0) {
        window.alert("Please select a color!");
        return;
    }

    addBasket(id, select.selectedIndex ,select.value);
}

function addBasket(id, index, color) {
    let search = basket.find(item => item.id === id && item.color.index === index);

    if (search !== undefined && search.color.index === index ) {
        window.alert("Product is already in cart!");
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