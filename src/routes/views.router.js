let { Router } = require("express");

let productManager = require("../dao/dbManagers/productdbManager");
let messageManager = require("../dao/dbManagers/messagesdbManager");

let oProducto = new productManager();
let omessageManager = new messageManager();
 

//let userManager = require("../dao/dbManagers/usersdbManager");
//let coursesManager = require("../dao/dbManagers/coursesdbManager");

//let productManager = require("../dao/fileManagers/productManager");
//let oProducto = new productManager("../dao/files/productos.json");

const router = Router();

/*
let ouserManager = new userManager();
let ocoursesManager = new coursesManager();
router.get("/", async (req, res, next) => {
  let users = await ouserManager.getAll();
  res.render("users", { users });
});
router.get("/course", async (req, res, next) => {
  let courses = await ocoursesManager.getAll();
  res.render("courses", { courses });
});
router.get("/indexjc", async (req, res, next) => {
  res.render("indexhandle", {});
});

*/

router.get("/messagechat",async (req,res,next)=>{
  let list;
  list = await omessageManager.getAll();
  res.render('messagechat',{ messages: list } )
})



router.get("/",async (req,res,next)=>{
  let list;
  list = await oProducto.getProducts(0);
  res.render('home',{ productos: list } )
})

router.get("/realtimeproducts",async (req,res,next)=>{
  let productos=[];
  productos = await oProducto.getProducts(); 
  res.render('realTimeProducts',{ productos: productos } )

})

module.exports = router;

 