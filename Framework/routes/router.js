import ProductController from '../controllers/productcontroller.js';
import ProductManager from '../services/repository.js';
import FileManager from '../services/io/iomgr.js';

export default function(app){
   // let mgr=new ProductManager();
   //let mgr=new MySQLDBManager();
   let mgr=new FileManager();
   // constructor dependency injection
    let controller=new ProductController(mgr);  
    
    //Map controller callback functions for rest API routes
    app.get("/api/products",controller.get);
    app.get("/api/products/id",productController.getById);
    app.post("/api/products",productController.post);
    app.put("/api/products",productController.put);
    app.delete("/api/products",productController.delete);
}