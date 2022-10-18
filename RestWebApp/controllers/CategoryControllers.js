
//Controller
export default class CategoryController{
    //constructor Dependency Injection
    constructor(catMgr){
    
        this.repoManager=catMgr; 

    }
    getAll= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.getAll();
        res.send(result.data); 
     
    };
     getById=async (req, res)=>{
        let result=[];
         result= await this.repoManager.getByCatId(req.params.id);
         res.send(result.data);
         
    }

    insert=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Insert(req);
        res.send(result.data);
    }
    put=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Update(req,req.params.id);
        res.send(result.data);
    }



    delete=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Delete(req.params.id);
        res.send(result.data);
    }
}