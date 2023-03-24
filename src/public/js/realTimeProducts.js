const sockets = io();

const txtcodigo = document.getElementById("txtcodigo");
const txttitle = document.getElementById("txttitle");
const txtdescripcion = document.getElementById("txtdescripcion");
const txtprice = document.getElementById("txtprice");
const txtstock = document.getElementById("txtstock");
const btnadicionar = document.getElementById("btnadicionar");

btnadicionar.addEventListener("click", (evt) => {
  let producto = {
    code: txtcodigo.value,
    title: txttitle.value,
    description: txtdescripcion.value,
    price: txtprice.value,
    status: true,
    stock: txtstock.value,
    thumbnail: [],
  };

  let mensaje = "";

  if (
    producto.code == "" ||
    producto.description == "" ||
    producto.price == "" ||
    producto.stock == "" ||
    producto.title == ""
  ) {
    mensaje = "";
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      title: "Debe ingresar los datos.",
      icon: "success",
    });
  }
  if (mensaje == "") {
    sockets.emit("realtimeproducts", producto);

    txtcodigo.value = "";
    txtdescripcion.value = "";
    txtprice.value = "";
    txtstock.value = "";
  }
});

sockets.on("ret_realtimeproducts", (data) => {
  const listabody = document.getElementById("divlist");

  listabody.innerHTML = "";

  let listItems = "";
  data.listProduct.forEach((item) => {
    listItems =
      listItems +
      `<div  class="tarjeta"><br>
       id : ${item.id} <br>
       code : ${item.code} <br>
       description : ${item.description} <br>
       price : ${item.price} <br>
       stock : ${item.stock} <br>
       `;
  });
  divlist.innerHTML = listItems;

  console.log(data);
});
