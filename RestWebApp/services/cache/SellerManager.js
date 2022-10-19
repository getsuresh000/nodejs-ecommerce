import Seller from "../../models/SellerModels.js"; 
import sql from '../db/db.js';
import jwt from "jsonwebtoken";
import secret from "../../config.js";

export default class SellerManager {
    constructor() {
        this.model = new Seller;
    }

    Dashboard = async(req, res) => {
        return new Promise((resolve) => {
        const token =
          req.body.token || req.query.token || req.headers["x-access-token"];
      
        if (!token) {
         return res.send("A token is required for authentication");
        }
       
        try {
          const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
          
          if(decoded.role=='seller' ){
            return res.send("Welcome  "+decoded.email+"\n"+"Role: "+decoded.role+"\n"+"Id:"+decoded.userid);

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

    getByUserId = function (id) {
        return new Promise(resolve => {
            let command = `SELECT * FROM  ${this.model.table_name} WHERE user_id=` + id;
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
            let command = `DELETE FROM ${this.model.table_name} Where user_id=` + id;
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

            sql.query(`update ${this.model.table_name} set ? where user_id=?`, [data, id], (err, rows, fields) => {
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

}