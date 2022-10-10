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
        res.send("login successfully");
    }
    logout = (req, res) => {
        req.session.destroy();
        res.send("logout success")
    }
    
}