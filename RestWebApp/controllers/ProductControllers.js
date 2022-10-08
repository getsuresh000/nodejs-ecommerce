
//Controller
export default class UserController{
    //constructor Dependency Injection
    constructor(sqlMgr){
    
        this.repoManager=sqlMgr; 

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
      
        res.send("User inserted successfully");
    }
    put=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Update(req,req.params.id);
        res.send(result);
    }



    delete=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Delete(req.params.id);
        res.send(result);
    }
}