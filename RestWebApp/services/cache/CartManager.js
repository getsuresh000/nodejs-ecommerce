import Cart from "../../models/CartModels.js";
import sql from '../db/db.js';
import jwt from "jsonwebtoken";
import secret from "../../config.js";


export default class CartManager {
    constructor() {
        this.model = new Cart;
    }

    addToCart = async(req, res) => {
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
          let command =   `SELECT customer_Id FROM customers where user_Id="${decoded.userid}" `;
          sql.query(command, (err, rows, fields) => {
            if (err) {
              resolve({ error: err });
            } else if (rows) {
              let customer_id=rows[0].customer_Id;
             
              let command = `INSERT INTO cart (customer_id, product_id ,quantity)
              VALUES("${customer_id}","${req.params.id}","${data.quantity}")`;
              sql.query(command, (err, rows, fields) => {
                if (err) {
                  resolve({ error: err });
                } else if(rows.affectedRows==0){
                  resolve("data not exist");
                }else if (rows) {
                  resolve("added to cart successfully" );
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
         return res.send("Customer token is required for authentication");
        }
       
        try {
         
          const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
          
          if(decoded.role=='customer'){
         
          let command =   `SELECT id,product_id,quantity 
          FROM cart  
          JOIN customers
          ON cart.customer_id = customers.customer_Id where customers.user_Id="${decoded.userid}" `;
          sql.query(command, (err, rows, fields) => {
            if (err) {
              resolve({ error: err });
            } else if(rows.affectedRows==0){
              resolve("data not exist")
            }else if (rows) {
              
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
         return res.send("Customer token is required for authentication");
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
            if(rows.affectedRows==0){
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
      
    getAll = () => {
        return new Promise((resolve) => {
            let command = `SELECT * FROM ${this.model.table_name}`;
            sql.query(command, (err, rows, field) => {
                if (err) {
                    resolve({ data: err });
                }
                else if (rows.length == 0) {
                    resolve({ data: "data not exists" });
                }
                else {
                    resolve({ data: rows });
                }
            });
        });
    };

    getById = function (id) {
        return new Promise(resolve => {
            let command = `SELECT * FROM  ${this.model.table_name} WHERE customer_id=` + id;
            sql.query(command, (err, rows, fields) => {
                if (err) {
                    resolve({ data: err });
                }
                else if (rows.length == 0) {
                    resolve({ data: "data not exists" });
                }
                else {
                    resolve({ data:rows});
                }

            })
        })
    };


    Insert = function (req) {
        return new Promise(resolve => {
            const data = req.body;

            sql.query(`insert into ${this.model.table_name} set ?`, [data], (err, rows, fields) => {
                if (err) {
                    resolve({ data: err });
                }

                else {
                    resolve({ data: "Inserted Successfull" });

                }
            })

        })
    }

    Delete = function (id) {
        return new Promise(resolve => {
            let command = `DELETE FROM ${this.model.table_name} Where id=` + id;
            sql.query(command, (err, rows, fields) => {
                if (err) {
                    resolve({ data: err });
                }
                else if (rows.affectedRows == 0) {
                    resolve({ data: "data not exists" });
                }
                else {
                    resolve({data:rows.affectedRows+ " records deleted" });
                }

            })
        })
    }

   
  updateCart = async(req, res) => {
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
      let command =   `update cart join customers on cart.customer_id=customers.customer_id set quantity="${data.quantity}" where cart.id="${req.params.id}" and customers.user_Id="${decoded.userid}" `;
      sql.query(command, (err, rows, fields) => {
        if (err) {
          resolve({ error: err });
        } else  if(rows.affectedRows==0){
              resolve("data not exist");
            }
            else if (rows) {
              resolve("Cart updated successfully");
            }
          });
        }
     
      else{
        return res.send("Unauthorized User");
      }
      
    } catch (err) {
      return  res.status(401).send("Invalid Token");
    }
   
  });
   
  };



}