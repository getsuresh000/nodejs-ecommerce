import UserManager from '../models/UserManagers.js';
import UserController from '../controllers/UserControllers.js';
import AuthManager from '../models/AuthManagers.js';
import AuthController from '../controllers/AuthControllers.js';
import ProductManager from '../models/ProductManagers.js';
import ProductController from '../controllers/ProductControllers.js';
import CategoryManager from '../models/CategoryManagers.js';
import CategoryController from '../controllers/CategoryControllers.js';
import SellerManager from '../models/SellersControllers.js';
import SellersController from '../controllers/SellersControllers.js';

export default function (app) {

    let sqlMgr = new UserManager();
    let sqlcontroller = new UserController(sqlMgr);
    let authMgr=new AuthManager();
    let authcontroller=new AuthController(authMgr);
    let proMgr=new ProductManager();
    let productcontroller=new ProductController(proMgr);
    let catMgr=new CategoryManager();
    let categoryController=new CategoryController(catMgr);
    let sellerMgr=new SellerManager();
    let sellercontroller=new SellersController(sellerMgr);

    app.post("/api/users/register", authcontroller.register);
    app.post("/api/users/login", authcontroller.login);
    app.get("/api/users/logout", authcontroller.logout);

    app.get("/api/users", sqlcontroller.getAll);
    app.get("/api/users/:id", sqlcontroller.getById);
    app.delete("/api/users/:id", sqlcontroller.delete);
    app.put("/api/users/:id", sqlcontroller.put);

    app.post("/api/category", categoryController.insert);
    app.get("/api/category", categoryController.getAll);
    app.get("/api/category/:id", categoryController.getById);
    app.delete("/api/category/:id", categoryController.delete);
    app.put("/api/category/:id", categoryController.put);

    app.get("/api/products", productcontroller.getAll);
    app.get("/api/products/:id", productcontroller.getById);
    app.delete("/api/products/:id", productcontroller.delete);
    app.put("/api/products/:id", productcontroller.put);


    app.post("/api/sellers", sellercontroller.insert);
    app.get("/api/sellers", sellercontroller.getAll);
    app.get("/api/sellers/:id", sellercontroller.getById);
    app.delete("/api/sellers/:id", sellercontroller.delete);
    app.put("/api/sellers/:id", sellercontroller.put);
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