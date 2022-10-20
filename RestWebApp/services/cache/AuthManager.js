
import sql from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import secret from "../../config.js";

export default class AuthManager {


  //constructor Dependency Injection

updatePassword = async(req, res) => {
  let data=req.body;

  let epassword =await bcrypt.hash(data.password,10);
  
  return new Promise((resolve) => {

  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
   return res.send("A token is required for authentication");
  }
 
  try {

    const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
    
    if(decoded.role=='customer' || decoded.role=='seller' || decoded.role=='admin' || decoded.role=='staff'){
      
      let command =   `update users set password="${epassword}" where id=` +decoded.userid;
           
      sql.query(command, (err, rows, fields) => {
        if (err) {
          resolve({ error: err });
        }
        if(!rows){
          resolve("data not exists");
        } else if (rows) {
          
        resolve("updated password of "+decoded.email);
        }
      }) 
    }
    else{
      return res.send("Unauthorized");
    }
    
  } catch (err) {
    return  res.status(401).send("Invalid Token");
  }
 
});
 
};
 


 Dashboard = async(req, res) => {
  return new Promise((resolve) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
   return res.send("A token is required for authentication");
  }
 
  try {
    const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
    
    if(decoded.role=='customer' || decoded.role=='seller' || decoded.role=='admin' || decoded.role=='staff'){
      return res.send("Welcome  "+decoded.email+" "+decoded.role+" "+decoded.userid);
    }
    else{
      return res.send("Unauthorized");
    }
    
  } catch (err) {
    return  res.status(401).send("Invalid Token");
  }
 
});
 
};
   




  Register = async (req, res)=> {
    // Our register logic starts here
    return new Promise((resolve) => {
 try{
      // Get user input
      const  data  = req.body;

  
      // check if user already exist
      // Validate if user exist in our database
    
      let command = `SELECT * FROM users WHERE email="${data.email}"  AND role="${data.role}"`;
    sql.query(command, async (err, rows, fields) => {
    
     
      if (err) {
        
        return res.send({message:err});
      }
      else if(rows.length>0){
        return res.send({message:"Already exists!!!"});
      }
    else if(rows.length==0){
      //Encrypt user password
      let epassword = await bcrypt.hash(data.password, 10);
     
      if (data.role == 'customer') {
        let command = `call insert_user_customer("${data.email}","${epassword}","${data.role}","${data.name}","${data.mobile}","${data.location}")`;
        sql.query(command, (err, rows, fields) => {
          if (err) {
            resolve({ message: err });
          } else if (rows) {
            resolve({ message: "Customer Registered Successfully" });
           
          }
        })
      }
      if (data.role == 'seller') {
        let command = `call insert_user_seller("${data.email}","${epassword}","${data.role}","${data.name}","${data.mobile}","${data.location}")`;
        sql.query(command, (err, rows, fields) => {
          if (err) {
            resolve({ message: err });
          } else if (rows) {
            resolve({ message: "Seller Registered Successfully" });
           
          }
        })
      }

      // return new user
    }
    })
  }
    catch (err) {
      console.log(err);
    }
  });
  };



Login = async (req,res) => {
  return new Promise((resolve) => {
    try{
    let data = req.body;
    const password = req.body.password;
    let command = `SELECT * FROM users WHERE email="${data.email}"  AND role="${data.role}"`;
    sql.query(command, async (err, rows, fields) => {
    
     
      if (err) {
        console.log("Error:", err);
        resolve({ error: "Unable to Login" });
      }

      if (rows.length > 0) {
        const userId=rows[0].id;
        const hashedPassword = rows[0].password;
        if (await bcrypt.compare(password, hashedPassword)) {
        
          let userData = {
            time: Date(),
            userid:userId,
            email: data.email,
           password:hashedPassword,
            role:data.role,
          };
          let accessToken = jwt.sign(userData, secret.ACCESS_TOKEN_SECRET, {
            expiresIn: 72*3600,
          });
          
        res.send(accessToken);
       
        }
       else{
        res.send("Incorrect Password" );
       }
        
      }
      else {
        res.send("Invalid User" );
      }
    });
  }
  catch (err) {
    console.log(err);
  }
});
};

  
Logout = async(req, res) => {
  return new Promise((resolve) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
   return res.send("token is required for authentication");
  }
 
  try {
    const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
    
    if(decoded.role=='customer' || decoded.role=='seller' || decoded.role=='admin' || decoded.role=='staff'){
      jwt.sign(decoded, "" ,{ expiresIn: 1 } , (logout, err) => {
        if (logout) {
          
        res.send({msg : 'You have been Logged Out' });
        } else {
        res.send({msg:'Error'});
        }
        });
    }  
    else{
      return res.send({msg:'Unauthorized'});
    }

    
  } catch (err) {
    return  res.status(401).send("Invalid Token");
  }
 
});
 
};  


Inventory1= async (req,res) => {
  return new Promise((resolve) => {
     if (req.cookies?.jwt) {
       // Destructuring refreshToken from cookie
       let refreshToken = req.cookies.jwt;
  let data=req.body;
      // Verify the token using jwt.verify method
jwt.verify(refreshToken, secret.REFRESH_TOKEN_SECRET,(err,decode)=>{
  if (err) {

    // Wrong Refesh Token
    return res.status(406).json({ message: 'Unauthorized refresh' });
}
else {
  // Correct token we send a new access token
  const accessToken = jwt.sign({
      email: data.email,
      role: data.role
  }, ACCESS_TOKEN_SECRET, {
      expiresIn: 72 * 3600
  });
  return res.json({ accessToken });
}
})
}
else {
  return res.status(406).json({ message: 'Unauthorized' });
}
})
   
        
}


};



