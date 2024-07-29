// <!------editable refernce number in invoice modal-------->

$(document).ready(function () {
  $(".edit-btn").click(function () {
    var parentTd = $(this).closest("td");
    parentTd
      .find(".edit-ref")
      .attr("contenteditable", "true")
      .css("border", "1px solid lightgray")
      .focus();
    $(this).hide();
    parentTd.find(".save-btn").show();
  });

  $(".save-btn").click(function () {
    var parentTd = $(this).closest("td");
    parentTd
      .find(".edit-ref")
      .attr("contenteditable", "false")
      .css("border", "none");
    $(this).hide();
    parentTd.find(".edit-btn").show();
  });

  // Hide save buttons initially
  $(".save-btn").hide();
});

// <!-- hide old modal when new modal opened-->

$(function () {
  return $(".modal").on("show.bs.modal", function () {
    var curModal;
    curModal = this;
    $(".modal").each(function () {
      if (this !== curModal) {
        $(this).modal("hide");
      }
    });
  });
});

// <!-- show image in placeholder when selected-->

document.addEventListener("DOMContentLoaded", function () {
  const browseImg = document.querySelector(".browse-img");
  const fileInput = document.getElementById("fileInput");
  const dragHere = document.querySelector(".drag-here h6");
  const selectedImage = document.getElementById("selectedImage");
  const placeholderImage = document.querySelector(".placeholder");
  const placeholderImageAfter = document.querySelector(".br-after");
  const dropZone = document.getElementById("dropZone");

  browseImg.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", handleFiles);

  dropZone.addEventListener("dragover", function (event) {
    event.preventDefault();
    dropZone.classList.add("drag-over");
  });

  dropZone.addEventListener("dragleave", function () {
    dropZone.classList.remove("drag-over");
  });

  dropZone.addEventListener("drop", function (event) {
    event.preventDefault();
    dropZone.classList.remove("drag-over");
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFiles({ target: { files: files } });
    }
  });

  function handleFiles(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const fileName = file.name;
      dragHere.innerHTML = `Selected file: <br> ${fileName}`;

      const reader = new FileReader();
      reader.onload = function (e) {
        selectedImage.src = e.target.result;
        selectedImage.style.display = "block";
        placeholderImage.style.display = "none";
        placeholderImageAfter.style.display = "none";
      };
      reader.readAsDataURL(file);
    } else {
      dragHere.innerHTML = "Please select a valid image file.";
      selectedImage.style.display = "none";
      placeholderImage.style.display = "block";
      placeholderImageAfter.style.display = "block";
    }
  }
});

// <!-- active link in sidebar-->

$(document).ready(function () {
  $("#menu a").click(function (e) {
    e.preventDefault();
    $("#menu a").removeClass("active");
    $(this).closest("a").addClass("active");
  });
});

// <!-- -----------------------------------------------expand product list on click------------------------------------------------------>
$(document).ready(function () {
  $("#expandButton").click(function () {
    var $content = $(".my-content");

    if ($content.hasClass("col-lg-6")) {
      // Slide animation
      $content.animate(
        {
          width: "100%", // Expand to full width
        },
        500,
        function () {
          $content.removeClass("col-lg-6").addClass("col-lg-12");
          $("#expandButton").addClass("btn-small");
          $("#invoice-parent").addClass("hide-me");
          var cols = $(".col");
          cols.animate({ width: "20%" }, 300);
        }
      );
    } else {
      // Reverse animation
      $content.animate(
        {
          width: "50%", // Contract to half width
        },
        500,
        function () {
          $content.removeClass("col-lg-12").addClass("col-lg-6");
          $("#expandButton").removeClass("btn-small");
          $("#invoice-parent").removeClass("hide-me");
          var cols = $(".col");
          cols.animate({ width: "25%" }, 300);
        }
      );
    }
  });
});

