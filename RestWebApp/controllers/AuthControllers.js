//Controller
export default class AuthController{
    //constructor Dependency Injection
    constructor(authMgr){
    
        this.repoManager=authMgr; 

    }
    
    register=async(req,res)=>{
      let result=[];
        result= await this.repoManager.Register(req);
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
    
}