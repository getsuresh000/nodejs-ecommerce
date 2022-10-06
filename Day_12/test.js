import {Product} from './models/model.js';
import { ProductManager} from './services/repository.js';
import {ProductController} from './controllers/controller.js';

let mgr=new ProductManager();  // repo
let controller=new ProductController(mgr); //controller

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

console.log("Code execution....");
let allProducts=controller.get();

//View  Presenting
console.log(allProducts);
allProducts.map((flower)=>{
    flower.display()
});

console.log("End of Node JS App Execution ProductDBManager");