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


//WORKING ON EDIT FUNCTION
// const editProduct = (id) => {
//   fetch(`/api/products/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//   });
// };

// editBtn.addEventListener("click", function (e) {
//   e.stopPropagation();
//   console.log("clicked");
//   const productId = e.target.dataset.id;
//   console.log(e.target);
//   console.log(e.target.dataset);
//   console.log(productId);
//   deleteProduct(productId);
//   location.reload();
// });


// //Edit: WORKING ON 

// function Edit(element) {

//   const row = element.parentNode.parentNode;
//   const tdList = row.children;

//   for (let index = 0; index < tdList.length - 1; index++) {
//     const element = tdList[index];
//     var str = element.childNodes[0].nodeValue;
//     var input = document.createElement("input");
//     input.type = "text";
//     input.id = "edit" + (index + 1).toString();
//     input.value = str;
//     element.removeChild(element.childNodes[0]);
//     element.appendChild(input);



//   }
//   const tdBtns = tdList[1];
//   const btns = tdBtns.children;
//   deleteButtons(btns, tdBtns);
//   createButtons(false, tdBtns);
// }


// function Save(element) {
//   const row = element.parentNode.parentNode;
//   const tdList = row.children;

//   /* const edit = [
//       ['edit1'],
//       ['edit2']
//   ]; */

//   const edit = [];
//   for (let index = 0; index <= 1; index++) {
//     edit[index] = document.getElementById("edit" + (index + 1).toString()).value;
//     if (edit[index] == "") {
//       alert("You must not keep textboxes empty");
//       var empty = true;
//     }
//   }

//   if (!empty) {
//     for (let index = 0; index < tdList.length - 1; index++) {
//       tdList[index].removeChild(tdList[index].children[0]);
//       var text = document.createTextNode(edit[index]);
//       tdList[index].appendChild(text);
//     }
//     const tdBtns = tdList[1];
//     const btns = tdBtns.children;
//     deleteButtons(btns, tdBtns);
//     createButtons(true, tdBtns);

//   }
// }