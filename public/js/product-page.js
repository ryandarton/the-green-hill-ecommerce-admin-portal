// function deleteButtons(btns, tdBtns) {
//   for (let index = 0; index < btns.length; index += index) {
//     tdBtns.removeChild(btns[index]);
//   }
// }

// const { Server } = require("mysql2/typings/mysql/lib/Server");

// function createButtons(bool, td) {
//   if (bool) {
//     var Edit = document.createElement('input');
//     Edit.type = "button";
//     Edit.value = "Edit";
//     Edit.setAttribute('onclick', 'Edit(this)');
//     td.appendChild(Edit);

//     var Delete = document.createElement('input');
//     Delete.type = "button";
//     Delete.setAttribute('onclick', 'Delete(this)');
//     Delete.value = "Delete";
//     td.appendChild(Delete);

//   } else {

//     var Save = document.createElement('input');
//     Save.type = "button";
//     Save.value = "Save";
//     Save.setAttribute('onclick', 'Save(this)');
//     td.appendChild(Save);
//   }
// }

// function Add() {
//   var p1 = document.getElementById("txt").value;
//   const row1 = document.getElementById("row1");
//   var table = document.getElementById("MyTable");
// }

// //delete:
// function Delete(element) {
//   element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
// }

// //Edit:

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
//   for (let index = 0; index < tdList.length -1; index++) {
//     if (!document.getElementById("edit" + (index + 1).toString())) {
//        console.warn('no element with id ' + "edit" + (index + 1).toString());
//        continue;
//     }
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

const deleteProduct = async (id) => {
  await fetch(`/api/products/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};

const deleteBtn = document.getElementById("delete-btn");

deleteBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  console.log("clicked");
  const productId = e.target.dataset.id;
  console.log(e.target);
  console.log(e.target.dataset);
  console.log(productId);
  deleteProduct(productId);

  // .then(() => {
  //   getAndRenderNotes();
  //   renderActiveNote();
  // });
});
