
//Controller
export default class CategoryController{
    //constructor Dependency Injection
    constructor(catMgr){
    
        this.repoManager=catMgr; 

    }
    getAll= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.getAll();
        res.send(result); 
    };
     getById=async (req, res)=>{
        let result=[];
         result= await this.repoManager.getById(req.params.id);
         res.send(result);
    }

    insert=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Insert(req);
      
        res.send("category inserted successfully");
    }
    put=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Update(req,req.params.id);
        res.send("category updated successfully");
    }



    delete=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Delete(req.params.id);
        res.send("category deleted successfully");
    }
}