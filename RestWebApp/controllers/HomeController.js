//Controller

export default class HomeController{
    //constructor Dependency Injection
    constructor(homeMgr){
    
        this.repoManager=homeMgr; 

    }
    


    About=async(req,res)=>{
        res.send({message:"Welcome to AboutUs Page"});
      
    }
    Contactus=async(req,res)=>{
        res.send({message:"Welcome to ContactUs Page"});
      
    }


    
}