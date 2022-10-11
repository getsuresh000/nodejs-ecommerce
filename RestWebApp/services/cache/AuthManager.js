import User from "../../models/UserModels.js";
import Customer from "../../models/CustomerModels.js";
import Seller from "../../models/SellerModels.js";
import Staff from "../../models/StaffModels.js";
import sql from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import secret from "../../config.js";

export default class AuthManager {
    constructor(){
        this.users=new User();
        this.customers=new Customer();
        this.sellers=new Seller();
        this.staff=new Staff();
    }
    Register = async function (req, res) {
      
        const salt = await bcrypt.genSalt(6);
       
        const password = await bcrypt.hash(req.body.password, salt);
        
        return new Promise((resolve) => {
                let data=req.body;
      
        let command=`call insert_user_customer("${data.email}","${password}","${data.name}","${data.mobile}","${data.location}")`;
                sql.query(command,(err, rows, fields) => {
                    if (err) {
                        resolve({ error: err });
                    } else if(rows){
                        resolve({ message: "Registered Successfully" });
                    }
                })
            })
        }

        Login = async (req) => {
            return  new Promise((resolve) => {
              let data = req.body;
              const password = req.body.password;
              let command = `SELECT * FROM ${this.users.table_name} WHERE email="${data.email}"  AND role="${data.role}"`;
              sql.query(command, async (err, rows, fields) => {
                let userData = {
                  time: Date(),
                  email: data.email,
                };
        
                if (err) {
                  console.log("Error:", err);
                  resolve({ error: "Unable to Login" });
                }
                let allUserStr = JSON.stringify(rows);
                var allUsers = JSON.parse(allUserStr);
                 if (allUsers.length > 0) {
               
                    const hashedPassword = rows[0].password;
                    if (await bcrypt.compare(password, hashedPassword)) {
                   
                  let token = jwt.sign(userData, secret.jwtSecretKey, {
                    expiresIn: 72 * 3600,
                  });
                  userData.token = token;
                  console.log("Login Successful:", userData);
                  
                  resolve({ message: "Login Success" });
                
                    }
                    else {
                        resolve({ error: "Invalid User" });
                    }
                }
  
              });
            });
          };

    Logout = async (id) => {
        let destroy=req.session.destroy;
            return  new Promise((resolve) => {
                
                if(destroy,(err,result)=>{
                    if(err){
                        resolve({error:err})
                    }
                    else if(result){
                    resolve({ result: "Logout Success" });
                    }
                });
            })
    }   
   
};
        
    

