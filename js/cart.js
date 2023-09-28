function generateCart() {
    const cartContainer = document.querySelectorAll("h1#cart-header, div.cart-container, div.total-price");
    const emptyCart = document.querySelector(".empty-container");
    const cartBody = document.querySelector(".cart-container tbody");

    if (basket.length === 0) {
        emptyCart.classList.remove("not-active")
        cartContainer.forEach(element => {
            element.classList.add("not-active");
        });

    }

    if (basket.length !== 0) {
        emptyCart.classList.add("not-active")
        cartContainer.forEach(element => {
            element.classList.remove("not-active");
        });

        const user = person.find(users => users.loggedin === true);

        user === undefined ? "" : document.querySelector("#cart-header").innerText = `${user.username}'s Cart`

        cartBody.innerHTML = basket.map(item => {
            const product = products.find(product => product.id === item.id) || [];
            return `
                <tr>
                    <td>
                        <div class="cart-info">
                            <img src="./assets/products/${product.name}/phone${item.color.index}.jpg" />
                            <div class="cart-text">
                                <p><b>${product.name}</b></p>
                                <span>${item.color.name}</span>
                                <a onclick="removeItem('${item.id}', ${item.color.index})">Remove</a>
                            </div>
                        </div>
                    </td>
                    <td>RM ${formatNum(parseInt(product.price))}</td>
                    <td>
                    <div class="quantity-wrapper">
                        <span onclick="decrement('${item.id}', ${item.color.index})" class="fa-solid fa-minus"></span>
                        <span id="${item.id}" class="${item.color.index} num">${item.num}</span>
                        <span onclick="increment('${item.id}', ${item.color.index})" class="fa-solid fa-plus"></span>
                    </div>
		    		</td>
                    <td class="subtotal">RM ${formatNum(product.price * item.num)}</td>
                </tr>
            `
        }).join("");

        generateTotal();
    }
}

generateCart();

function generateTotal() {
    const cartFoot = document.querySelector(".cart-container tfoot");
    
    const { total, amount } = basket.reduce((accumulator, items) => {
        const product = products.find(item => item.id === items.id) || {};
        accumulator.total += items.num * product.price;
        accumulator.amount += items.num;
        return accumulator;
    }, { total: 0, amount: 0 });

    const discount = book.map(item => item.amount).reduce((accumulator, coupon) => accumulator + coupon, 0)
    
    const shipping = amount > 5 ? (amount / 10) * 5 : 3

    cartFoot.innerHTML = 
        `<tr>
            <td colspan="2"></td>
            <td colspan="2" class="div"></td>
        </tr>

        <tr>
            <td colspan="2">
                <div class="coupon">
                    <h3>Apply Coupons</h3>
                    <form class="coupon-input" method="GET">
                        <input type="text" name="coupon" placeholder="Enter Coupon Code" required />
                        <button type="submit" onclick="validateCoupon()">Apply</button>
                    </form>
                </div>
            </td>
			<td>
                <div class="total">
                    <b>Subtotal</b>
                    <b>Discount</b>
                    <b>Shipping Fee</b>
                    <b>Grand Total</b>
                </div>
            </td>
			<td>
                <div class="total">
                    <p>RM<span class="amount">${formatNum(total)}</span></p>
                    <p>RM<span class="amount">${formatNum(discount)}</span></p>
                    <p>RM<span class="amount">${formatNum(shipping)}</span></p>
                    <p>RM<span class="amount">${formatNum(total - discount + shipping)}</span></p>
                </div>
            </td>
		</tr>

        <tr>
            <td colspan="2"></td>
			<td colspan="2" class="checkout">
                    <button onclick="checkout()">Checkout</button>
            </td>
		</tr>`
}

function increment(id, index) {
    const search = basket.find(item => item.id === id && item.color.index === index);

    search.num += 1;

    generateCart();
    update(id, index);
    localStorage.setItem("cart", JSON.stringify(basket))
}

function decrement(id, index) {
    const search = basket.find(item => item.id === id && item.color.index === index);

    if (search === undefined) return;
    if (search.num === 1) return;

    search.num -= 1;
    
    update(id, index);
    basket = basket.filter(item => item.num !== 0)
    generateCart();
    localStorage.setItem("cart", JSON.stringify(basket));
}

function update(id, index) {
    const search = basket.find(item => item.id === id);
    const update = document.getElementById(id);

    if (update.classList.contains(index)) {
        update.innerHTML = search.num;       
    }

    calculate();
}

function removeItem(id, index) {
    basket = basket.filter(item => item.id !== id || item.color.index !== index);
    generateCart();
    calculate();
    localStorage.setItem("cart", JSON.stringify(basket));
}

function validateCoupon() {
    const form = document.querySelector(".coupon-input");
    const data = new FormData(form);
    const value = data.get("coupon");

    if (!value) return;

    const coupon = coupons.find(coupon => coupon.code === value);

    if(coupon === undefined) {
        return alert("Invalid coupon code!");
    } 

    const search = book.find(item => item.code === value);

    if (search !== undefined && search.code === value) {
        return alert("You've already used this code!");
    }
        
    book.push({
        code: value,
        amount: 5
    });

    localStorage.setItem("discount", JSON.stringify(book));
    alert("You've received a discount of RM 5.00!");
}

function clearCart() {
    basket = [];
    localStorage.setItem("cart", JSON.stringify(basket));
}

function clearCoupon() {
    book = [];
    localStorage.setItem("discount", JSON.stringify(book));
}

function checkout() {
    const search = person.find(user => user.loggedin === true);;

    if (search === undefined) {
        return window.location = `${window.location.origin}/login.html`;
    }

    if (confirm("Are you sure you want to proceed?") === true) {
        clearCart();
        clearCoupon();

        return window.location = `${window.location.origin}/thanks.html`
    }   
}