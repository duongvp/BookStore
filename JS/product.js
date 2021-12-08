$(document).ready(function() {
    var str = "http://localhost:8811/BookStore/all/4"
    var pos = str.indexOf('all/');
    val = str.slice(pos + 4);
    console.log(val)
    var slide = 0;
    $(".sidebars").find(".sm-nowrap-parent").hide();
    $(".sidebars .sm-nowrap").hide();
    $(".sidebars #target").click(function() {
        slide == 0 ? (slide = 1) : (slide = 0);
        $(this).toggleClass("fa-caret-right");
        $(this).toggleClass("fa-sort-down");
        if (slide == 1) {
            $(".sidebars").find(".sm-nowrap-parent").slideDown();
            $(".sidebars").find(".sm-nowrap-parent").show();
        } else {
            $(".sidebars").find(".sm-nowrap-parent").slideUp();
        }
        return false;
    });
    $(".list-menu .fas").click(function() {
        id = $(this).attr("id");
        console.log(id);
        $("#" + id).toggleClass("fa-caret-right");
        $("#" + id).toggleClass("fa-sort-down");
        $(".list-menu")
            .find(".wrap-" + id)
            .toggle(500);
        return false;
    });

    //phân trang //Dach sach san pham
    var url = "http://localhost:3000/listData";
    var id = "sp08"
    $(".cate-left a").click(function() {
        id = $(this).attr('id');
        key = $(this).attr('key');
        txt = $(this).text();
        if (key == "P1")
            txt = "Tất cả sản phẩm";
        $(".intruct-pro  h5").text(txt);
        page(url, id);
    })
    val = $(".form-select").find(':selected').val();
    console.log(val);
    $('.lds-ring').hide();

    function page(url, id) {
        $.ajax({
            type: "get",
            url: url,
            data: {
                id: id
            },
            dataType: "json",
            success: function(data) {
                exam(data);
            },
        });
    }
    page(url, id);
    //sắp xếp 
    $(".sorted-by select").change(function() {
        opId = $(this).children("option:selected").val();
        $.ajax({
            type: "get",
            url: url,
            data: {
                id: id,
                opId: opId
            },
            dataType: "json",
            success: function(response) {
                exam(response);
            }
        });

    })

    function exam(data) {
        function template(data) {
            var html = data.map((item) => {
                return `<div class="col-lg-3 col-sm-4 col-md-4 col-xs-6 mb-3 h-auto pro-col">
                            <div class="item-sell" id=${item.id}>
                                    <p class="d-flex justify-content-center "><span class="discount ">-${item.sale}%</span></p>
                                    <div class="btn-custom-action d-flex justify-content-between ">
                                        <button class="btn-quick-view" onclick="viewModel('${item.id}')"><i class="far fa-chart-bar "></i><span>Xem nhanh</span></button>
                                        <button class="btn-cart d-flex" onclick="setCart('${item.id}')"><span>+ Thêm vào giỏ</span><i class="bi bi-cart3 ps-1 "></i></button>
                                    </div>
                                    <div class="img-hot-book ">
                                    <a href="http://localhost:3000/listData/${item.id}">
                                            <img id="pro-image-${item.id}" src=${item.src} alt="">
                                        </a>
                                    </div>
                                    <div class="pro-infor ">
                                        <a href="http://localhost:3000/listData/${item.id}" title="${item.name}" class="pro-name ">
                                            <p id="pro-name-${item.id}">${item.name}</p>
                                        </a>
                                        <p class="price d-flex justify-content-center ">
                                            <span class="sold-price"><span id="salprice-pro-${item.id}">${item.bPrice}</span><ins>đ</ins></span>
                                            <del class="initial-price"><span id="initial-price-${item.id}">${item.aPrice}</span><span>đ</span></del>
                                        </p>
                                    </div>
                            </div>
                    </div>`;
            });
            return html;
        }
        $("#pagination").pagination({
            dataSource: data,
            pageSize: 6,
            autoHidePrevious: true,
            autoHideNext: true,
            callback: function(data, pagination) {
                // template method of yourself
                var html = template(data);
                $("#pro-auth").html(html.join(""));
            },
        });
    }
    // let arr = [];
    // $(".list-menu").each((index, value) => {
    //     a = $(value).find("i.fas").attr("id");
    //     (a == undefined) ? a: arr.push(a);
    // })
    // arr.forEach(item => {
    //     $("#" + item).hide();
    // })
});