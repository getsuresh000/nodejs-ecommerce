import Product from './models/product.js';
import ProductManager from './services/repository.js';
import ProductController from './controllers/productcontroller.js';

//Test classes by creating instances (Objects)

let flower1=new Product(12,"Gerbera","Wedding Flower",12,512500);
let flower2=new Product(13,"Rose","Valentine Flower",26,5564);
let flower3=new Product(14,"Lotus","Worship Flower",39,87000);
let flower4=new Product(15,"Marigold","Festival Flower",4,87900); 

  
let mgr=new ProductManager();
let controller=new ProductController(mgr); 

controller.post(flower1);
controller.post(flower2);
controller.post(flower3);
controller.post(flower4);

let allProducts=controller.get();

allProducts.map((product)=>{
    console.log(product);
})

