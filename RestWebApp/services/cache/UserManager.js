
import sql from '../db/db.js';
import jwt from "jsonwebtoken";
import secret from "../../config.js";

export default class UserManager {


    currentUser = async(req, res) => {
        return new Promise((resolve) => {

        const token =
          req.body.token || req.query.token || req.headers["x-access-token"];
      
        if (!token) {
        res.send("A token is required for authentication");
        }
       
        try {
          const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
          
          if(decoded.role=='customer'){
            return res.send(decoded.email);
          }
          else{
            return res.send("Unauthorized");
          }
          
        } catch (err) {
          return  res.status(401).send("Invalid Token");
        }
       
      });
       
      };

    getAll = function () {
        return new Promise(resolve => {
            let command = "SELECT * FROM users order by id desc";
            sql.query(command, (err, rows) => {
                resolve(rows);

            })

        })
    };



    getById = function (id) {
        return new Promise(resolve => {
            let command = "SELECT * FROM  users WHERE id=" + id;
            sql.query(command, (err, rows, fields) => {
                resolve(rows);
            })
        })
    };

         
       
    Update = function (req,id) {
        return new Promise(resolve => {
         
            const data= req.body;
        
            sql.query("update users set ? where id=?",[data,id], (err, rows,fields) => {
                if (err) {
                    console.log(err);
                }
                else {
                    resolve(rows);
                }


            })
        })
    }
    Delete = function (id) {
        return new Promise(resolve => {
            let command = "DELETE FROM users Where id=" + id;
            sql.query(command, (err, rows, fields) => {
                resolve(rows);
            })
        })
    }


    /*
        insert(user){
            this.users.push(user);
        }
    
        update(id, productTobeUpdated){
            this.products=products.filter((product)=>(product.id !==id));
            this.product.push(productTobeUpdated);
        }
    
    
        getById(id){
            let foundProduct=this.products.find((product)=>(product.id ==id));
            return foundProduct;
        }
    
        delete(id){   
            this.products=products.filter((product)=>(product.id !==id));
            return this.products;
        }
        */
}


