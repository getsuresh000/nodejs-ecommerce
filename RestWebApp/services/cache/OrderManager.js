import Order from "../../models/OrdersModels.js";
import sql from '../db/db.js';
import jwt from "jsonwebtoken";
import secret from "../../config.js";

export default class OrderManager {
    constructor() {
        this.model = new Order;
    }

   

placeOrder = async(req, res) => {
    return new Promise((resolve) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
     return res.send("Customer token is required for authentication");
    }
   
    try {
     
      const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
      
      if(decoded.role=='customer'){
     
      let command =   `SELECT cart.id,cart.customer_id,product_id,quantity FROM cart JOIN customers
      ON cart.customer_id = customers.customer_Id where customers.user_Id="${decoded.userid}" and cart.id="${req.params.id}" `;
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
          sql.query(`select seller_id from products where product_id="${product_id}"`,(err, result, fields)=>{
            if (err) {
              resolve({ error: err });
            } else if (result) {
              let seller_id=result[0].seller_id;
              let command = `insert into orders (cart_id,customer_id,product_id,quantity,seller_id,status) values("${cart_id}","${customer_id}","${product_id}","${quantity}","${seller_id}","ordered")`;
              sql.query(command, (err, rows, fields) => {
                if (err) {
                  resolve({ error: err });
                } else if (rows) {
                  sql.query(`call remove_cart_on_orderplaced`);
                  resolve("order placed successfully" );
                }
              });
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
     return res.send("Customer token is required for authentication");
    }
   
    try {
     
      const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
      
      if(decoded.role=='customer'){
      
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
  
     
  requestOrders = async(req, res) => {
    return new Promise((resolve) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
     return res.send("Seller token is required for authentication");
    }
   
    try {
     
      const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
      
      if(decoded.role=='seller'){
      console.log(decoded.userid);
      let command =   `SELECT order_id,product_id,quantity,orders.customer_id,status,name,mobile,location
      FROM orders  
      JOIN sellers
      ON orders.seller_id = sellers.seller_id where sellers.user_Id="${decoded.userid}" `;
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

  updateOrderStatus = async(req, res) => {
    return new Promise((resolve) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
     return res.send("seller token is required for authentication");
    }
   
    try {
     
      const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
      
      if(decoded.role=='seller'){
      let data=req.body;
      let command =   `update orders inner JOIN sellers  ON orders.seller_id = sellers.seller_id
      set status="${data.status}" where order_id="${req.params.id}" and sellers.user_Id="${decoded.userid}" `;
      sql.query(command, (err, rows, fields) => {
        if (err) {
          resolve({ error: err });
        } else if(rows.affectedRows==0){
          resolve("data not exists");
        }else if (rows) {
          
        resolve("Order status updated");
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
     return res.send("Customer token is required for authentication");
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
        let customer_id=rows[0].customer_id;
        let seller_id=rows[0].seller_id;
          let command = `INSERT INTO payments (order_id,customer_id,amount,paymentmode,seller_id)
          VALUES("${order_id}","${customer_id}","${data.amount}","${data.paymentmode}","${seller_id}")`;
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

  paymentHistory = async(req, res) => {
    return new Promise((resolve) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
     return res.send("Seller token is required for authentication");
    }
   
    try {
     
      const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
      
      if(decoded.role=='seller'){
      let data=req.body;
      let id=req.params.id;
      let command =   `SELECT *
      FROM sellers 
       where sellers.user_Id="${decoded.userid}"  `;
      sql.query(command, (err, rows, fields) => {
        if (err) {
          resolve({ error: err });
        } if(rows==0){
          resolve("data not exists for current user");
        }else if (rows) {
          
          let seller_id=rows[0].seller_id;
          let command = `SELECT * FROM payments  join customers where payments.customer_id=customers.customer_Id and payments.seller_id="${seller_id}"`;
          sql.query(command, (err, rows, fields) => {
            if (err) {
              resolve({ error: err });
            } else if(rows.affectedRows==0){
            resolve("data not exists");
            }
            else if (rows) {
             resolve(rows);
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


}