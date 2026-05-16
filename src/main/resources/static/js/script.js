

const links = document.querySelectorAll('.links');

links.forEach(link => {
    link.addEventListener('click', function () {

        // remove active class from all
        links.forEach(item => item.classList.remove('active'));

        // add active class to clicked one
        this.classList.add('active');
    });
});



// For filter butons
const filter = document.querySelectorAll('.filter_btn');

filter.forEach(link => {
    link.addEventListener('click', function () {

        // remove active class from all
        filter.forEach(item => item.classList.remove('filter-active'));

        // add active class to clicked one
        this.classList.add('filter-active');
    });
});


const hearts = document.querySelectorAll(".wishlist");

hearts.forEach(heart => {
    heart.addEventListener("click", () => {
        if (heart.classList.contains("fa-regular")) {
            heart.classList.remove("fa-regular");
            heart.classList.add("fa-solid", "active");
        } else {
            heart.classList.remove("fa-solid", "active");
            heart.classList.add("fa-regular");
        }
    });
});


let x;
function clicked(x) {
    console.log("Clicked x : " + x);
}

const products_div = document.getElementsByClassName('products_div');

function filterItems(category) {
    document.querySelectorAll(".card").forEach(item => {
        item.style.display = (category === "all" || item.classList.contains(category))
            ? "block" : "none";
        products_div[0].style.display = 'flex';
    });
}

function searchFood() {
    window.scrollTo({
        top: 670,
        left: 0,
        behavior: "smooth"   // smooth scrolling
    });
    let text = document.getElementById("search").value.toLowerCase();
    document.querySelectorAll(".card").forEach(card => {
        let title = card.querySelector("h3").innerText.toLowerCase();
        behavior: "smooth"
        card.style.display = title.includes(text) ? "block" : "none";
    });
}

function searchFoodForOrders() {

    let text = document.getElementById("search").value.toLowerCase();
    document.querySelectorAll(".card").forEach(card => {
        let title = card.querySelector("h1").innerText.toLowerCase();
        card.style.visibility = title.includes(text) ? "visible" : "hidden";
        card.style.width = title.includes(text) ? "" : '0px';
        card.style.height = title.includes(text) ? "" : '0px';
    });
}


// document.getElementById("aboutBtn").addEventListener("click", function (e) {
//     e.preventDefault();   // stop default behavior
//     window.scrollTo({
//         top: document.body.scrollHeight,
//         behavior: "smooth"   // smooth scrolling
//     });
// });


const hide = document.getElementsByClassName("hidden");
var display = 0;

const itemList = document.getElementsByClassName("selected_items");
var idArr = [];
var priceArr = [];
var nameArr = [];
var count = 0;
var come = true;
var i = 0;

var finalQtyArr = []; // In which quantity of item will be store. ex: juice 20 x 2 = 40 (qty = 2)
var finalAmount = 0;

function orderFun(id, price, name) {
    i = 0;
    for (const item of idArr) {
        if (item == id) {
            come = false
            idArr.splice(i, 1);
            priceArr.splice(i, 1);
            finalQtyArr.splice(i, 1);
            nameArr.splice(i, 1);
            break;//
        }
        i++;
    }
    if (count == 0 || come == true) { // 1br,2
        idArr[count] = id;
        priceArr[count] = price;
        finalQtyArr[count] = 1;
        nameArr[count] = name;
        itemList[0].innerHTML = "";
        count++;
    }
    come = true;
    itemList[0].innerHTML = "";

    var sno = 0;

    idArr.forEach((value, index) => {

        itemList[0].innerHTML += `<div class="selected_items_total">
                                        <p> ${sno + 1}. ${nameArr[index]}</p>
                                        <div class="price_tick">
                                            <p style="padding-right: 10px;">$${priceArr[index]}</p>
                                            <i style="font-size: 15px; margin-top: 5px;" class="fa-solid fa-circle-check"></i>
                                        </div>
                                    </div > `;
        sno++;
    });

    itemList[0].scrollTo({
        top: itemList[0].scrollHeight,
        behavior: "smooth"
    });

    if (display == 1) {
        // hide[0].style.display = "none";
        display = 0;
    }
    else {
        hide[0].style.display = "flex";
        display = 1;
    }

    if (sno == 0)
        hide[0].style.display = "none";
}


const popupHTML = document.getElementsByClassName("payment_fixed_container");



function close_payment() {
    const pay_pop = document.getElementById("payment-popup");
    pay_pop.classList.add("hidden");
}


function buyingItems(login) {

    console.log("Loign : " + login);

    const pay_pop = document.getElementById("payment-popup");
    pay_pop.classList.toggle("hidden");

    popupHTML[0].innerHTML = ` <div class="cancel-btn"><i class="fa-regular fa-circle-xmark cross" onclick="close_payment()"></i></div>`;
    var first_time_total = 0;

    idArr.forEach((value, index) => {

        popupHTML[0].innerHTML += `<div class="history-items hover payment-text-color">
                                        <div class="history-item-name">
                                            <h3>${nameArr[index]}</h3>
                                        </div>
                                        <div class="history-item-price payment-price">
                                            <p id="price${value}">${priceArr[index]}</p><p>×</p>
                                            <p id="qty${value}">1</p>&nbsp;=&nbsp;<p class="items_total"  id="total${value}">${priceArr[index]}</p>
                                        </div>
                                        <div class="history-item-status payment-quantity-btn">
                                            <button onclick="increaseDecrease(${value},0,${index})" class="left-btn">-</button>
                                            <p id="between_buttons${value}">1</p><button onclick="increaseDecrease(${value},1,${index})" class="right-btn">+</button>
                                        </div>
                                    </div>
                                    <p class="HR"></p>`;
        first_time_total = first_time_total + priceArr[index];
    });



    popupHTML[0].innerHTML += `<div class="history-items hover payment-text-color">
                                <div class="history-item-name">
                                    <h3>Total</h3>
                                </div>
                                <div class="history-item-price payment-price">
                                    <p id="sabka_total">${first_time_total} &nbsp;</p>
                                    <p>&nbsp;</p>
                                    <p>&nbsp;</p>
                                </div>
                                <div class="history-item-status payment-quantity-btn">
                                 </div>
                            </div>
                            <p class="HR"></p>`;

    finalAmount = first_time_total;

}


