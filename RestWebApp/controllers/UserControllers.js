
//Controller
export default class UserController{
    //constructor Dependency Injection
    constructor(usermgr){
    
        this.repoManager=usermgr; 

    }
    getAll= async(req, res)=>{  
        let result=[];
        result=await this.repoManager.getAll();
        res.send(result); 
    };

    


    getById=async (req, res)=>{
         let user= await this.repoManager.UserById(id);
         res.send(user);
    }

    post=(req, res)=>{
        this.repoManager.insert(req);
        res.send("User inserted successfully");
    }

    put=(id, user)=>{
        this.repoManager.update(id,user);
        res.send("User updated successfully");
    }

    delete(id){
        this.repoManager.remove(id);
        res.send("User deleted successfully");
    }
}