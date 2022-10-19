import sql from '../db/db.js';
import jwt from "jsonwebtoken";
import secret from "../../config.js";

export default class CategoryManager {

    addCategory = async(req, res) => {
        return new Promise((resolve) => {
          const token =
          req.body.token || req.query.token || req.headers["x-access-token"];
      
        if (!token) {
         return res.send("Staff token is required for authentication");
        }
       
        try {
         
          const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
          
          if(decoded.role=='staff'){
          let data=req.body;
          let command =   `SELECT staff_id FROM staff where user_Id="${decoded.userid}" `;
          sql.query(command, (err, rows, fields) => {
            if (err) {
              resolve({ error: err });
            } else if (rows) {
              let staff_id=rows[0].staff_id;
              
              let command = `INSERT INTO categories (staff_id, categoryName ,description)
              VALUES("${staff_id}","${data.categoryName}","${data.description}")`;
              sql.query(command, (err, rows, fields) => {
                if (err) {
                  resolve({ error: err });
                } else if (rows) {
                  resolve("Category added successfully" );
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
      
      
    
deleteCategory = async(req, res) => {
    return new Promise((resolve) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
     return res.send("Staff token is required for authentication");
    }
   
    try {
     
      const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
      
      if(decoded.role=='staff'){
  
   let command =   `delete from categories where category_id="${req.params.id}" `;
       
      sql.query(command, (err, rows, fields) => {
        if (err) {
          resolve({ error: err });
        }
        if(!rows){
          resolve("data not exists");
        } else if (rows) {
          
        resolve("Category deleted");
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

  updateCategory = async(req, res) => {
    return new Promise((resolve) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
     return res.send("Staff token is required for authentication");
    }
   
    try {
     
      const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
      
      if(decoded.role=='staff'){
      let data=req.body;
      let command =   `SELECT staff_id FROM staff where user_Id="${decoded.userid}" `;
      sql.query(command, (err, rows, fields) => {
        if (err) {
          resolve({ error: err });
        } else if (rows) {
          
          let cat_id=req.params.id;
          let staff_id=rows[0].staff_id;
          sql.query(`update categories set ? where category_id=? `, [data, cat_id], (err, rows, fields) => {
          
            if (err) {
              resolve({ error: err });
            } 
            else if (rows) {
              resolve("Category updated successfully" );
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


    getAll = () => {
        return new Promise((resolve) => {
            let command = `SELECT * FROM categories;`;
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
            let command = `SELECT * FROM  categories WHERE category_id=` + id;
            sql.query(command, (err, rows, fields) => {
                if (err) {
                    resolve(err);
                }
                else if (rows.length == 0) {
                    resolve("data not exists");
                }
                else {
                    resolve(rows);
                }

            })
        })
    };

}