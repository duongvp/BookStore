//slide banner
$(".banner").slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 1000,
    prevArrow: '<button class="slick-prev slick-arrow " aria-label="Previous " type="button " style=" "><i class="bi bi-chevron-left "></i></button>',
    nextArrow: '<button class="slick-next slick-arrow " aria-label="Next " type="button " style=" "><i class="bi bi-chevron-right "></i></button>',
});



function hideClass(name, show, hide) {
    $(name).removeClass(show);
    $(name).addClass(hide);
}

function showClass(name, show, hide) {
    $(name).addClass(show);
    $(name).removeClass(hide);
}

function backToTop() {
    $(window).scroll(function() {
        var e = $(this).scrollTop();
        if (e > 300) {
            showClass(".btn-up", "btn-up-visible", "btn-up-hidden");
        } else {
            hideClass(".btn-up", "btn-up-visible", "btn-up-hidden");
        }
    });
    $(".btn-up").click(function() {
        $("html,body").animate({
                scrollTop: 0,
            },
            0
        );
    });
}
backToTop();

function qucikView() {
    $(".close-quick-view").on("click", function() {
        hide();
        $(".number-value").children("input").val(1);
    });
    $(".overlay").on("click", function() {
        hide();
        $(".number-value").children("input").val(1);
    });

    function hide() {
        hideClass(".overlay", "show-overlay", "close-overlay");
        hideClass(".quick-view-pro", "show-qview", "hide-qview ");
        hideClass(".ban-quick-view", "show-ban-qview", "hide-ban-qview");
    }
}
//hien thi xem nhanh
function viewModel(id) {
    (imSrc = $("#pro-image-" + id).attr("src")),
    (pName = $("#pro-name-" + id).text()),
    (sPrice = $("#salprice-pro-" + id).text()),
    (iPrice = $("#initial-price-" + id).text());
    $(".quick-view-pro").attr("data", id);
    $(".quick-view-img").children("img").attr("src", imSrc);
    $(".title-pro").children("h5").text(pName);
    $(".quick-sold-price .sprice").text(sPrice);
    $(".quick-initial-price .iprice").text(iPrice);
    $('#link-detail-pro').attr("href", "1");
    showClass(".overlay", "show-overlay", "close-overlay");
    showClass(".quick-view-pro", "show-qview", "hide-qview ");
    showClass(".ban-quick-view", "show-ban-qview", "hide-ban-qview");
}

//show nav3 and hidden nav3 in tablet and mobile
(() => {
    $(".btn-nav-mobile").on("click", function() {
        showClass(".list-menu-res", "show-lst-menu ", "hiden-lst-menu");
        // showClass('.content-main', 'move-contain', 'back-contain ');
        showClass(".black-bag", "show-back-bag", "hiden-bach-bag");
    });
    $(".black-bag").on("click", function() {
        hideClass(".list-menu-res", "show-lst-menu ", "hiden-lst-menu");
        // hideClass('.content-main', 'move-contain', 'back-contain ');
        hideClass(".black-bag", "show-back-bag", "hiden-bach-bag");
    });
})();
qucikView();
$(document).ready(function() {
    $(".list-unstyled").hide();
    $(".btn-show-category").on("click", function() {
        $(".list-unstyled").slideToggle();
    });
    $(".has-children").on("click", function() {
        $(".menu-child-1").css("left", "0");
        $(".list-menu-res ").children(".nav-ul").css("visibility", "hidden");
    });
    $(".btn-come-back , .btn-turn-pro ,.black-bag").on("click", function() {
        $(".menu-child-1").css("left", "-300px");
        $(".list-menu-res ").children(".nav-ul").css("visibility", "visible");
    });
    let arr = [$(".saled-price"), $(".initial-pro-price")];
    arr.map((item) => {
        val = Number(item.children("span").text()).toLocaleString("en-US");
        item.children("span").text(val);
    });
});
//increase
function amount() {
    let id = 0;
    $("#btn-decrease").click(function(e) {
        id = $(".number-guest-book").children("input").val();
        e.preventDefault();
        id == 1 ?
            $(".number-guest-book").children("input").val(1) :
            $(".number-guest-book")
            .children("input")
            .val(id - 1);
    });
    $("#btn-increase").click(function(e) {
        e.preventDefault();
        id = $(".number-guest-book").children("input").val();
        $(".number-guest-book")
            .children("input")
            .val(Number(id) + 1);
    });
}
amount();

//đặt hàng
var cart = JSON.parse(localStorage.getItem("items")) !== null ? JSON.parse(localStorage.getItem("items")) : [];
var arr = [];
var check = true;
var count = 0;
var position = 0;
var obj = new Object();
var proName, price, number, total, id, proImage;
//hien thi so luong san pham co trong gio hang
function showaMount() {
    let cartMount = 0;
    if (cart !== []) {
        cart.forEach((element) => {
            cartMount += Number(element.number);
        });
    } else cartMount = 0;
    $(".ajax-cart-quantity").text(cartMount);
}
showaMount();
//them vao gio hang
function setCart(id) {
    proImage = $("#pro-image-" + id).attr("src");
    proName = $("#pro-name-" + id).text();
    number = Number(
        $("#number-book-" + id)
        .children("input")
        .val()
    );
    isNaN(number) ? (number = 1) : number;
    price = $("#salprice-pro-" + id).text();
    total = (Number(price.replace(",", "")) * number).toLocaleString("en-US");
    obj = { proImage, proName, price, number, total, id };
    console.log(cart);
    if (cart == []) {
        cart.push(obj);
    } else {
        cart.map((item, index) => {
            if (item.id == id) {
                count = 1;
                position = index;
            }
        });
        if (count == 1) {
            cart[position].number = Number(cart[position].number) + Number(number);
            cart[position].total = (
                Number(cart[position].price.replaceAll(",", "")) * cart[position].number
            ).toLocaleString("en-US");
        } else cart.push(obj);
    }
    count = 0;
    localStorage.setItem("items", JSON.stringify(cart));
    swal(proName, "Đã được thêm thành công vào giỏ hàng", "success");
    showaMount();
}
//them gio hang khi xem nhanh
function addCartView() {
    id = $(".quick-view-pro").attr("data");
    proImage = $(".quick-view-img").children("img").attr("src");
    proName = $(".title-pro").children("h5").text();
    number = Number($(".number-value").children("input").val());
    isNaN(number) ? (number = 1) : number;
    price = $(".quick-sold-price .sprice").text();
    total = (Number(price.replace(",", "")) * number).toLocaleString("en-US");
    obj = { proImage, proName, price, number, total, id };
    if (cart == []) {
        cart.push(obj);
    } else {
        cart.map((item, index) => {
            if (item.id == id) {
                count = 1;
                position = index;
            }
        });
        if (count == 1) {
            cart[position].number = Number(cart[position].number) + Number(number);
            cart[position].total = (
                Number(cart[position].price.replaceAll(",", "")) * cart[position].number
            ).toLocaleString("en-US");
        } else cart.push(obj);
    }
    count = 0;
    localStorage.setItem("items", JSON.stringify(cart));
    swal(proName, "Đã được thêm thành công vào giỏ hàng", "success");
    showaMount();
}