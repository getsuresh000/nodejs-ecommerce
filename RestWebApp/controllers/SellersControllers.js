
//Controller
export default class SellersController{
    //constructor Dependency Injection
    constructor(sellerMgr){
    
        this.repoManager=sellerMgr; 

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
      
        res.send("sellers inserted successfully");
    }
    put=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Update(req,req.params.id);
        res.send("sellers updated successfully");
    }



    delete=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Delete(req.params.id);
        res.send("sellers deleted successfully");
    }
    dashboard= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.Dashboard(req,res);
        res.send(result); 
    };
}