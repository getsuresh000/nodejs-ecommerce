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
        result= await this.repoManager.Logout(req.params.id);
        res.send(result);
    }

    dashboard=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Dashboard(req,res);
        res.send(result);
    }

    addtocart=async(req,res)=>{
        let result=[];
        result= await this.repoManager.addToCart(req,res);
        res.send(result);
    }
    cartDetails=async(req,res)=>{
        let result=[];
        result= await this.repoManager.cartDetails(req,res);
        res.send(result);
    }
    deleteCart=async(req,res)=>{
        let result=[];
        result= await this.repoManager.deleteCart(req,res);
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