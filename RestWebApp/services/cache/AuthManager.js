
import sql from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import secret from "../../config.js";

export default class AuthManager {


  //constructor Dependency Injection

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
      return res.send("Welcome  "+decoded.email+" "+decoded.role);
    }
    else{
      return res.send("Unauthorized");
    }
    
  } catch (err) {
    return  res.status(401).send("Invalid Token");
  }
 
});
 
};
   


addToCart = async(req, res) => {
  return new Promise((resolve) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
   return res.send("A token is required for authentication");
  }
 
  try {
   
    const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
    
    if(decoded.role=='customer'){
    let data=req.body;
    let command =   `SELECT customer_Id FROM customers where user_Id="${decoded.userid}" `;
    sql.query(command, (err, rows, fields) => {
      if (err) {
        resolve({ error: err });
      } else if (rows) {
        let customer_id=rows[0].customer_Id;
        
        let command = `INSERT INTO cart (customer_id, product_id ,quantity)
        VALUES("${customer_id}","${data.product_id}","${data.quantity}")`;
        sql.query(command, (err, rows, fields) => {
          if (err) {
            resolve({ error: err });
          } else if (rows) {
            resolve("added successfully" );
          }
        });
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
   
 
cartDetails = async(req, res) => {
  return new Promise((resolve) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
   return res.send("A token is required for authentication");
  }
 
  try {
   
    const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
    
    if(decoded.role=='customer'){
    let data=req.body;
    let command =   `SELECT id,cart.customer_id,product_id,quantity 
    FROM cart  
    JOIN customers
    ON cart.customer_id = customers.customer_Id where customers.user_Id="${decoded.userid}" `;
    sql.query(command, (err, rows, fields) => {
      if (err) {
        resolve({ error: err });
      } else if (rows) {
        
      resolve(rows);
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
 
deleteCart = async(req, res) => {
  return new Promise((resolve) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
   return res.send("A token is required for authentication");
  }
 
  try {
   
    const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
    
    if(decoded.role=='customer'){

 let command =   `delete cart from cart JOIN customers
    ON cart.customer_id = customers.customer_Id where customers.user_Id="${decoded.userid}" and cart.id="${req.params.id}" `;
     
    sql.query(command, (err, rows, fields) => {
      if (err) {
        resolve({ error: err });
      }
      if(!rows){
        resolve("data not exists");
      } else if (rows) {
        
      resolve("cart deleted successfully");
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



placeOrder = async(req, res) => {
  return new Promise((resolve) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
   return res.send("A token is required for authentication");
  }
 
  try {
   
    const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
    
    if(decoded.role=='customer'){
    let data=req.body;
    let id=req.params.id;
    let command =   `SELECT *
    FROM cart  
    JOIN customers
    ON cart.customer_id = customers.customer_Id where customers.user_Id="${decoded.userid}" and cart.id="${id}" `;
    sql.query(command, (err, rows, fields) => {
      if (err) {
        resolve({ error: err });
      } if(rows==0){
        resolve("data not exists for current user");
      }else if (rows) {
        let cart_id=rows[0].id;
        let customer_id=rows[0].customer_id;
        let product_id=rows[0].product_id;
        let quantity=rows[0].quantity;
        let command = `INSERT INTO orders (cart_id,product_id,quantity,customer_id,status)
        VALUES("${cart_id}","${product_id}","${quantity}","${customer_id}","${data.status}")`;
        sql.query(command, (err, rows, fields) => {
          if (err) {
            resolve({ error: err });
          } else if (rows) {
            resolve("order added successfully" );
          }
        });
      
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

 
orderDetails = async(req, res) => {
  return new Promise((resolve) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
   return res.send("A token is required for authentication");
  }
 
  try {
   
    const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
    
    if(decoded.role=='customer'){
    let data=req.body;
    let command =   `SELECT order_id,product_id,quantity,orders.customer_id,status,name,mobile,location
    FROM orders  
    JOIN customers
    ON orders.customer_id = customers.customer_Id where customers.user_Id="${decoded.userid}" `;
    sql.query(command, (err, rows, fields) => {
      if (err) {
        resolve({ error: err });
      } else if (rows) {
        
      resolve(rows);
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


addPayment = async(req, res) => {
  return new Promise((resolve) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
   return res.send("A token is required for authentication");
  }
 
  try {
   
    const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
    
    if(decoded.role=='customer'){
    let data=req.body;
    let id=req.params.id;
    let command =   `SELECT *
    FROM orders  
    JOIN customers
    ON orders.customer_id = customers.customer_Id where customers.user_Id="${decoded.userid}" and orders.order_id="${id}" `;
    sql.query(command, (err, rows, fields) => {
      if (err) {
        resolve({ error: err });
      } if(rows==0){
        resolve("data not exists for current user");
      }else if (rows) {
        
        let order_id=rows[0].order_id;
      
        let command = `INSERT INTO payments (order_id,amount,paymentmode)
        VALUES("${order_id}","${data.amount}","${data.paymentmode}")`;
        sql.query(command, (err, rows, fields) => {
          if (err) {
            resolve({ error: err });
          } else if (rows) {
            resolve("payment added successfully" );
          }
        });
      
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
            resolve({ message: "Registered Successfully" });
           
          }
        })
      }
      if (data.role == 'seller') {
        let command = `call insert_user_seller("${data.email}","${epassword}","${data.role}","${data.name}","${data.mobile}","${data.location}")`;
        sql.query(command, (err, rows, fields) => {
          if (err) {
            resolve({ message: err });
          } else if (rows) {
            resolve({ message: "Registered Successfully" });
           
          }
        })
      }
      if (data.role == 'staff') {
        let command = `call insert_user_staff("${data.email}","${epassword}","${data.role}","${data.name}","${data.mobile}","${data.location}")`;
        sql.query(command, (err, rows, fields) => {
          if (err) {
            return res.status(403).json(err);
          } else if (rows) {
            return res.status(200).json({ message: "Registered Successfully" });
   
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


  Register1 = async function (req, res) {
    

    const salt = await bcrypt.genSalt(6);

    const password = await bcrypt.hash(req.body.password, salt);

    return new Promise((resolve) => {
      let data = req.body;
      if (data.role == 'customer') {
        let command = `call insert_user_customer("${data.email}","${password}","${data.role}","${data.name}","${data.mobile}","${data.location}")`;
        sql.query(command, (err, rows, fields) => {
          if (err) {
            resolve({ error: err });
          } else if (rows) {
            
            let userData = {
              time: Date(),
              email: data.email,
             
              role:data.role,
            };
            let accessToken = jwt.sign(userData, secret.ACCESS_TOKEN_SECRET, {
              expiresIn: 72 * 3600,
            });
            userData.token = accessToken;
            res.status(201).json({message:userData});
          }
        })
      }
      if (data.role == 'seller') {
        let command = `call insert_user_seller("${data.email}","${password}","${data.role}","${data.name}","${data.mobile}","${data.location}")`;
        sql.query(command, (err, rows, fields) => {
          if (err) {
            resolve({ error: err });
          } else if (rows) {
            resolve({ message: "Registered Successfully" });
          }
        })
      }
      if (data.role == 'staff') {
        let command = `call insert_user_staff("${data.email}","${password}","${data.role}","${data.name}","${data.mobile}","${data.location}")`;
        sql.query(command, (err, rows, fields) => {
          if (err) {
            resolve({ error: err });
          } else if (rows) {
            resolve({ message: "Registered Successfully" });
          }
        })
      }

    })
  }



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
            expiresIn: 72 * 3600,
          });
          
        res.send(accessToken);
        console.log(accessToken);
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


Logout = async (id) => {
  let destroy = req.session.destroy;
  return new Promise((resolve) => {

    if (destroy, (err, result) => {
      if (err) {
        resolve({ error: err })
      }
      else if (result) {
        resolve({ result: "Logout Success" });
      }
    });
  })
}   


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



