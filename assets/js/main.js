// <!------editable refernce number in invoice modal-------->


$(document).ready(function(){
    $('.edit-btn').click(function(){
        var parentTd = $(this).closest('td');
        parentTd.find('.edit-ref').attr('contenteditable', 'true').css('border', '1px solid lightgray').focus();
        $(this).hide();
        parentTd.find('.save-btn').show();
    });

    $('.save-btn').click(function(){
        var parentTd = $(this).closest('td');
        parentTd.find('.edit-ref').attr('contenteditable', 'false').css('border', 'none');
        $(this).hide();
        parentTd.find('.edit-btn').show();
    });

    // Hide save buttons initially
    $('.save-btn').hide();
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
   
        document.addEventListener('DOMContentLoaded', function () {
            const browseImg = document.querySelector('.browse-img');
            const fileInput = document.getElementById('fileInput');
            const dragHere = document.querySelector('.drag-here h6');
            const selectedImage = document.getElementById('selectedImage');
            const placeholderImage = document.querySelector('.placeholder');
            const placeholderImageAfter = document.querySelector('.br-after');
            const dropZone = document.getElementById('dropZone');

            browseImg.addEventListener('click', function () {
                fileInput.click();
            });

            fileInput.addEventListener('change', handleFiles);

            dropZone.addEventListener('dragover', function (event) {
                event.preventDefault();
                dropZone.classList.add('drag-over');
            });

            dropZone.addEventListener('dragleave', function () {
                dropZone.classList.remove('drag-over');
            });

            dropZone.addEventListener('drop', function (event) {
                event.preventDefault();
                dropZone.classList.remove('drag-over');
                const files = event.dataTransfer.files;
                if (files.length > 0) {
                    handleFiles({ target: { files: files } });
                }
            });

            function handleFiles(event) {
                const file = event.target.files[0];
                if (file && file.type.startsWith('image/')) {
                    const fileName = file.name;
                    dragHere.innerHTML = `Selected file: <br> ${fileName}`;

                    const reader = new FileReader();
                    reader.onload = function (e) {
                        selectedImage.src = e.target.result;
                        selectedImage.style.display = 'block';
                        placeholderImage.style.display = 'none';
                        placeholderImageAfter.style.display = 'none';
                    };
                    reader.readAsDataURL(file);
                } else {
                    dragHere.innerHTML = 'Please select a valid image file.';
                    selectedImage.style.display = 'none';
                    placeholderImage.style.display = 'block';
                    placeholderImageAfter.style.display = 'block';
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
        

    

    // <!-- expand product list on click-->
        $(document).ready(function () {
            $('#expandButton').click(function () {
                var $content = $('.my-content');

                if ($content.hasClass('col-lg-6')) {
                    // Slide animation
                    $content.animate({
                        width: '100%' // Expand to full width
                    }, 500, function () {
                        $content.removeClass('col-lg-6').addClass('col-lg-12');
                        $('#expandButton').addClass('btn-small');
                        $('#invoice-parent').addClass('hide-me');
                        var cols = $('.col');
                        cols.animate({ width: '20%' }, 300);
                    });
                } else {
                    // Reverse animation
                    $content.animate({
                        width: '50%' // Contract to half width
                    }, 500, function () {
                        $content.removeClass('col-lg-12').addClass('col-lg-6');
                        $('#expandButton').removeClass('btn-small');
                        $('#invoice-parent').removeClass('hide-me');
                        var cols = $('.col');
                        cols.animate({ width: '25%' }, 300);
                    });
                }
            });
        });

         // Example data
         var data = [
            { id: 1, name: "Casual Texture of Relaxed Shirt", stock: "20 (items)", price: "20.00", discount: "12.00", tax: "2.00", quantity: 2 },
            { id: 2, name: "Slim Fit Jeans", stock: "15 (items)", price: "30.00", discount: "0.00", tax: "0.00", quantity: 1 },
            { id: 3, name: "Leather Jacket", stock: "5 (items)", price: "100.00", discount: "0.00", tax: "0.00", quantity: 1 },
            { id: 4, name: "Sports Shoes", stock: "25 (items)", price: "60.00", discount: "0.00", tax: "0.00", quantity: 1 },
            { id: 5, name: "Woolen Scarf", stock: "30 (items)", price: "15.00", discount: "0.00", tax: "0.00", quantity: 1 },
            { id: 6, name: "Formal Shirt", stock: "10 (items)", price: "25.00", discount: "0.00", tax: "0.00", quantity: 1 },
            { id: 7, name: "Summer Hat", stock: "40 (items)", price: "12.00", discount: "0.00", tax: "0.00", quantity: 1 },
            { id: 8, name: "Denim Shorts", stock: "22 (items)", price: "18.00", discount: "0.00", tax: "0.00", quantity: 1 }
        ];

        // ----- modal total----------
        function calculateTotals() {
            let totalItems = 0;
            let totalTax = 0;
            let subtotal = 0;
            const shippingFees = 30.00; // Assuming a fixed shipping fee
        
            data.forEach(item => {
                totalItems += item.quantity;
                totalTax += parseFloat(item.tax) * item.quantity;
                subtotal += (parseFloat(item.price) * item.quantity);
            });

            
                  
            // Calculate the final total
            const finalTotal = subtotal + totalTax + shippingFees;
        
            // Update the final-total div
            document.querySelector('.final-total').nextElementSibling.textContent = `${finalTotal.toFixed(2)} SAR`;
        }

        document.addEventListener('DOMContentLoaded', calculateTotals)

    // <!-- --- table data----- -->
        document.addEventListener('DOMContentLoaded', () => {
            const tableBody = document.querySelector('#myTable');
    
            // Function to generate table rows from data
            function generateRows(data) {
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
                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.name}</td>
                        <td>${item.stock}</td>
                        <td>
                            <div class="btn-wrp">
                                <button class="btn bg-white border-pr-r decrement-btn" data-id="${item.id}">-</button>
                                <span class="value count">${item.quantity}</span>
                                <button class="btn bg-white border-pr-l increment-btn" data-id="${item.id}">+</button>
                            </div>
                        </td>
                        <td><span class="price">${item.price}</span>SAR</td>
                        <td class="discount">${item.discount}</td>
                        <td class="tax">${item.tax}</td>
                        <td class="subtotal">  ${(item.price * item.quantity)}</td>
                        <td><button type="button" class=" btn bg-red" data-id="${item.id}"><img class="delete-btn" src="assets/img/icon-delete.png"></button></td>
                    `;
                    tableBody.appendChild(row);
                });
    
                // Attach event listeners to newly created rows
                attachEventListeners();
    
                // Initial price update for all rows
                document.querySelectorAll('tr').forEach(row => updatePrice(row));
                
                // Calculate total subtotal after initial setup
                updateTotalSubtotal();
                
            }

            
            
    
            // Function to attach event listeners
            function attachEventListeners() { 
                document.querySelectorAll('.increment-btn, .decrement-btn').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const button = e.target;
                        const row = button.closest('tr');
                        const countSpan = row.querySelector('.count');
                        let count = parseInt(countSpan.textContent, 10);
    
                        if (button.classList.contains('increment-btn')) {
                            count++;
                        } else if (button.classList.contains('decrement-btn') && count > 1) {
                            count--;
                        }
                        countSpan.textContent = count.toString();
                        updatePrice(row);
                        updateTotalCount()
                        updateTotalTax()
                    });
                });


                
            }
    
            function updatePrice(row) {
                const priceValue = parseFloat(row.querySelector('.price').textContent);
                const countSpan = row.querySelector('.count');
                const count = parseInt(countSpan.textContent, 10);
                const totalPrice = (priceValue * count).toFixed(2);
                row.querySelector('.subtotal').textContent = totalPrice;
                updateTotalSubtotal();
            }
            
            generateRows(data);
        });

        function updateTotalCount() {
            let totalCount = 0;
            document.querySelectorAll('#myTable .count').forEach(countSpan => {
                totalCount += parseInt(countSpan.textContent, 10);
            });
            document.querySelector('.total-items').textContent = totalCount +" "+ "items";
        }
        
        function updateTotalTax() {
            let totalTax = 0;
            document.querySelectorAll('#myTable .tax').forEach(countSpan => {
                totalTax += parseInt(countSpan.textContent, 10);
            });
            document.querySelector('.total-tax').textContent = totalTax +" "+ "SAR";
        }

        document.addEventListener('DOMContentLoaded', updateTotalTax)
        document.addEventListener('DOMContentLoaded', updateTotalCount)
        document.addEventListener('DOMContentLoaded', updateTotalSubtotal)

        function updateTotalSubtotal() {
            const shipping = document.querySelector('.shipping-fee').textContent
            const tax = document.querySelector('.total-tax').textContent
            let total = 0;
            document.querySelectorAll('.subtotal').forEach(subtotalElement => {
                total += parseFloat(subtotalElement.textContent);
            });
            const finalTotal = parseFloat(shipping)+ parseFloat(tax)+ parseInt(total)
            document.querySelector('#totalSubtotal').textContent = total.toFixed(2);
            document.querySelector('.payment-subtotal').textContent = total.toFixed(2);
            document.querySelector('.final-total').nextElementSibling.textContent = `${finalTotal.toFixed(2)} SAR`;
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
        };

    // delete all rows of table
    
        document.getElementById('clear-btn').addEventListener('click', function() {
            // Show the modal
            $('#restore').modal('show');
        });
        
        document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
            // Delete all rows from the table
            const table = document.getElementById('myTable');
            while (table.rows.length > 0) {
                table.deleteRow(0);
            }
            // Show the "No items to show" message
            document.getElementById('noItemsMessage').style.display = 'flex';
        });
        
        
        
    // <!-- remove table row (cart item) on click-->
    document.addEventListener('DOMContentLoaded', function () {
        let rowToDelete;
    
        // Event delegation for delete buttons
        document.querySelector('#myTable').addEventListener('click', function (event) {
            if (event.target.classList.contains('delete-btn')) {
                rowToDelete = event.target.closest('tr');
                $('#delete-row').modal('show'); // Show the modal
            }
        });
    
        // Confirm delete button
        document.querySelector('#confirm-delete').addEventListener('click', function () {
            if (rowToDelete) {
                rowToDelete.classList.add('slide-up');
                setTimeout(function () {
                    rowToDelete.remove();
                    updateTotalSubtotal();
                    // Update subtotal after deleting row
                }, 500);
            }
            $('#delete-row').modal('hide'); 
            updateTotalSubtotal(); 
            calculateTotals();// Hide the modal after deletion
        });
    });
    

    