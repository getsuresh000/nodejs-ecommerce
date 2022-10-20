import sql from '../db/db.js';
import jwt from "jsonwebtoken";
import secret from "../../config.js";

export default class StaffManager {
  
    
    getAllCustomers = async(req, res) => {
        return new Promise((resolve) => {
        const token =
          req.body.token || req.query.token || req.headers["x-access-token"];
      
        if (!token) {
         return res.send("Staff token is required for authentication");
        }
       
        try {
         
          const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
          
          if(decoded.role=='staff'){
      
       let command =   `select * from customers `;
           
          sql.query(command, (err, rows, fields) => {
            if (err) {
              resolve({ error: err });
            }
            if(!rows){
              resolve("data not exists");
            } else if (rows) {
              
            resolve(rows);
            }
          }) 
          }
         
          else{
            return res.send("Unauthorized user");
          }
          
        } catch (err) {
          return  res.status(401).send("Invalid Token");
        }
       
      });
       
      };

      getCustomerById = async(req, res) => {
        return new Promise((resolve) => {
        const token =
          req.body.token || req.query.token || req.headers["x-access-token"];
      
        if (!token) {
         return res.send("Staff token is required for authentication");
        }
       
        try {
         
          const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
          
          if(decoded.role=='staff'){
      
       let command =   `select * from customers where customer_Id="${req.params.id}" `;
           
          sql.query(command, (err, rows, fields) => {
            if (err) {
              resolve({ error: err });
            }
            if(!rows){
              resolve("data not exists");
            } else if (rows) {
              
            resolve(rows);
            }
          }) 
          }
         
          else{
            return res.send("Unauthorized user");
          }
          
        } catch (err) {
          return  res.status(401).send("Invalid Token");
        }
       
      });
       
      }

