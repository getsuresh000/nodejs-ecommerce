
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

import AdminManager from '../services/cache/AdminManager.js';
import AdminController from '../controllers/AdminControllers.js';


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
    let adminMgr=new AdminManager();
    let admincontroller=new AdminController(adminMgr);

    app.get("/", (req, res) => {
        res.json({
          route: "/",
          authentication: false,
        });
      });

 
  
 
    app.post("/api/users/register", authcontroller.register);
    app.post("/api/users/login", authcontroller.login);
    app.put("/api/users/updatepassword", authcontroller.updatePassword);
    app.put("/api/users/logout", authcontroller.logout);
    app.get("/api/users/dashboard", authcontroller.dashboard);


    app.post("/api/customers/addtocart/:id", cartcontroller.addtocart);
    app.get("/api/customers/cartdetails", cartcontroller.cartDetails);
    app.put("/api/customers/updatecart/:id", cartcontroller.updateCart);
    app.delete("/api/customers/deletecart/:id", cartcontroller.deleteCart);

    app.post("/api/customers/placeorder/:id", ordercontroller.placeOrder);
    app.get("/api/customers/orderdetails", ordercontroller.orderDetails);
    app.post("/api/customers/addpayment/:id", ordercontroller.addPayment);

    app.get("/api/users", sqlcontroller.getAll);
    app.get("/api/users/:id", sqlcontroller.getById);
    app.delete("/api/users/:id", sqlcontroller.delete);
    app.put("/api/users/:id", sqlcontroller.put);
    app.get("/api/users/currentuser", sqlcontroller.currentUser);

    app.get("/api/category", categoryController.getAll);
    app.get("/api/category/:id", categoryController.getById);
    
    app.post("/api/seller/addproduct", productcontroller.addProduct);
    app.get("/api/products", productcontroller.getAll);
    app.get("/api/productbycatid/:id", productcontroller.getByCatId);
    app.delete("/api/sellers/products/:id", productcontroller.deleteProduct);
    app.put("/api/sellers/updateproduct/:id", productcontroller.updateProduct);

    app.get("/api/sellers/requestorders", ordercontroller.requestOrders);
    app.put("/api/sellers/updateorderstatus/:id", ordercontroller.updateOrderStatus);
  
    app.get("/api/sellers/paymenthistory", ordercontroller.paymentHistory);
    app.get("/api/sellers/dashboard", sellercontroller.dashboard);
    app.get("/api/sellers/getproducts", sellercontroller.getProductsBySeller);
   
    app.delete("/api/sellers/:id", sellercontroller.delete);
    app.put("/api/sellers/:id", sellercontroller.put);

   
    app.post("/api/customers", customercontroller.insert);
    app.get("/api/customers", customercontroller.getAll);
    app.get("/api/customers/:id", customercontroller.getByUserId);
    app.delete("/api/customers/:id", customercontroller.delete);
    app.put("/api/customers/:id", customercontroller.put);

  
    app.get("/api/admin/customers", admincontroller.getAllCustomers);
    app.get("/api/admin/customer/:id", admincontroller.getCustomerById);
    app.get("/api/admin/sellers", admincontroller.getAllSellers);
    app.get("/api/admin/seller/:id", admincontroller.getSellerById);
    app.get("/api/admin/orders", admincontroller.getAllOrders);
    app.get("/api/admin/orders/:id", admincontroller.getOrderById);
    app.post("/api/admin/addstaff", admincontroller.addStaff);
    app.get("/api/admin/staff", admincontroller.getAllStaff);
    app.get("/api/admin/payments", admincontroller.getAllPayments);

    app.get("/api/staff/customers", staffcontroller.getAllCustomers);
    app.get("/api/staff/customers/:id", staffcontroller.getCustomerById);
    app.delete("/api/staff/customer/:id", staffcontroller.deleteCustomerById);
    app.get("/api/staff/sellers", staffcontroller.getAllSellers);
    app.get("/api/staff/sellers/:id", staffcontroller.getSellerById);
    app.delete("/api/staff/seller/:id", staffcontroller.deleteSellerById);
    app.get("/api/staff/orders", staffcontroller.getAllOrders);
    app.get("/api/staff/orders/:id", staffcontroller.getOrderById);
    app.post("/api/staff/addcategory", categoryController.addCategory);
    app.put("/api/staff/updatecategory/:id", categoryController.updateCategory);
    app.delete("/api/staff/deletecategory/:id", categoryController.deleteCategory);
    app.get("/api/staff/payments", staffcontroller.getAllPayments);

    app.get("/api/customers/cart", cartcontroller.getCartByCustomer);
    app.get("/api/cart/:id", cartcontroller.getByCusId);
    app.delete("/api/cart/:id", cartcontroller.delete);
   
}