function increaseDecrease(val, symbol, index) {
    const price = document.getElementById("price" + val);
    const qty = document.getElementById("qty" + val);
    const total = document.getElementById("total" + val);
    const betBtn = document.getElementById("between_buttons" + val);

    var pri = parseInt(price.innerHTML);
    var qt = parseInt(qty.innerHTML);
    var tot = parseInt(total.innerHTML);

    console.log("Index in INDE : " + index);

    if (symbol == 0) // fro minus -
    {
        if (qt == 1)
            return;
        qt = qt - 1;
    }
    else {
        if (qt == 5)
            return;
        qt = qt + 1;
    }
    tot = pri * qt;

    finalQtyArr[index] = qt;

    betBtn.innerHTML = qt;

    qty.innerHTML = qt;
    total.innerHTML = tot;

    var t1 = 0;


    document.querySelectorAll(".items_total").forEach(t2 => {
        t1 = t1 + parseInt(t2.innerHTML);
        console.log("t2 : " + t2.innerHTML);
    });
    document.getElementById("sabka_total").innerHTML = t1;

    finalAmount = t1;

}


document.querySelectorAll(".item_order_btn").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active"); // change color
        btn.innerHTML = btn.innerHTML.trim() === "Order" ? `<i class="fa-regular fa-circle-check"></i>` : "Order";
        // console.log("lasflja");
    });
});



function close_order() {
    hide[0].style.display = "none";

    //     //To reset the order buttons when order is cancel
    document.querySelectorAll(".item_order_btn").forEach(btn => {
        btn.classList.remove("active"); // change color
        btn.innerHTML = "Order";
    });

    idArr = [];
    priceArr = [];
    nameArr = [];

    display = 0;

    // //     console.log("ID : "+idArr);

}


// Get current page file name
let currentPage = window.location.pathname.split("/").pop();

// Select all navbar links
let page = document.querySelectorAll(".links");

page.forEach(link => {
    let linkPage = link.getAttribute("href");

    // If link href matches current page -> add active class
    if (linkPage === currentPage) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }
});


// for registration password validations

function validate() {

    // console.log("I am here.");
    let password = document.getElementById("password").value;

    // Getting icons
    let cap = document.getElementById("cap");
    let special = document.getElementById("special");
    let number = document.getElementById("number");
    let length = document.getElementById("length");

    // Capital Letter Check
    if (/[A-Z]/.test(password)) {
        cap.classList.remove("fa-circle-xmark");
        cap.classList.add("fa-circle-check");
        cap.style.color = "green";
    } else {
        cap.classList.remove("fa-circle-check");
        cap.classList.add("fa-circle-xmark");
        cap.style.color = "red";
    }

    // Special Character Check
    if (/[!@#$%^&*()_+\-={}[\]|;:'",.<>/?]/.test(password)) {
        special.classList.remove("fa-circle-xmark");
        special.classList.add("fa-circle-check");
        special.style.color = "green";
    } else {
        special.classList.remove("fa-circle-check");
        special.classList.add("fa-circle-xmark");
        special.style.color = "red";
    }

    // Number Check
    if (/\d/.test(password)) {
        number.classList.remove("fa-circle-xmark");
        number.classList.add("fa-circle-check");
        number.style.color = "green";
    } else {
        number.classList.remove("fa-circle-check");
        number.classList.add("fa-circle-xmark");
        number.style.color = "red";
    }

    // Length Check
    if (password.length >= 8) {
        length.classList.remove("fa-circle-xmark");
        length.classList.add("fa-circle-check");
        length.style.color = "green";
    } else {
        length.classList.remove("fa-circle-check");
        length.classList.add("fa-circle-xmark");
        length.style.color = "red";
    }
}


// For show password

const eye = document.getElementById("eye");
const password_register = document.getElementById("password");


eye.addEventListener('click', function () {
    // eye.style.color = "red";

    if (password_register.type == 'password') {
        password_register.type = 'text';
        eye.classList.remove("fa-eye")
        eye.classList.add("fa-eye-slash");
    }
    else {
        password_register.type = 'password';
        eye.classList.remove("fa-eye-slash")
        eye.classList.add("fa-eye");
    }
});

function finalPaymentBtn() {

    var str = "length=" + idArr.length + "&id0=" + idArr[0] + "&qty0=" + finalQtyArr[0];


    let selected = document.querySelector('input[name="payment"]:checked');

    alert("Payment of ₹" + finalAmount + " is completed.\nOn "+selected.value);

    for (var i = 1; i < idArr.length; i++) {
        str += "&id" + i + "=" + idArr[i] + "&qty" + i + "=" + finalQtyArr[i];
    }

    console.log("order?" + str);
}




