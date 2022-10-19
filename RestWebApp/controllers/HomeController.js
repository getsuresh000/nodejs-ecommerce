//Controller

export default class HomeController{
    //constructor Dependency Injection

    About=async(req,res)=>{
        res.send({message:"Welcome to AboutUs Page"});
      
    }
    Contactus=async(req,res)=>{
        res.send({message:"Welcome to ContactUs Page"});
      
    }


    
}