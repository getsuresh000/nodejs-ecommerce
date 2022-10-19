
//Controller
export default class ProductController{
    //constructor Dependency Injection
    constructor(proMgr){
    
        this.repoManager=proMgr; 

    }
    getAll= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.getAll();
        res.send(result); 
    };
     getByCatId=async (req, res)=>{
        let result=[];
         result= await this.repoManager.getByCatId(req.params.id);
         res.send(result);
    }

    addProduct=async(req,res)=>{
        let result=[];
        result= await this.repoManager.addProduct(req,res);
      
        res.send(result);
    }
    updateProduct=async(req,res)=>{
        let result=[];
        result= await this.repoManager.updateProduct(req,res);
        res.send(result);
    }
    addToCart=async(req,res)=>{
        let result=[];
        result= await this.repoManager.addToCart(req,res);
      
        res.send(result);
    }




    deleteProduct=async(req,res)=>{
        let result=[];
        result= await this.repoManager.deleteProduct(req,res);
        res.send(result);
    }
}