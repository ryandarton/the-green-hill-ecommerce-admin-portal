const deleteBtn = document.getElementById("delete-btn");
const editBtn = document.getElementById("edit-btn");

const deleteProduct = (id) => {
  fetch(`/api/products/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};

deleteBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  console.log("clicked");
  const productId = e.target.dataset.id;
  console.log(e.target);
  console.log(e.target.dataset);
  console.log(productId);
  deleteProduct(productId);
  location.reload();
});

$(".save").hide();

// EDIT FUNCTION
$(document).on("click", ".edit", function () {
  $(this).parent().siblings("td.data").each(function () {
      var content = $(this).html();
      // console.log(content);
      $(this).html('<input value="' + content + '" />');
      // console.log(this);
    });

  $(this).siblings(".save").show();
  $(this).siblings("#delete-btn").hide();
  $(this).hide();
});

$(document).on("click", ".save", function () {
  $("input").each(function () {
    var content = $(this).val();
    $(this).html(content);
    // console.log(content);
    $(this).contents().unwrap();
  });
  $(this).siblings(".edit").show();
  $(this).siblings("#delete-btn").show();
  $(this).hide();




  
});

// $(document).on("click", ".delete", function () {
//   $(this).parents("tr").remove();
// });

// $(".add").click(function () {
//   $(this)
//     .parents("table")
//     .append(
//       '<tr><td class="data"></td><td class="data"></td><td class="data"></td><td><button class="save">Save</button><button class="edit">Edit</button> <button class="delete">Delete</button></td></tr>'
//     );
// });
