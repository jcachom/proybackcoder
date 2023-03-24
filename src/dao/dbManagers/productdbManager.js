let productosModel = require("../models/productos.model");

class productManager {
  constructor() {}

  async addProduct(product) {
    let new_product_id = 1;
    let productos_find = await productosModel.find().sort({ id: -1 }).limit(1);
    if (productos_find.length > 0)
      new_product_id = new Number(productos_find[0].id) + 1;

    let new_product = {
      id: new_product_id,
      ...product,
    };
    let result = await productosModel.create(new_product);

    
    return { status : "S", message : "producto adicionado." , payload: new_product}
 
   

 
  }

  async getProducts(cantFilas = -1) {
    let productos;
    if (cantFilas > 0) {
      productos = await productosModel.find().limit(cantFilas);
    } else {
      productos = await productosModel.find();
    }

    let list = productos.map((item) => item.toObject());
    return list;
  }

  async getProductById(id) {
    let productos = await productosModel.find({ id: { $eq: id } });
    let list = productos.map((item) => item.toObject());

    return list;
  }

  async updateProduct(product, uid) {
    let rpta = 0;
    let result = await productosModel.updateOne({ id: uid }, product);
    if (result.matchedCount > 0 && result.modifiedCount > 0) rpta = 1;
    return rpta;
  }

  async deleteProduct(uid) {
    let rpta = 0;
    let result = await productosModel.deleteOne({ id: uid });
    console.log(result);
    if (result.deletedCount > 0) rpta = 1;
    return rpta;
  }
 
}

module.exports = productManager;
