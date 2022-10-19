
//Controller
export default class StaffController{
    //constructor Dependency Injection
    constructor(staffMgr){
    
        this.repoManager=staffMgr; 

    }
    getAllCustomers= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.getAllCustomers(req,res);
        res.send(result); 
     
    };
    deleteCustomerById= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.deleteCustomerById(req,res);
        res.send(result); 
     
    };
    getAllSellers= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.getAllSellers(req,res);
        res.send(result); 
     
    };
    deleteSellerById= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.deleteSellerById(req,res);
        res.send(result); 
     
    };
    getAllOrders= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.getAllOrders(req,res);
        res.send(result); 
     
    };

     getOrderById=async (req, res)=>{
        let result=[];
         result= await this.repoManager.getOrderById(req,res);
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
        res.send(result.data);
    }



    delete=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Delete(req.params.id);
        res.send(result.data);
    }
}