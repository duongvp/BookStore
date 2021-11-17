$(document).ready(function() {
    function string(item) {
        return ` <div class="item-sell" id=${item.id}>
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
                  </div>`
    }
    //Sản phẩm bán chạy
    fetch("http://localhost:3000/listData")
        .then((response) => response.json())
        .then((data) => {
            var html = data.map((item) => {
                return ` <div class="list-hot-selling">
                            ${string(item)}
                       </div>`;
            });
            $(".hot-selling-row").html(html.join(""));
            $(".hot-selling-row").slick({
                infinite: false,
                slidesToShow: 5,
                slidesToScroll: 5,
                autoplay: true,
                autoplaySpeed: 2000,
                prevArrow: '<button class="slick-prev slick-arrow " aria-label="Previous " type="button " style=" "><i class="bi bi-chevron-left "></i></button>',
                nextArrow: '<button class="slick-next slick-arrow " aria-label="Next " type="button " style=" "><i class="bi bi-chevron-right "></i></button>',
                responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                            dots: true,
                        },
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        },
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    },
                ],
            });
            (() => {
                let val = [0, 1, 2, 3, 4];
                $(".list-hot-selling").each(function(index, item) {
                    if (index == val[0] || index == val[0] + 5) {
                        val[0] = index;
                        $(item).addClass("orange-top");
                    }
                    if (index == val[1] || index == val[1] + 5) {
                        val[1] = index;
                        $(item).addClass("green-top");
                    }
                    if (index == val[2] || index == val[2] + 5) {
                        val[2] = index;
                        $(item).addClass("blue-top");
                    }
                    if (index == val[3] || index == val[3] + 5) {
                        val[3] = index;
                        $(item).addClass("orange-top");
                    }
                    if (index == val[4] || index == val[4] + 5) {
                        val[4] = index;
                        $(item).addClass("green-top");
                    }
                });
            })();
        });

    //sản phẩm nổi bật
    fetch("http://localhost:3000/listData")
        .then((response) => response.json())
        .then((data) => {
            var html = data.map((item) => {
                return ` <div class="col-md-3 mb-3 h-auto col-sm-6">
                           ${string(item)}
                      </div>`;
            });
            $(".list-highlight-pro").html(html.join(""));
        });

    //Tìm kiếm
    $(".search-inp button").click(function() {
        data = $(".search-inp input").val();
        // $.ajax({
        //     type: "get",
        //     url: "http://localhost:3000/listData",
        //     data: {
        //         name: data
        //     },
        //     dataType: "json",
        //     success: function(response) {
        //         console.log(respon);
        //     }
        // });
        window.location.href = `http://localhost:3000/listData?id=${data}`;
        fetch(`http://localhost:3000/listData?id=${data}`)
            .then((response) => response.json())
            .then((data) => {
                var html = data.map((item) => {
                    return ` <div class="col-md-3 mb-3 h-auto col-sm-6">
                       ${string(item)}
                     </div>`;
                });
                $(".search-product").html(html.join(""));
            });
    })
});