      deleteCustomerById = async(req, res) => {
        return new Promise((resolve) => {
        const token =
          req.body.token || req.query.token || req.headers["x-access-token"];
      
        if (!token) {
         return res.send("Staff token is required for authentication");
        }
       
        try {
         
          const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
          
          if(decoded.role=='staff'){
      
       let command =   `delete from customers where customer_Id="${req.params.id}" `;
           
          sql.query(command, (err, rows, fields) => {
            if (err) {
              resolve({ error: err });
            }
            if(rows.affectedRows==0){
              resolve("data not exists");
            } else if (rows) {
              
            resolve("Customer deleted");
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

      getAllSellers = async(req, res) => {
        return new Promise((resolve) => {
        const token =
          req.body.token || req.query.token || req.headers["x-access-token"];
      
        if (!token) {
         return res.send("Staff token is required for authentication");
        }
       
        try {
         
          const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
          
          if(decoded.role=='staff'){
      
       let command =   `select * from sellers `;
           
          sql.query(command, (err, rows, fields) => {
            if (err) {
              resolve({ error: err });
            }
            if(!rows){
              resolve("data not exists");
            } else if (rows) {
              
            resolve(rows);
            }
          }) 
          }
         
          else{
            return res.send("Unauthorized user");
          }
          
        } catch (err) {
          return  res.status(401).send("Invalid Token");
        }
       
      });
       
      }
      getSellerById = async(req, res) => {
        return new Promise((resolve) => {
        const token =
          req.body.token || req.query.token || req.headers["x-access-token"];
      
        if (!token) {
         return res.send("Staff token is required for authentication");
        }
       
        try {
         
          const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
          
          if(decoded.role=='staff'){
      
       let command =   `select * from sellers where seller_id="${req.params.id}" `;
           
          sql.query(command, (err, rows, fields) => {
            if (err) {
              resolve({ error: err });
            }
            if(!rows){
              resolve("data not exists");
            } else if (rows) {
              
            resolve(rows);
            }
          }) 
          }
         
          else{
            return res.send("Unauthorized user");
          }
          
        } catch (err) {
          return  res.status(401).send("Invalid Token");
        }
       
      });
       
      }
     
      deleteSellerById = async(req, res) => {
        return new Promise((resolve) => {
        const token =
          req.body.token || req.query.token || req.headers["x-access-token"];
      
        if (!token) {
         return res.send("Staff token is required for authentication");
        }
       
        try {
         
          const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
          
          if(decoded.role=='staff'){
            
          let command =   `SELECT staff_id FROM staff where user_Id="${decoded.userid}" `;
          sql.query(command, (err, rows, fields) => {
            if (err) {
              resolve({ error: err });
            } else if (rows) {
              
              let seller_id=req.params.id;
              let staff_id=rows[0].staff_id;
              sql.query(`delete sellers from sellers join staff where sellers.seller_id=? and staff.staff_id=?`, [seller_id,staff_id], (err, rows, fields) => {
              
                if (err) {
                  resolve({ error: err });
                } 
                if(rows.affectedRows==0){
                  resolve("data not exist");
                }
                else if (rows) {
                  resolve("Seller deleted successfully");
                }
              });
            }
          })
          }
         
          else{
            return res.send("Unauthorized User");
          }
          
        } catch (err) {
          return  res.status(401).send("Invalid Token");
        }
       
      });
       
      };

      getAllOrders = async(req, res) => {
        return new Promise((resolve) => {
        const token =
          req.body.token || req.query.token || req.headers["x-access-token"];
      
        if (!token) {
         return res.send("Staff token is required for authentication");
        }
       
        try {
         
          const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
          
          if(decoded.role=='staff'){
      
       let command =   `select * from orders `;
           
          sql.query(command, (err, rows, fields) => {
            if (err) {
              resolve({ error: err });
            }
            if(!rows){
              resolve("data not exists");
            } else if (rows) {
              
            resolve(rows);
            }
          }) 
          }
         
          else{
            return res.send("Unauthorized user");
          }
          
        } catch (err) {
          return  res.status(401).send("Invalid Token");
        }
       
      });
       
      }

      getOrderById = async(req, res) => {
        return new Promise((resolve) => {
        const token =
          req.body.token || req.query.token || req.headers["x-access-token"];
      
        if (!token) {
         return res.send("Staff token is required for authentication");
        }
       
        try {
         
          const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
          
          if(decoded.role=='staff'){
      
       let command =   `select * from orders where order_id="${req.params.id}" `;
           
          sql.query(command, (err, rows, fields) => {
            if (err) {
              resolve({ error: err });
            }
            if(!rows){
              resolve("data not exists");
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

          
    getAllPayments = async(req, res) => {
      return new Promise((resolve) => {
      const token =
        req.body.token || req.query.token || req.headers["x-access-token"];
    
      if (!token) {
       return res.send("Staff token is required for authentication");
      }
     
      try {
       
        const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
        
        if(decoded.role=='staff'){
    
     let command =   `select * from payments `;
         
        sql.query(command, (err, rows, fields) => {
          if (err) {
            resolve({ error: err });
          }
          if(!rows){
            resolve("data not exists");
          } else if (rows) {
            
          resolve(rows);
          }
        }) 
        }
       
        else{
          return res.send("Unauthorized user");
        }
        
      } catch (err) {
        return  res.status(401).send("Invalid Token");
      }
     
    });
     
    };
/*
    getById = function (id) {
        return new Promise(resolve => {
            let command = `SELECT * FROM  customers WHERE id=` + id;
            sql.query(command, (err, rows, fields) => {
                if (err) {
                    resolve({ data: err });
                }
                else if (rows.length == 0) {
                    resolve({ data: "data not exists" });
                }
                else {
                    resolve({ data: rows });
                }

            })
        })
    };


    Insert = function (req) {
        return new Promise(resolve => {
            const data = req.body;

            sql.query(`insert into staff set ?`, [data], (err, rows, fields) => {
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

    Update = function (req) {
        return new Promise(resolve => {

            const data = req.body;
            const id = req.params.id;

            sql.query(`update staff set ? where category_id=?`, [data, id], (err, rows, fields) => {
                if (err) {
                    resolve({ data: err });
                }
                else if (rows.affectedRows == 0) {
                    resolve({ data: "data not exists" });
                }
                else {
                    resolve({ data:rows.affectedRows+ " Updated Successfully" });

                }
            })
        })
    }
*/
}