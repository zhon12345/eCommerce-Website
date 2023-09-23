let basket = JSON.parse(localStorage.getItem("cart")) || [];

function calculate() {
    const cartAmount = document.querySelector(".cartAmount");
    const totalQuantity = basket.reduce((sum, item) => sum + item.num, 0);
    cartAmount.innerHTML = totalQuantity;
}

calculate();

function formatNum(num) {
    return (num).toLocaleString('en', {maximumFractionDigits: 2, minimumFractionDigits: 2})
}

function formAlert(text) {
   return alert(text);
}