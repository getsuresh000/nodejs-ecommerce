import UserManager from '../models/UserManagers.js';
import UserController from '../controllers/UserControllers.js';
import AuthManager from '../models/AuthManagers.js';
import AuthController from '../controllers/AuthControllers.js';
import ProductManager from '../services/cache/ProductManager.js';
import ProductController from '../controllers/ProductControllers.js';
import CategoryManager from '../services/cache/CategoryManager.js';
import CategoryController from '../controllers/CategoryControllers.js';
import SellerManager from '../models/SellersControllers.js';
import SellersController from '../controllers/SellersControllers.js';
import CustomerManager from '../services/cache/CustomerManager.js';
import CustomerController from '../controllers/CustomerControllers.js';
import OrderManager from '../services/cache/OrderManager.js';
import OrderController from '../controllers/OrdersControllers.js';
import CartManager from '../services/cache/CartManager.js';
import CartController from '../controllers/CartControllers.js';

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
    let cusMgr=new CustomerManager();
    let customercontroller=new CustomerController(cusMgr);
    let ordMgr=new OrderManager();
    let ordercontroller=new OrderController(ordMgr);
    let cartMgr=new CartManager();
    let cartcontroller=new CartController(cartMgr);

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

    app.post("/api/products", productcontroller.insert);
    app.get("/api/products", productcontroller.getAll);
    app.get("/api/products/:id", productcontroller.getById);
    app.delete("/api/products/:id", productcontroller.delete);
    app.put("/api/products/:id", productcontroller.put);


    app.post("/api/sellers", sellercontroller.insert);
    app.get("/api/sellers", sellercontroller.getAll);
    app.get("/api/sellers/:id", sellercontroller.getById);
    app.delete("/api/sellers/:id", sellercontroller.delete);
    app.put("/api/sellers/:id", sellercontroller.put);

    app.post("/api/customers", customercontroller.insert);
    app.get("/api/customers", customercontroller.getAll);
    app.get("/api/customers/:id", customercontroller.getByUserId);
    app.delete("/api/customers/:id", customercontroller.delete);
    app.put("/api/customers/:id", customercontroller.put);

    app.post("/api/orders", ordercontroller.insert);
    app.get("/api/orders", ordercontroller.getAll);
    app.get("/api/orders/:id", ordercontroller.getById);
    app.delete("/api/orders/:id", ordercontroller.delete);
    app.put("/api/orders/:id", ordercontroller.put);

    app.post("/api/cart", cartcontroller.insert);
    app.get("/api/cart", cartcontroller.getAll);
    app.get("/api/cart/:id", cartcontroller.getByCusId);
    app.delete("/api/cart/:id", cartcontroller.delete);
    app.put("/api/cart/:id", cartcontroller.put);
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