const editBtn = document.getElementById('edit-btn');
//delete function
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const productId = this.dataset.id;
      const userConfirmation = confirm(
        'Are you sure you want to delete this product?'
      );
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

const updateProduct = (id, data) => {
  fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

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

// When the button with the id="close-message" is clicked, the display of the element with the class="message" is set to "none"
$('#close-message').on('click', function () {
  $('.message').css('display', 'none');
});
