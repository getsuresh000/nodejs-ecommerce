//Controller


export default class AuthController{
    //constructor Dependency Injection
    constructor(authMgr){
    
        this.repoManager=authMgr; 

    }
    
    register=async(req,res)=>{
      let result=[];
        result= await this.repoManager.Register(req,res);
        res.send(result);
      
    }
    login=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Login(req,res);
        res.send(result);
    }

    logout = async(req, res) => {
        let result=[];
        result= await this.repoManager.Logout(req,res);
        res.send(result);
    }

    dashboard=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Dashboard(req,res);
        res.send(result);
    }
    updatePassword=async(req,res)=>{
        let result=[];
        result= await this.repoManager.updatePassword(req,res);
        res.send(result);
    }

  
    placeOrder=async(req,res)=>{
        let result=[];
        result= await this.repoManager.placeOrder(req,res);
        res.send(result);
    }
    orderDetails=async(req,res)=>{
        let result=[];
        result= await this.repoManager.orderDetails(req,res);
        res.send(result);
    }
    addPayment=async(req,res)=>{
        let result=[];
        result= await this.repoManager.addPayment(req,res);
        res.send(result);
    }
}