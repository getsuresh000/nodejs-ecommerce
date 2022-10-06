
import ProductController from '../controllers/controller.js';
import ProductManager from '../services/repository.js';
export default function(app){
    let allProducts=[];
    let mgr=new ProductManager();
    let controller=new ProductController(mgr);
    app.get("/api/products",(req, res)=>{ 
                                        //let allProducts=productController.get();                                         
                                        //Models
                                        let flower1=new Product(12,"Gerbera","Wedding Flower",12,512500);
                                        let flower2=new Product(13,"Rose","Valentine Flower",26,5564);
                                        let flower3=new Product(14,"Lotus","Worship Flower",39,87000);
                                        let flower4=new Product(15,"Marigold","Festival Flower",4,87900);

                                        //Performing operations
                                        controller.post(flower1);
                                        controller.post(flower2);
                                        controller.post(flower3);
                                        controller.post(flower4);
                                        allProducts=controller.get()
                                        res.send(allProducts)});
    app.get("/api/products/id",productController.getById);
    /*
    app.post("/api/products",productController.get);
    app.put("/api/products",productController.get);
    app.delete("/api/products",productController.get);*/

}