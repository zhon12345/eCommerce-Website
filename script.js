const cardAmount = document.querySelector(".cartAmount");

if (cardAmount.innerText <= '0') {
    cardAmount.style.display = "none"
}

// Products Page
const products = document.querySelector(".grid-container");
const productsData = [
    {
        id: "eedglnll",
        name: "Xiaomi 13 Ultra",
        img: "/assets/products/13 Ultra/phone.png",
        url: "/products/xiaomi-13-ultra.html"
    },
    {
        id: "ujpkxroa",
        name: "Xiaomi 13 Pro",
        img: "/assets/products/13 Pro/phone.png",
        url: "/products/xiaomi-13-pro.html"
    },
    {
        id: "yucqehjm",
        name: "Redmi Note 12 5G",
        img: "/assets/products/Note 12 5G/phone.png",
        url: "/products/redmi-note-12-5g.html"
    },
    {
        id: "pftymued",
        name: "Redmi 12C",
        img: "/assets/products/12C/phone.png",
        url: "/products/redmi-12c.html"
    }
]

const generateShop = () => {
    return(products.innerHTML = productsData.map(item => {
        return `
        <div class="products" id="${item.id}">
            <a href="${item.url}">
                <div class="product-header">
                    <img src="${item.img}" width="100%" alt="${item.name}" />
                </div>
                <div class="product-details">
                    <h1>${item.name}</h1>
                    <button>Learn More</button>
                </div>
            </a>
        </div>`
    }).join(""));
};

generateShop();

// Product Page
const active = document.querySelector(".image-container");
const thumbnails = document.querySelectorAll(".thumbnails img");

thumbnails.forEach(image => {
    image.addEventListener('click', () => {
        active.querySelector('img').src = image.src
    })
})