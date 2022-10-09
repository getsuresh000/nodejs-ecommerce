import UserManager from '../services/cache/UserManager.js';
import UserController from '../controllers/UserControllers.js';
import AuthManager from '../services/cache/AuthManager.js';
import AuthController from '../controllers/AuthControllers.js';

/*
import productController from '../controllers/productcontroller.js';
import ProductManager from '../services/cache/repository.js';
import FileManager from '../services/io/iomgr.js';
*/
export default function (app) {

    let sqlMgr = new UserManager();
    let sqlcontroller = new UserController(sqlMgr);
    let authMgr=new AuthManager();
    let authcontroller=new AuthController(authMgr);

    app.post("/api/users/register", authcontroller.register);
    app.post("/api/users/login", authcontroller.login);
    app.get("/api/users/logout", authcontroller.logout);

    app.get("/api/users", sqlcontroller.getAll);
    app.get("/api/users/:id", sqlcontroller.getById);
    app.delete("/api/users/:id", sqlcontroller.delete);
    app.put("/api/users/:id", sqlcontroller.put);
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