// Example data for table
var data = [
  {
    id: 1,
    name: "Casual Texture of Relaxed Shirt",
    stock: "20 (items)",
    price: "20.00",
    discount: "12.00",
    tax: "2.00",
    quantity: 1,
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    stock: "15 (items)",
    price: "30.00",
    discount: "0.00",
    tax: "0.00",
    quantity: 1,
  },
  {
    id: 3,
    name: "Leather Jacket",
    stock: "5 (items)",
    price: "100.00",
    discount: "0.00",
    tax: "0.00",
    quantity: 1,
  },
  {
    id: 4,
    name: "Sports Shoes",
    stock: "25 (items)",
    price: "60.00",
    discount: "0.00",
    tax: "0.00",
    quantity: 1,
  },
  {
    id: 5,
    name: "Woolen Scarf",
    stock: "30 (items)",
    price: "15.00",
    discount: "0.00",
    tax: "0.00",
    quantity: 1,
  },
  {
    id: 6,
    name: "Formal Shirt",
    stock: "10 (items)",
    price: "25.00",
    discount: "0.00",
    tax: "0.00",
    quantity: 1,
  },
  {
    id: 7,
    name: "Summer Hat",
    stock: "40 (items)",
    price: "12.00",
    discount: "0.00",
    tax: "0.00",
    quantity: 1,
  },
  {
    id: 8,
    name: "Denim Shorts",
    stock: "22 (items)",
    price: "18.00",
    discount: "0.00",
    tax: "0.00",
    quantity: 1,
  },
];

// ----- -------------------------------------------------modal total----------------------------------------------------------------
function calculateTotals() {
  let totalItems = 0;
  let totalTax = 0;
  let subtotal = 0;
  const shippingFees = 30.0; // Assuming a fixed shipping fee

  data.forEach((item) => {
    totalItems += item.quantity;
    totalTax += parseFloat(item.tax) * item.quantity;
    subtotal += parseFloat(item.price) * item.quantity;
  });

  // Calculate the final total
  const finalTotal = subtotal + totalTax + shippingFees;

  // Update the final-total div
  document.querySelector(
    ".final-total"
  ).nextElementSibling.textContent = `${finalTotal.toFixed(2)} SAR`;
}

document.addEventListener("DOMContentLoaded", calculateTotals);

// ----------------------------------------------------- product from dummy data generation --------------------------------------------

function generateProducts(data) {
  // Get the container where the products will be appended
  const container = document.getElementById("product-container");
  if (!container) {
    console.error("Container element not found");
    return;
  }
  container.innerHTML = "";

  data.forEach((item) => {
    const col = document.createElement("div");
    col.classList.add("col");
    col.classList.add("product-item");
    col.innerHTML = `
                    <div class="listing-wrp">
                        <div class="img-wrp bg-white flex-center">
                            <div class="inner-wrp">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                        </div>
                        <p id="item-name" class=" item-name bold mt-5 mb-1">${item.name}</p>
                        <p class=" bold"><span class="mr-2"><s>${item.oldPrice} SAR</s></span> <span class="p-price item-price" id="item-price">${item.newPrice} SAR</span></p>
                    </div>
                `;
    container.appendChild(col);
  });
}

var products = [
  {
    name: "Essential Regular Fit Shirt 1",
    image: "assets/img/p1.png",
    oldPrice: "50.00",
    newPrice: "35.00",
  },
  {
    name: "Slim Fit Jeans 2",
    image: "assets/img/p2.png",
    oldPrice: "60.00",
    newPrice: "45.00",
  },
  {
    name: "Casual Trousers 3",
    image: "assets/img/p3.png",
    oldPrice: "70.00",
    newPrice: "55.00",
  },
  {
    name: "Formal Suit 4",
    image: "assets/img/p2.png",
    oldPrice: "200.00",
    newPrice: "150.00",
  },
  {
    name: "Leather Jacket 5",
    image: "assets/img/p3.png",
    oldPrice: "300.00",
    newPrice: "250.00",
  },
  {
    name: "Sports Shoes 6",
    image: "assets/img/p2.png",
    oldPrice: "120.00",
    newPrice: "100.00",
  },
  {
    name: "Running Shoes 7",
    image: "assets/img/p1.png",
    oldPrice: "130.00",
    newPrice: "110.00",
  },
  {
    name: "Casual Sneakers 8",
    image: "assets/img/p3.png",
    oldPrice: "140.00",
    newPrice: "115.00",
  },
  {
    name: "Baseball Cap 9",
    image: "assets/img/p2.png",
    oldPrice: "20.00",
    newPrice: "15.00",
  },
  {
    name: "Sunglasses 10",
    image: "assets/img/p1.png",
    oldPrice: "80.00",
    newPrice: "60.00",
  },
  {
    name: "Wrist Watch 11",
    image: "assets/img/p3.png",
    oldPrice: "150.00",
    newPrice: "120.00",
  },
  {
    name: "Leather Belt 12",
    image: "assets/img/p2.png",
    oldPrice: "40.00",
    newPrice: "30.00",
  },
  {
    name: "Backpack 13",
    image: "assets/img/p1.png",
    oldPrice: "100.00",
    newPrice: "80.00",
  },
  {
    name: "Laptop Bag 14",
    image: "assets/img/p2.png",
    oldPrice: "200.00",
    newPrice: "170.00",
  },
  {
    name: "Travel Bag 15",
    image: "assets/img/p3.png",
    oldPrice: "250.00",
    newPrice: "220.00",
  },
  {
    name: "Woolen Scarf 16",
    image: "assets/img/p1.png",
    oldPrice: "30.00",
    newPrice: "25.00",
  },
  {
    name: "Winter Gloves 17",
    image: "assets/img/p3.png",
    oldPrice: "50.00",
    newPrice: "40.00",
  },
  {
    name: "Beanie Hat 18",
    image: "assets/img/p2.png",
    oldPrice: "25.00",
    newPrice: "20.00",
  },
  {
    name: "Formal Shoes 19",
    image: "assets/img/p1.png",
    oldPrice: "180.00",
    newPrice: "150.00",
  },
  {
    name: "Casual Shoes 20",
    image: "assets/img/p2.png",
    oldPrice: "90.00",
    newPrice: "70.00",
  },
];
// ----------------------------------------------------- product from add product generation --------------------------------------------
document.getElementById("add-button").addEventListener("click", function () {
  const productName = document.getElementById("p-name").value;
  const price = document.getElementById("price").value;
  const salesPrice = document.getElementById("sales-price").value;
  const placeholderImg = document.getElementById("selectedImage");
  const newProductImage = placeholderImg.src;
  const newProduct = {
    name: productName,
    image: newProductImage, // or provide a way to upload an image
    oldPrice: price,
    newPrice: salesPrice,
  };

  products.push(newProduct);
  generateProducts(products);
  toast("snackbar")
});
generateProducts(products);

