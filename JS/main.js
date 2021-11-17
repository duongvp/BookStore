var data = JSON.parse(localStorage.getItem("items"));
var index;
var pm =
  JSON.parse(localStorage.getItem("paymon")) == 0
    ? 0
    : JSON.parse(localStorage.getItem("paymon"));
var data1 = data;
payMoney();
var html = data.map((item) => {
  return `<tr>
            <th scope="row">
                <img src="${item.proImage}" alt="">
            </th>
            <td>
                <span>${item.proName}</span>
            </td>
            <td>
                <input type="number" value="${item.number}">
            </td>
            <td>
                <span>${item.total}<ins>đ</ins></span>
            </td>
            <td>
                <button class="items-center"  onclick="removeItem('${item.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>`;
});
var html1 = ` <tr>
                <th scope="row">
                </th>
                <td>
                </td>
                <td>
                    <span>Tổng cộng:</span>
                </td>
                <td>
                    <span class="total-pay">${pm}</span><ins>đ</ins>
                </td>
                <td>
                </td>
          </tr>`;
$(".tbody-pro-cart").append(html + html1);
//chon xoa tung phan tu trong gio hang
function removeItem(val) {
  let s = 0;
  index = data.map((item) => item.id).indexOf(val);
  data.splice(index, 1);
  t = 0;
  pm = 0;
  payMoney();
  $(".total-pay").text(pm);
  setLocal();
  checkCart();
  if (data != []) {
    data.forEach((element) => {
      s += Number(element.number);
    });
  } else s = 0;
  $(".ajax-cart-quantity").text(s);
}
$("#tbUser").on("click", ".items-center", function () {
  $(this).closest("tr").remove();
});
//luu lai thong tin len localstore
function setLocal() {
  localStorage.setItem("items", JSON.stringify(data));
  localStorage.setItem("paymon", JSON.stringify(pm));
}

//tinh tong tien
function payMoney() {
  var t = 0;
  for (i = 0; i < data.length; i++) {
    t += Number(data[i].total.replaceAll(",", ""));
  }
  pm = t.toLocaleString("en-US");
  return pm;
}
localStorage.setItem("paymon", JSON.stringify(pm));

//cap nhat gia tri cho gio hang
function updateCart() {
  $("input[type=number]").each(function (index, value) {
    var item = data[index];
    item.number = $(value).val();
    item.total = (
      item.number * Number(item.price.replaceAll(",", ""))
    ).toLocaleString("en-US");
  });
  payMoney();
  setLocal();
  window.location.reload();
}

function checkCart() {
  if (pm == 0) {
    showClass(".header-page", "show-table", "hide-table");
    hideClass(".cd-page-ble", "act-display", "hide-table");
    hideClass(".tb-page-ble", "sp-display", "hide-table");
  } else {
    hideClass(".header-page", "show-table", "hide-table");
    showClass(".cd-page-ble", "act-display", "hide-table");
    showClass(".tb-page-ble", "sp-display", "hide-table");
  }
}
checkCart();
function hideClass(name, show, hide) {
  $(name).removeClass(show);
  $(name).addClass(hide);
}

function showClass(name, show, hide) {
  $(name).addClass(show);
  $(name).removeClass(hide);
}
