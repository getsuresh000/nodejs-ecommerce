
//Controller
export default class CartController{
    //constructor Dependency Injection
    constructor(cartMgr){
    
        this.repoManager=cartMgr; 

    }
    getAll= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.getAll();
        res.send(result.data); 
     
    };
     getByCusId=async (req, res)=>{
        let result=[];
         result= await this.repoManager.getById(req.params.id);
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