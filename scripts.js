let card_list = document.querySelectorAll('.item-card');
let btn_list = document.querySelectorAll('.normal-btn');
let card_img = document.querySelectorAll('.item-pic');

let color_list = new Array("#ff80ed", "#133337", "#ffc0cb", "#008080", "#007bff", "#ffa500", "#40e0d0", "ff7373", "#bada55");

for (let card_number = 0; card_number < card_list.length; card_number++) {
    let color_index = parseInt(Math.random() * color_list.length);
    
    card_list[card_number].style.background = `linear-gradient(150deg, ${color_list[color_index]} 40%, transparent 0%)`;
    btn_list[card_number].style.background = color_list[color_index];
    card_img[card_number].style.borderColor = color_list[color_index];
}


document.querySelector('.discount-progress-bar').addEventListener('input', event => {
    document.querySelector('.discount-progress-bar').value = totalDiscountPrize;
});

let normal_btns = document.querySelectorAll('.normal-btn');

let productArray = {};
let productIndex = {};
let productNum = 0;
let totalDiscountPrize = 0;

let addProduct = (pro_name, pro_prize, pro_image) => {
    if (productArray[pro_name]) {
        productArray[pro_name] += 1;
        document.querySelectorAll('.product-num')[productIndex[pro_name]].innerHTML = productArray[pro_name];
    } else {
        productIndex[pro_name] = productNum;
        productNum += 1;
        productArray[pro_name] = 1;
        document.querySelector('.cart-product-list').innerHTML += `
            <div class="product-list-item">
                <img src="${pro_image}" class="product-pic">
                <div class="product-info --flex-center --flex-justify-between">
                    <div>
                        <h4 class="product-title">${pro_name}</h4>
                        <p class="product-description">In Stock</p>
                        <p class="product-prize-">Product Price: Rs. ${pro_prize}</p>
                    </div>
                    <div class="number-product --flex-center">
                        <div class="increase-product --flex-center" data-listener-added="false">
                            <img src="res/increase.png" class="btn-image">
                        </div>
                        <div class="product-num">1</div>
                    </div>
                </div>
            </div>`;
        setEventListener();
    }
    document.querySelector('.product-prize-list').innerHTML += `
        <li class="product-prize --flex-center --flex-justify-between">
            <span class="product-list-product-name">${pro_name}</span>
            <span class="product-list-product-prize">Rs. ${pro_prize}</span>
        </li>`;
    let total = document.querySelector('.product-total-prize').innerHTML.replace('Rs. ', '');
    document.querySelector('.product-total-prize').innerHTML = 'Rs. ' + (parseInt(total) + parseInt(pro_prize));
    totalDiscountPrize += parseInt(pro_prize);
    if (totalDiscountPrize < 1500) {
        document.querySelector('.discount-progress-bar').value = totalDiscountPrize;
        document.querySelector('.current-prize-tag').innerHTML = 'Rs. ' + totalDiscountPrize;
        document.querySelector('.discount-progress-description').innerHTML = ("If you purchase something more of Rs. " + (1500 - totalDiscountPrize) + ", then your will get discount of Rs. 200");
    } else {
        document.querySelector('.discount-progress-description').innerHTML = "Congratulations, now you can get discount of Rs. 200!";
        document.querySelector('.current-prize-tag').innerHTML = 'Rs. 1500';
        document.querySelector('.discount-progress-bar').value = 1500;
        document.querySelector('.discount-progress-bar').style.background = '#00ff00';
    }
}


let setEventListener = () => {
    let increase_btns = document.querySelectorAll('.increase-product');
    increase_btns.forEach(btn => {
        if (btn.getAttribute('data-listener-added') !== 'true') {
            btn.addEventListener('click', event => {
                let number_div = event.target.closest('.number-product');
                let num_of_products = parseInt(number_div.querySelector('.product-num').innerHTML);
                number_div.querySelector('.product-num').innerHTML = num_of_products + 1;
                let product = event.target.closest('.product-list-item');
                let productName = product.querySelector('.product-title').innerText;
                let ProductPrize = product.querySelector('.product-prize-').innerText.replace('Product Price: Rs. ', '');
                let productImage = product.querySelector('.product-pic').src;
                addProduct(productName, ProductPrize, productImage);
            });
            btn.setAttribute('data-listener-added', 'true');
        }
    });

    let decrease_btns = document.querySelectorAll('.decrease-product');
    decrease_btns.forEach(btn => {
        if (btn.getAttribute('data-listener-added') !== 'true') {
            btn.addEventListener('click', event => {
                let number_div = event.target.closest('.number-product');
                let num_of_products = parseInt(number_div.querySelector('.product-num').innerHTML);
                let item_box = event.target.closest('.product-list-item');
                let productName = item_box.querySelector('.product-title').innerHTML;
                if (num_of_products > 1) {
                    number_div.querySelector('.product-num').innerHTML = num_of_products - 1;
                } else {
                    item_box.remove();
                }
            });
            btn.setAttribute('data-listener-added', 'true');
        }
    });
}

normal_btns.forEach(btn => {
    btn.addEventListener('click', event => {
        let product = event.target.closest('.item-card');
        let productName = product.querySelector('.about-item').innerText.split('\n')[0].split(': ')[1];
        let ProductPrize = product.querySelector('.about-item').innerText.split('\n')[1].split(': ')[1].replace('Rs.', '');
        let productImage = product.querySelector('.item-pic').src;
        addProduct(productName, ProductPrize, productImage);
        setEventListener();
    });
});