// -------------------------------------------------- table rows generation----------------------------------------------------
function generateRows(data) {
  const tableBody = document.querySelector("#myTable");

  // Clear existing rows (except the header)
  tableBody.innerHTML = `
                <tr>
                    <th>Product Name</th>
                    <th>Stock</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Tax</th>
                    <th>Subtotal</th>
                    <th></th>
                </tr>
            `;

  // Generate rows
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.stock}</td>
                    <td>
                        <div class="btn-wrp">
                            <button class="btn bg-white border-pr-r decrement-btn" data-id="${
                              item.id
                            }">-</button>
                            <span class="value count">${item.quantity}</span>
                            <button class="btn bg-white border-pr-l increment-btn" data-id="${
                              item.id
                            }">+</button>
                        </div>
                    </td>
                    <td><span class="price">${item.price}</span>SAR</td>
                    <td class="discount">${item.discount}</td>
                    <td class="tax">${item.tax}</td>
                    <td class="subtotal">${(item.price * item.quantity).toFixed(
                      2
                    )}</td>
                    <td><button type="button" class="btn bg-red" data-id="${
                      item.id
                    }"><img class="delete-btn" src="assets/img/icon-delete.png"></button></td>
                `;
    tableBody.appendChild(row);
  });

  // Attach event listeners to newly created rows
  attachEventListeners();

  // Calculate total subtotal after initial setup
  updateTotalSubtotal();
}

// -------------------------------------------------------updation of price-------------------------------------------------
function updatePrice(row) {
  const priceValue = parseFloat(row?.querySelector(".price").textContent);
  const countSpan = row.querySelector(".count");
  const count = parseInt(countSpan.textContent, 10);
  const totalPrice = (priceValue * count).toFixed(2);
  row.querySelector(".subtotal").textContent = totalPrice;
  updateTotalSubtotal();
}
// ----------------------------------------------------------button event listeners ------------------------------------------
function attachEventListeners() {
  document
    .querySelectorAll(".increment-btn, .decrement-btn")
    .forEach((button) => {
      button.addEventListener("click", (e) => {
        const button = e.target;
        const row = button.closest("tr");
        const countSpan = row.querySelector(".count");
        let count = parseInt(countSpan.textContent, 10);

        if (button.classList.contains("increment-btn")) {
          count++;
        } else if (button.classList.contains("decrement-btn") && count > 1) {
          count--;
        }
        countSpan.textContent = count.toString();
        updatePrice(row);
        updateTotalCount();
        updateTotalTax();
      });
    });
}
// -----------------------------------------------------product add to cart---------------------------------------------
function addProductToCart(productElement) {
    const productName = productElement.querySelector('.item-name').textContent;
    const productPrice = productElement.querySelector('.item-price').textContent;

    // Find existing product in data
    const existingProduct = data.find(product => product.name === productName);

    if (existingProduct) {
        // If product exists, increase quantity
        existingProduct.quantity++;
    } else {
        // If product does not exist, add new product
        const newProduct = {
            name: productName,
            id: Math.floor(10 + Math.random() * 90),
            stock: "15 (items)",
            price: parseFloat(productPrice.replace("SAR", "").trim()).toFixed(2),
            discount: "0.00",
            tax: "0.00",
            quantity: 1,
        };
        data.push(newProduct);
    }

    generateRows(data);
    updateTotalSubtotal();
    updateTotalCount();
    toast("cart-snack");
}


document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    if (productContainer) {
        productContainer.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product-item');
            if (productElement) {
                addProductToCart(productElement);
            }
        });
    }
});

// <!-- --- ---------------------------------------------------- updating card on load------------------------------------------ -->
document.addEventListener("DOMContentLoaded", () => generateRows(data));
// ------------------------------------------------------------ subtotal inside row ------------------------------------------------
function updateTotalCount() {
  let totalCount = 0;
  document.querySelectorAll("#myTable .count").forEach((countSpan) => {
    totalCount += parseInt(countSpan.textContent, 10);
  });
  document.querySelector(".total-items").textContent = totalCount;
  document.querySelector("#total-items").textContent = totalCount;
}
// --------------------------------------------------------------- total tax in rows ----------------------------------------------
function updateTotalTax() {
  let totalTax = 0;
  document.querySelectorAll("#myTable .tax").forEach((countSpan) => {
    totalTax += parseInt(countSpan.textContent, 10);
  });
  document.querySelector(".total-tax").textContent = totalTax + " " + "SAR";
}

document.addEventListener("DOMContentLoaded", updateTotalTax);
document.addEventListener("DOMContentLoaded", updateTotalCount);
document.addEventListener("DOMContentLoaded", updateTotalSubtotal);
// -------------------------------------------------------------------- update final total ------------------------------------
function updateTotalSubtotal() {
  const shipping = document.querySelector(".shipping-fee").textContent;
  const tax = document.querySelector(".total-tax").textContent;
  let total = 0;
  document.querySelectorAll(".subtotal").forEach((subtotalElement) => {
    total += parseFloat(subtotalElement.textContent);
  });
  const finalTotal = parseFloat(shipping) + parseFloat(tax) + parseInt(total);
  document.querySelector("#totalSubtotal").textContent = total.toFixed(2);
  document.querySelector(".payment-subtotal").textContent = total.toFixed(2);
  document.querySelector(
    ".final-total"
  ).nextElementSibling.textContent = `${finalTotal.toFixed(2)} SAR`;
}

// <!-- show-hide sidebar in mobile view-->

document.getElementById("openBtn").onclick = function () {
  openNav();
};

document.getElementById("closeBtn").onclick = function () {
  closeNav();
};

function openNav() {
  document.getElementById("menu").style.width = "200px";
  var element = document.getElementById("main-wrapper");
  element.classList.add("main-wrapper-sm");
}

function closeNav() {
  document.getElementById("menu").style.width = "0";
  var element = document.getElementById("main-wrapper");
  element.classList.remove("main-wrapper-sm");
}

// delete all rows of table

document.getElementById("clear-btn").addEventListener("click", function () {
  // Show the modal
  $("#restore").modal("show");
});

document
  .getElementById("confirmDeleteBtn")
  .addEventListener("click", function () {
    // Delete all rows from the table
    const table = document.getElementById("myTable");
    while (table.rows.length > 0) {
      table.deleteRow(0);
    }
    // Show the "No items to show" message
    document.getElementById("noItemsMessage").style.display = "flex";
    document.getElementById("totalSubtotal").innerHTML = 0;
  });

// <!-- delete table row (cart item) on click-->
document.addEventListener("DOMContentLoaded", function () {
  let rowToDelete;

  // Event delegation for delete buttons
  document
    .querySelector("#myTable")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("delete-btn")) {
        rowToDelete = event.target.closest("tr");
        $("#delete-row").modal("show"); // Show the modal
      }
    });

  // Confirm delete button
  document
    .querySelector("#confirm-delete")
    .addEventListener("click", function () {
      if (rowToDelete) {
        rowToDelete.classList.add("slide-up");
        setTimeout(function () {
          rowToDelete.remove();
          updateTotalSubtotal();
        }, 500);
      }
      $("#delete-row").modal("hide");
      updateTotalSubtotal();
      calculateTotals();
    });
});

// open modal after printing
$(document).ready(function () {
  $("#print").on("shown.bs.modal", function () {
    setTimeout(function () {
      $("#invoice-modal").modal("show");
    }, 5000);
  });
});

function toast(className){
    var x = document.getElementById(className);
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
}