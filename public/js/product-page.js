const editBtn = document.getElementById('edit-btn');
//delete function
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const productId = this.dataset.id;
      const userConfirmation = confirm('Are you sure you want to delete this product?');
      if (userConfirmation) {
        fetch(`/api/products/${productId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        })
          .then((response) => {
            if (response.ok) {
              console.log('Product deleted successfully');
              location.reload(); // Reload the page to reflect the deletion
            } else {
              alert('Failed to delete the product.');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while deleting the product.');
          });
      }
    });
  });
});

$('.save').hide();
$('.cancel').hide();
$('.new-product-row').hide();

// EDIT FUNCTION
$(document).on('click', '.edit', function () {
  $(this)
    .parent()
    .siblings('td.data')
    .each(function () {
      var content = $(this).html();
      // store the original content incase they hit cancel
      $(this).data('original-content', content);
      // console.log(content);
      $(this).html('<input class="input" value="' + content + '" />');
      // console.log(this);
    });

  $(this).siblings('.save').show();
  $(this).siblings('.cancel').show();
  $(this).siblings('#delete-btn').hide();
  $(this).hide();
});

// UPDATE FUNCTION
const updateProduct = (id, data) => {
  fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

// EDIT SAVE FUNCTION
$(document).on('click', '.save', function () {
  $(this)
    .closest('tr')
    .find('input')
    .each(function () {
      var content = $(this).val();
      $(this).html(content);
      $(this).contents().unwrap();
    });
  $(this).siblings('.edit').show();
  $(this).siblings('#delete-btn').show();
  $(this).siblings('.cancel').hide();
  $(this).hide();

  const productId = $(this).parent().siblings('.id').html();
  console.log(productId);

  const product_name = $(this).parent().siblings('.name').html();
  const product_weight = $(this).parent().siblings('.weight').html();
  const product_size = $(this).parent().siblings('.size').html();
  const product_price = $(this).parent().siblings('.price').html();
  const product_quantity = $(this).parent().siblings('.quantity').html();

  const updatedProduct = {
    name: product_name,
    weight: product_weight,
    size: product_size,
    price: product_price,
    quantity: product_quantity,
  };

  console.log(updatedProduct);

  updateProduct(productId, updatedProduct);
});

// CANCEL FUNCTION
$(document).on('click', '.cancel', function () {
  $(this)
    .parent()
    .siblings('td.data')
    .each(function () {
      // Retrieve the original content
      var originalContent = $(this).data('original-content');
      // Set the original content as the HTML content
      $(this).html(originalContent);
    });

  $(this).siblings('.edit').show();
  $(this).siblings('#delete-btn').show();
  $(this).siblings('.save').hide();
  $(this).hide();
});

// ADD PRODUCT FORM EXPAND FUNCTION
$(document).on('click', '#add-product', function () {
  $('.new-product-row').show();
  $('.add-button-row').hide();
  $(this).siblings('#save-to-db-button').show();
  $(this).siblings('#cancel-new-product-btn').show();
  // got to the bottom of the page
  window.scrollTo(0, document.body.scrollHeight);

  $(document).on('click', '#cancel-new-product-btn', function () {
    $(this)
      .closest('tr')
      .find('input')
      .each(function () {
        $(this).val('');
      });
    $('.new-product-row').hide();
    $('.add-button-row').show();
  });
});

// ADD NEW PRODUCT TO DB FUNCTION
const addProduct = (productData) => {
  fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

// SAVE NEW PRODUCT FUNCTION
$(document).on('click', '#save-to-db-btn', function () {
  const product_Id = 0;
  const product_name = $(this).closest('tr').find('.name input').val();
  const product_weight = $(this).closest('tr').find('.weight input').val();
  const product_size = $(this).closest('tr').find('.size input').val();
  const product_price = $(this).closest('tr').find('.price input').val();
  const product_quantity = $(this).closest('tr').find('.quantity input').val();

  // Check if any field is empty
  if (!product_name || !product_weight || !product_size || !product_price || !product_quantity) {
    alert('All fields are required');
    return;
  }
  // check if quantity is a number
  if (isNaN(product_quantity)) {
    alert('Quantity must be a number');
    return;
  }

  const productData = {
    id: product_Id,
    name: product_name,
    weight: product_weight,
    size: product_size,
    price: product_price,
    quantity: product_quantity,
  };
  addProduct(productData);
  $('.new-product-row').hide();
  $('.add-button-row').hide();
  $(this).siblings('#save-to-db-button').hide();
  $(this).siblings('#cancel-new-product-btn').hide();
  // refresh the page to reflect the new product
  // wait for 1 second before refreshing the page
  setTimeout(() => {
    location.reload();
  }, 3000);
  location.reload();
});

// CLOSE MESSAGE FUNCTION
$('#close-message').on('click', function () {
  $('.message').css('display', 'none');
});
