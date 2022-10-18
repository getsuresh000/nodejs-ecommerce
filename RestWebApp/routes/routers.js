
import AuthManager from '../services/cache/AuthManager.js';
import AuthController from '../controllers/AuthControllers.js';

import UserManager from '../services/cache/UserManager.js';
import UserController from '../controllers/UserControllers.js';

import ProductManager from '../services/cache/ProductManager.js';
import ProductController from '../controllers/ProductControllers.js';

import CategoryManager from '../services/cache/CategoryManager.js';
import CategoryController from '../controllers/CategoryControllers.js';

import SellerManager from '../services/cache/SellerManager.js';
import SellersController from '../controllers/SellersControllers.js';

import CustomerManager from '../services/cache/CustomerManager.js';
import CustomerController from '../controllers/CustomerControllers.js';

import OrderManager from '../services/cache/OrderManager.js';
import OrderController from '../controllers/OrdersControllers.js';

import CartManager from '../services/cache/CartManager.js';
import CartController from '../controllers/CartControllers.js';

import StaffManager from '../services/cache/StaffManager.js';
import StaffController from '../controllers/StaffControllers.js';

import HomeController from '../controllers/HomeController.js';


export default function (app) {

    let authMgr=new AuthManager();
    let authcontroller=new AuthController(authMgr);
    
    let sqlMgr = new UserManager();
    let sqlcontroller = new UserController(sqlMgr);

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
    let staffMgr=new StaffManager();
    let staffcontroller=new StaffController(staffMgr);
    let homecontroller=new HomeController();

    app.get("/", (req, res) => {
        res.json({
          route: "/",
          authentication: false,
        });
      });

 
  
    app.get("/api/aboutus",homecontroller.About);
    app.get("/api/contactus",homecontroller.Contactus);
    
    app.post("/api/users/register", authcontroller.register);
    app.post("/api/users/login", authcontroller.login);
    app.get("/api/users/logout", authcontroller.logout);
    app.get("/api/users/dashboard", authcontroller.dashboard);

    app.post("/api/users/addtocart", authcontroller.addtocart);
    app.get("/api/users/cartdetails", authcontroller.cartDetails);
    app.delete("/api/users/deletecart/:id", authcontroller.deleteCart);
    app.post("/api/users/placeorder/:id", authcontroller.placeOrder);
    app.get("/api/users/orderdetails", authcontroller.orderDetails);
    app.post("/api/users/addpayment/:id", authcontroller.addPayment);

    app.get("/api/users", sqlcontroller.getAll);
    app.get("/api/users/:id", sqlcontroller.getById);
    app.delete("/api/users/:id", sqlcontroller.delete);
    app.put("/api/users/:id", sqlcontroller.put);
    app.get("/api/users/currentuser", sqlcontroller.currentUser);

    app.post("/api/addcategory", categoryController.addCategory);
    app.get("/api/category", categoryController.getAll);
    app.get("/api/category/:id", categoryController.getById);
    app.delete("/api/deletecategory/:id", categoryController.deleteCategory);
    app.put("/api/category/:id", categoryController.put);

    app.post("/api/products", productcontroller.insert);
    app.get("/api/products", productcontroller.getAll);
    app.get("/api/products/:id", productcontroller.getByCatId);
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

    app.post("/api/staff", staffcontroller.insert);
    app.get("/api/staff", staffcontroller.getAll);
    app.get("/api/staff/:id", staffcontroller.getById);
    app.delete("/api/staff/:id", staffcontroller.delete);
    app.put("/api/staff/:id", staffcontroller.put);

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
   
}