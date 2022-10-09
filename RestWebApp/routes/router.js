import UserManager from '../services/db/UserManager.js';
import UserController from '../controllers/UserControllers.js';

/*
import productController from '../controllers/productcontroller.js';
import ProductManager from '../services/cache/repository.js';
import FileManager from '../services/io/iomgr.js';
*/
export default function (app) {

    let sqlMgr = new UserManager();
    let sqlcontroller = new UserController(sqlMgr);

    app.get("/api/users", sqlcontroller.getAll);
    app.get("/api/users/:id", sqlcontroller.getById);
    app.post("/api/users/register",sqlcontroller.insert);
    app.post("/api/users/login",sqlcontroller.login);
    app.put("/api/users/:id",sqlcontroller.put);
    app.delete("/api/users/:id",sqlcontroller.delete);

    app.get("/api/products", sqlcontroller.getAll);
    app.get("/api/products/:id", sqlcontroller.getById);
    app.post("/api/products",sqlcontroller.insert);
    app.put("/api/products/:id",sqlcontroller.put);
    app.delete("/api/prducts/:id",sqlcontroller.delete);
    // let mgr=new ProductManager();

    //let mgr=new FileManager();
    // constructor dependency injection
    //   let controller=new productController(mgr);  

    //Map controller callback functions for rest API routes
   
    /*  app.post("/api/products",controller.post);
  
     app.get("/api/products",controller.get);
   app.get("/api/products/id",productController.getById);
 
     app.put("/api/products",productController.put);
     app.delete("/api/products",productController.delete);
     */
}