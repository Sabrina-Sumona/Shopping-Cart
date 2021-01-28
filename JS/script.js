// Define UI elements
let cart = document.querySelector('#products');
let clearBtn = document.querySelector('#clear_cart_btn');

for (let i = 1; i <= 5; i++) {
    // Define UI element
    let list = document.querySelector(`ol li:nth-child(${i})`);

    // Event listener
    list.addEventListener('click', addProduct);

    //Add product function
    function addProduct(e) {
        //create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(list.textContent));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'Remove';
        li.appendChild(link);
        cart.appendChild(li);
        storeProductInLocalStorage(list.textContent);
        // prevent loading
        e.preventDefault();
    }
}

// Event listeners
cart.addEventListener('click', removeProduct);
clearBtn.addEventListener('click', clearCart);
document.addEventListener('DOMContentLoaded', getProducts);

//Remove product function
function removeProduct(e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are you sure?")) {
            let ele = e.target.parentElement;
            ele.remove();
            removeFromLS(ele);
        }
    }
}

//Clear cart  function
function clearCart(e) {
    while (cart.firstChild) {
        cart.removeChild(cart.firstChild);
    }
    localStorage.clear();
}

//Store product in local storage
function storeProductInLocalStorage(product) {
    let products;
    if (localStorage.getItem('products') === null) {
        products = [];
    } else {
        products = JSON.parse(localStorage.getItem('products'));
    }
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}

 //Get product from local storage
 function getProducts() {
    let products;
    if (localStorage.getItem('products') === null) {
        products = [];
    } else {
        products = JSON.parse(localStorage.getItem('products'));
    }
    products.forEach(product => {
        //create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(product + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'Remove';
        li.appendChild(link);
        cart.appendChild(li);
    })
}

//Remove product from local storage
function removeFromLS(productItem) {
    let products;
    if (localStorage.getItem('products') === null) {
        products = [];
    } else {
        products = JSON.parse(localStorage.getItem('products'));
    }
    let li = productItem;
    li.removeChild(li.lastChild);
    products.forEach((product, index) => {
        if (li.textContent.trim() == product.trim()) {
            products.splice(index, 1);
        }
    });
    localStorage.setItem('products', JSON.stringify(products));
}
