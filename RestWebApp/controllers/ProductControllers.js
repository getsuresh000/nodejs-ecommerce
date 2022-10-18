
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

    insert=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Insert(req);
      
        res.send(result.data);
    }
    addToCart=async(req,res)=>{
        let result=[];
        result= await this.repoManager.addToCart(req,res);
      
        res.send(result);
    }
    put=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Update(req,req.params.id);
        res.send(result.data);
    }



    delete=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Delete(req.params.id);
        res.send("product deleted successfully");
    }
}