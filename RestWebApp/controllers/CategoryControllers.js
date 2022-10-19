
//Controller
export default class CategoryController{
    //constructor Dependency Injection
    constructor(catMgr){
    
        this.repoManager=catMgr; 

    }
    addCategory=async(req,res)=>{
        let result=[];
        result= await this.repoManager.addCategory(req,res);
        res.send(result);
    };
    deleteCategory=async(req,res)=>{
        let result=[];
        result= await this.repoManager.deleteCategory(req,res);
        res.send(result);
    }
    getAll= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.getAll();
        res.send(result); 
     
    };
     getById=async (req, res)=>{
        let result=[];
         result= await this.repoManager.getByCatId(req.params.id);
         res.send(result);
         
    }

    
 


   
}