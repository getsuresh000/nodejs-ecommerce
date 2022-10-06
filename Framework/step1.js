
class Product{ 
    //Parameterized constructor
    constructor(id, title, description, unitprice, quantity){
        this.id=id;
        this.title=title;
        this.description=description;
        this.unitprice=unitprice;
        this.quantity=quantity;
    }

    display(){
        console.log( "Id="+this.id);
        console.log( "Title="+this.title);
        console.log( "Description="+this.description);
        console.log( "Unit Price="+this.unitprice);
        console.log( "Quantities Available="+this.quantity);
    }
}

class ProductManager{
    constructor(){
        this.products=[];
    }
    
    insert(product){
        this.products.push(product);
    }

    update(id, productTobeUpdated){
        this.products=products.filter((product)=>(product.id !==id));
        this.product.push(productTobeUpdated);
    }

    getAll(){
        return this.products;
    }

    getById(id){
        let foundProduct=this.products.find((product)=>(product.id ==id));
        return foundProduct;
    }

    delete(id){   
        this.products=products.filter((product)=>(product.id !==id));
        return this.products;
    }
}

class ProductController{
    //constructor Dependency Injection
    constructor(mgr){
        let flower1=new Product(12,"Gerbera","Wedding Flower",12,512500);
        let flower2=new Product(13,"Rose","Valentine Flower",26,5564);
        let flower3=new Product(14,"Lotus","Worship Flower",39,87000);
        let flower4=new Product(15,"Marigold","Festival Flower",4,87900); 

         //Initial data repository insertion
        this.repoManager=mgr; 
        this.repoManager.insert(flower1);
        this.repoManager.insert(flower2);
        this.repoManager.insert(flower3);
        this.repoManager.insert(flower4);
    }

    get=(req, res)=>{
        let allProducts=this.repoManager.getAll();
        res.send(allProducts)
    }

    getById=async (req, res)=>{
         let product= await this.repoManager.getById(id);
         res.send(product);
    }

    post=(req, res)=>{
        this.repoManager.insert(product);
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
