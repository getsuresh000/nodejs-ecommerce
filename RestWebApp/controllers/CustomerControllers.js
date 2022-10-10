
//Controller
export default class CustomerController{
    //constructor Dependency Injection
    constructor(cusMgr){
    
        this.repoManager=cusMgr; 

    }
    getAll= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.getAll();
        res.send(result); 
    };
     getByUserId=async (req, res)=>{
        let result=[];
         result= await this.repoManager.getByUserId(req.params.id);
         res.send(result);
    }

    insert=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Insert(req);
      
        res.send(result.data);
    }
    put=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Update(req,req.params.id);
        res.send("customers updated successfully");
    }



    delete=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Delete(req.params.id);
        res.send("customers deleted successfully");
    }
}