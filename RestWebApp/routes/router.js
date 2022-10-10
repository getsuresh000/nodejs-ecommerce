import UserManager from '../models/UserManager.js';
import UserController from '../controllers/UserControllers.js';
import AuthManager from '../models/AuthManager.js';
import AuthController from '../controllers/AuthControllers.js';
import ProductManager from '../models/ProductManager.js';
import ProductController from '../controllers/ProductControllers.js';
import CategoryManager from '../models/CategoryManager.js';
import CategoryController from '../controllers/CategoryControllers.js';
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
    let proMgr=new ProductManager();
    let productcontroller=new ProductController(proMgr);
    let catMgr=new CategoryManager();
    let CategoryController=new  CategoryController(catMgr);

    app.post("/api/users/register", authcontroller.register);
    app.post("/api/users/login", authcontroller.login);
    app.get("/api/users/logout", authcontroller.logout);

    app.get("/api/users", sqlcontroller.getAll);
    app.get("/api/users/:id", sqlcontroller.getById);
    app.delete("/api/users/:id", sqlcontroller.delete);
    app.put("/api/users/:id", sqlcontroller.put);

    app.get("/api/category", CategoryController.getAll);
    app.get("/api/category/:id", CategoryController.getById);
    app.delete("/api/category/:id", CategoryController.delete);
    app.put("/api/category/:id", CategoryController.put);

    app.get("/api/products", productcontroller.getAll);
    app.get("/api/products/:id", productcontroller.getById);
    app.delete("/api/products/:id", productcontroller.delete);
    app.put("/api/products/:id", productcontroller.put);
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