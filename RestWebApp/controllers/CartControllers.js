
//Controller
export default class CartController{
    //constructor Dependency Injection
    constructor(cartMgr){
    
        this.repoManager=cartMgr; 

    }

    getCartByCustomer= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.getCartByCustomer(req,res);
        res.send(result); 
    };
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
    updateCart=async(req,res)=>{
        let result=[];
        result= await this.repoManager.updateCart(req,res);
        res.send(result);
    }
    deleteCart=async(req,res)=>{
        let result=[];
        result= await this.repoManager.deleteCart(req,res);
        res.send(result);
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




    delete=async(req,res)=>{
        let result=[];
        result= await this.repoManager.Delete(req.params.id);
        res.send(result.data);
    }
}