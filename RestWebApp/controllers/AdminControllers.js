
//Controller
export default class AdminController{
    //constructor Dependency Injection
    constructor(adminMgr){
    
        this.repoManager=adminMgr; 

    }
    getAllCustomers= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.getAllCustomers(req,res);
        res.send(result); 
     
    };
    getCustomerById= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.getCustomerById(req,res);
        res.send(result); 
     
    };
    getAllSellers= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.getAllSellers(req,res);
        res.send(result); 
     
    };
    getSellerById= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.getSellerById(req,res);
        res.send(result); 
     
    };
    addStaff= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.addStaff(req,res);
        res.send(result); 
     
    };
    getAllStaff= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.getAllStaff(req,res);
        res.send(result); 
     
    };
    getAllOrders= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.getAllOrders(req,res);
        res.send(result); 
     
    };
    getOrderById= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.getOrderById(req,res);
        res.send(result); 
     
    };
    getAllPayments= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.getAllPayments(req,res);
        res.send(result); 
     
    };
}