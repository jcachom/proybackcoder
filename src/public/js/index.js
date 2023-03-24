 
/*
const socket =io();
//socket.emit("message","cliente emit mensaje")
const input =document.getElementById("textbox");
const log=document.getElementById("log");

input.addEventListener("keyup",evt => {
    if(evt.key=="Enter"){
        socket.emit("message",input.value);
        input.value="";
    }
})
socket.on("log",data=>{
    let logs="";
    data.logs.forEach(item => {
        logs=logs + `${item.socketid} dice: ${item.message} <br/>`
    });
    log.innerHTML=logs;
})
*/
 
//let sockets=io.connect("http://localhost:8080/",{forceNew:true})
const sockets =io();


sockets.on("connect", () => {
   
    console.log("conectado en realtime");
  
});

  
  sockets.on("msgproductos", (lisproductos) => {
   // console.log(msg);
   let list ="";
   const listdiv =document.getElementById("listp");
   lisproductos.forEach((item, indice) =>  {
     list = list + `
      <div  class="tarjeta">
              <br>
              id :${item.id}<br>
              code : ${item.code}   <br>
              description :  ${item.description}  <br>
              price : ${item.price}  <br>
              stock : ${item.stock}   <br>        
             </div>
              <br>     
     ` ;
   });

   listdiv.innerHTML=list;

});
