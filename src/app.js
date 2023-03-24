const express = require("express");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
let { ___dirname } = require("./utils");
const path = require("path");

const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");

const userRouter = require("./routes/users.router");
const courseRouter = require("./routes/courses.router");
const viewsRouter = require("./routes/views.router");


 
let productManager = require("./dao//dbManagers/productdbManager");
let oProducto = new productManager();

let messageManager = require("./dao//dbManagers/messagesdbManager");
let omessageManager = new messageManager();


const PUERTO = 8080;
const MONGO_ATLAS_URI =
  "mongodb+srv://root:V5862GR3lrcPXvmk@cluster0.lyn5t.mongodb.net/dbcoder2023?retryWrites=true&w=majority";

const app = express();

app.engine("handlebars", handlebars.engine({ defaultLayout: "index" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views", "hbs"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(___dirname + "/public"));

let connection;
(async () => {
  try {
    connection = mongoose.connect(MONGO_ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("conexion establecida");
    console.log("------------------------------------");
  } catch (error) {
    console.log(error);
  }
})();

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);

app.use("/", viewsRouter);

const httpServer = app.listen(8080, () => {
  console.log("listen on PORT 8080");
});

const socketServer = new Server(httpServer);

const logs = [];
const logsChatBox = [];
socketServer.on("connection", (socket) => {
  console.log("Nuevo Cliente conectado");

  socket.on("mensaje", (data) => {
    console.log(data);
  });

  
  socket.on("msgchatbox", (data) => {
    logsChatBox.push({ socketId: socket.id, message: data });
    socketServer.emit("logchatbox", { logsChatBox });
  });

  socket.on("realtimeproducts", (data) => {
    let sendpoduct= async()=> {
        let result = await oProducto.addProduct(data);
        let listProduct = await oProducto.getProducts(0);
        socketServer.emit("ret_realtimeproducts", {listProduct});                
    }
    try {
      sendpoduct();
    } catch (error) {
      
    }
  });


  socket.on("messagechatrealtime", (data) => {
    let sendmessage= async()=> {
        let result = await omessageManager.saveMessage(data);
        let listmessages = await omessageManager.getAll();
        socketServer.emit("ret_messagechatrealtime", {listmessages});                
    }
    try {
      sendmessage();
    } catch (error) {
      
    }
  
  });


 

});

 
 
 

/*
GET : all products> http://localhost:8080/api/products
GET :with limits> http://localhost:8080/api/products/?limit=2
GET  : Produc by id > http://localhost:8080/api/products/7
POST : Add product > http://localhost:8080/api/products
{
    "code": "abc149",
    "title": "producto prueba",
    "description": "Este es un producto prueba",
    "price": 200,
    "status": true,
    "stock": 250,
    "thumbnail": [
      "url1",
      "url2"
    ]
  }

  PUT : Update a product > http://localhost:8080/api/products/13
  {
    "code": "abc146",
    "title": "producto prueba3",
    "description": "Este es un producto prueba",
    "price": 200,
    "status": true,
    "stock": 250,
    "thumbnail": [
      "url1",
      "url2"
    ]
  }

  DELETE : Delete a product > http://localhost:8080/api/products/13
  POST : Create a Cart > http://localhost:8080/api/carts
  GET : Get all Carts > http://localhost:8080/api/carts
  GET : Get a Cart > http://localhost:8080/api/carts/5
  GET : All products by Cart > http://localhost:8080/api/carts/5
  DELETE : Delete a cart > http://localhost:8080/api/carts/6
  DELETE : Delete a product in a Cart > http://localhost:8080/api/carts/40/product/8


*/
