import Product from "../../models/ProductModels.js";
import sql from '../db/db.js';
import jwt from "jsonwebtoken";
import secret from "../../config.js";

export default class ProductManager {
    constructor() {
        this.model = new Product;
    }

    addProduct = async(req, res) => {
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
          let command =   `SELECT seller_id FROM sellers where user_Id="${decoded.userid}" `;
          sql.query(command, (err, rows, fields) => {
            if (err) {
              resolve({ error: err });
            } else if (rows) {
              let seller_id=rows[0].seller_id;
              
              let command = `INSERT INTO products (seller_id,category_id, title ,description,price,quantity)
              VALUES("${seller_id}","${data.category_id}","${data.title}","${data.description}","${data.price}","${data.quantity}")`;
              sql.query(command, (err, rows, fields) => {
                if (err) {
                  resolve({ error: err });
                } else if (rows) {
                  resolve("Product added successfully" );
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
      
      updateProduct = async(req, res) => {
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
          let command =   `SELECT seller_id FROM sellers where user_Id="${decoded.userid}" `;
          sql.query(command, (err, rows, fields) => {
            if (err) {
              resolve({ error: err });
            } else if (rows) {
                let seller_id=rows[0].seller_id;
              let product_id=req.params.id;
              
              sql.query(`update products set ? where product_id=? and seller_id=?`, [data, product_id,seller_id], (err, rows, fields) => {
              
                if (err) {
                  resolve({ error: err });
                } 
                else if (rows.affectedRows==0) {
                    resolve("Product not belongs to seller" );
                  }else if (rows) {
                  resolve("Product updated successfully");
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
     
        
      
    
deleteProduct = async(req, res) => {
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
        let command =   `SELECT seller_id FROM sellers where user_Id="${decoded.userid}" `;
        sql.query(command, (err, rows, fields) => {
          if (err) {
            resolve({ error: err });
          } else if (rows) {
              let seller_id=rows[0].seller_id;
            let product_id=req.params.id;
            
            sql.query(`delete from products where product_id=? and seller_id=?`, [product_id,seller_id], (err, rows, fields) => {
            
              if (err) {
                resolve({ error: err });
              } 
              else if (rows.affectedRows==0) {
                  resolve("Product not belongs to seller" );
                }else if (rows) {
                resolve("Product deleted successfully");
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

    getAll = () => {
        return new Promise((resolve) => {
            let command = `SELECT * FROM ${this.model.table_name};`;
            sql.query(command, (err, rows, field) => {
                if (err) {
                    resolve(err);
                }
                else if (rows.length == 0) {
                    resolve("data not exists");
                }
                else {
                    resolve(rows);
                }
            });
        });
    };

    getByCatId = function (id) {
        return new Promise(resolve => {
            let command = `SELECT * FROM  ${this.model.table_name} WHERE category_id=` + id;
            sql.query(command, (err, rows, fields) => {
                if (err) {
                    resolve(err);
                }
                else if (rows.length == 0) {
                    resolve("data not exists" );
                }
                else {
                    resolve(rows);
                }

            })
        })
    };




}