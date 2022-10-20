//Controller


export default class orderController{
    //constructor Dependency Injection
    constructor(orderMgr){
    
        this.repoManager=orderMgr; 

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
    requestOrders=async(req,res)=>{
        let result=[];
        result= await this.repoManager.requestOrders(req,res);
        res.send(result);
    }
  updateOrderStatus = async(req, res) => {
    let result=[];
    result= await this.repoManager.updateOrderStatus(req,res);
    res.send(result);
}
    addPayment=async(req,res)=>{
        let result=[];
        result= await this.repoManager.addPayment(req,res);
        res.send(result);
    }
    paymentHistory = async(req, res) => {
        let result=[];
        result= await this.repoManager.paymentHistory(req,res);
        res.send(result);
    }
}