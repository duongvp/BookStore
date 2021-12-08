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
                      <div class="pro-infor text-center">
                          <a href="http://localhost:3000/listData/${item.id}" title="${item.name}" class="pro-name ">
                              <p id="pro-name-${item.id}">${item.name}</p>
                          </a>
                          <p class="price d-flex justify-content-center">
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
        })
        .catch(error => console.log(error));

    //sản phẩm nổi bật
    fetch("http://localhost:3000/listData")
        .then((response) => response.json())
        .then((data) => {
            var html = data.map((item) => {
                return ` <div class="col-md-3 mb-3 h-auto col-sm-6">
                           ${string(item)}
                      </div>`;
            });
            $(".banner-right-feature  .list-highlight-pro").html(html.join(""));
        });

    //Tìm kiếm
    $(".search-inp button").click(function() {
        data = $(".search-inp input").val();
        $.ajax({
            type: "get",
            url: "http://localhost:3000/listData",
            data: {
                name: data
            },
            dataType: "json",
            success: function(response) {
                console.log(response);
            }
        });
        // window.location.href = `/search.html?str=${data}`;
    })
    fetch('http://localhost:3000/listData')
        .then((response) => response.json())
        .then((data) => {
            var template = (data) => {
                var str = data.map((item) => {
                    return ` <div class="col-md-3 mb-3 h-auto col-sm-6">
                           ${string(item)}
                         </div>`;
                });
                return str;
            }
            $("#pagination").pagination({
                dataSource: data,
                pageSize: 6,
                autoHidePrevious: true,
                autoHideNext: true,
                callback: function(data, pagination) {
                    // template method of yourself
                    var html = template(data)
                    $(".search-product").html(html.join(""));
                },
            });
        })
        .catch(err => console.log(err));


    //sản phẩm mới nhất trang chi tiết
    fetch("http://localhost:3000/listData")
        .then((response) => response.json())
        .then((data) => {
            var acount = 1,
                html = '',
                x = 0;
            (data.length % 3 == 0) ? acount = Math.floor(data.length / 3): acount = Math.floor(data.length / 3) + 1;
            for (var i = 0; i < acount; i++) {
                (i == 0) ? x = 0: x = x + 3;
                html += `<div class="info-new-pro">
                        ${NewDetail(data,x)}
                      </div>`
            }
            $('.view-ld-pro .ls-new-pro').html(html);
            $('.view-ld-pro .ls-new-pro').slick({
                prevArrow: '<button class="slick-prev slick-arrow " aria-label="Previous " type="button " style=" "><i class="bi bi-chevron-left "></i></button>',
                nextArrow: '<button class="slick-next slick-arrow " aria-label="Next " type="button " style=" "><i class="bi bi-chevron-right "></i></button>',
            });
        });

    function NewDetail(data, i) {
        var str = ''
        for (var j = i; j < i + 3; j++) {
            str += `<!-- các spham trong sản phẩm mới -->
             <div class="item-new-pro d-flex">
                <a href="http://localhost:3000/listData/${data[j].id}">
                    <img src=${data[j].src} alt="">
                </a>
                <div class="view-new-pro">
                    <a href="http://localhost:3000/listData/${data[j].id}">${data[j].name}</a>
                    <div>
                        <span>${data[j].bPrice}<ins>đ</ins></span>
                        <del>${data[j].aPrice}<ins>đ</ins></del>
                    </div>
                </div>
            </div>`
        }
        return str;
    }

    //sản phẩm khác ở trang chi tiết 
    fetch("http://localhost:3000/listData")
        .then((response) => response.json())
        .then((data) => {
            var html = data.map((item) => {
                return `<div class="col-md-3 mb-3 h-auto col-sm-6">
                       ${string(item)}
                  </div>`;
            });
            $(".lst-another-pros").find(".list-highlight-pro").html(html.join(""));
        });


    // danh sách blogs trên trang blogs
    fetch("http://localhost:3000/blog")
        .then((response) => response.json())
        .then((data) => {
            var html = data.map((item) => {
                return `<div class="item-blog d-md-flex">
                            <a href="http://localhost:3000/blog/${item.id}" class="d-sm-block">
                                <img class="image-item-blog" src=${item.url} alt="">
                            </a>
                            <div class="info-blog ps-md-4 ps-0">
                                <a href="http://localhost:3000/blog/${item.id}">
                                    <h5>${item.head}</h5>
                                </a>
                                <p class="date-poster">
                                    <span>Người đăng:${item.poster}</span>
                                    <span>${item.createDate}</span>
                                    <span>Tin tức</span>
                                </p>
                                <p class="content-item-blog">
                                    ${item.decription}
                                </p>
                                <a href="http://localhost:3000/blog/${item.id}" class="see-blog"><span>Xem thêm</span><i class="fas fa-arrow-right ps-1"></i></a>
                            </div>
                        </div>`;
            });
            $(".list-blogs").html(html)
        })
        .catch(err => console.log(err));
    //bài viết mới nhất ở trang blogs
    fetch("http://localhost:3000/blog")
        .then((response) => response.json())
        .then((data) => {
            var acount = 1,
                html = '',
                x = 0;
            (data.length % 3 == 0) ? acount = Math.floor(data.length / 3): acount = Math.floor(data.length / 3) + 1;
            for (var i = 0; i < acount; i++) {
                (i == 0) ? x = 0: x = x + 3;
                html += `<div class="info-new-pro">
                    ${DetailBlog(data,x,data.length)}
                  </div>`
            }
            $('.blogs-war .ls-new-pro').html(html);
            $('.blogs-war .ls-new-pro').slick({
                prevArrow: '<button class="slick-prev slick-arrow " aria-label="Previous " type="button " style=" "><i class="bi bi-chevron-left "></i></button>',
                nextArrow: '<button class="slick-next slick-arrow " aria-label="Next " type="button " style=" "><i class="bi bi-chevron-right "></i></button>',
            });
        })
        .catch(err => console.log(err));

    function DetailBlog(data, i, acount) {
        var str = ''
        for (var j = i; j < i + 3; j++) {
            if (j >= acount) {
                break;
            } else {
                str += `<!-- các spham trong sản phẩm mới -->
                <div class="item-new-pro d-flex">
                   <a href="http://localhost:3000/blog/${data[j].id}">
                       <img src=${data[j].url} alt="">
                   </a>
                   <div class="view-new-pro ps-2">
                       <a href="http://localhost:3000/blog/${data[j].id}">${data[j].head}</a>
                       <div class="create-date">
                          <i class="far fa-clock"></i>
                          <span>${data[j].createDate}</span>
                       </div>
                   </div>
               </div>`
            }
        }
        return str;
    }
});