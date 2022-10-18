
//Controller
export default class UserController {
    //constructor Dependency Injection
    constructor(sqlMgr) {

        this.repoManager = sqlMgr;

    }
    getAll = async (req, res) => {
        let result = [];
        result = await this.repoManager.getAll();
        res.send(result);
    };
    getById = async (req, res) => {
        let result = [];
        result = await this.repoManager.getById(req.params.id);
        res.send(result);
    }
    currentUser=async(req,res)=>{
        let result = [];
        result = await this.repoManager.currentUser(req,res);
        res.send(result); 
    }

    put = async (req, res) => {
        let result = [];
        result = await this.repoManager.Update(req, req.params.id);

        res.send("User updated successfully")

    }

    delete = async (req, res) => {
        let result = [];
        result = await this.repoManager.Delete(req.params.id);
        res.send("User deleted successfully");
    }
}