import product from '../models/product.js';
//Controller
export default class ProductController{
    //constructor Dependency Injection
    constructor(mgr){
        /*
        let flower1=new Product(12,"Gerbera","Wedding Flower",12,512500);
        let flower2=new Product(13,"Rose","Valentine Flower",26,5564);
        let flower3=new Product(14,"Lotus","Worship Flower",39,87000);
        let flower4=new Product(15,"Marigold","Festival Flower",4,87900); 
*/
         //Initial data repository insertion
        this.repoManager=mgr; 
      /*  this.repoManager.insert(flower1);
        this.repoManager.insert(flower2);
        this.repoManager.insert(flower3);
        this.repoManager.insert(flower4);
        */
    }

    get=async (req, res)=>{
        let allProducts= await this.repoManager.getAll();
        res.send(allProducts)
    }

    getById=async (req, res)=>{
         let product= await this.repoManager.getById(id);
         res.send(product);
    }

    post=(req, res)=>{
        console.log(req.body);
        this.repoManager.insert(req);
        res.send("Product inserted successfully");
    }

    put=(id, product)=>{
        this.repoManager.update(id,product);
        res.send("Product inserted successfully");
    }

    delete(id){
        this.repoManager.remove(id);
        res.send("Product inserted successfully");
    }
}