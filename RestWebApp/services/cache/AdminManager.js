import sql from '../db/db.js';
import jwt from "jsonwebtoken";
import secret from "../../config.js";

export default class AdminManager {
  
    
    getAllCustomers = async(req, res) => {
        return new Promise((resolve) => {
        const token =
          req.body.token || req.query.token || req.headers["x-access-token"];
      
        if (!token) {
         return res.send("Admin token is required for authentication");
        }
       
        try {
         
          const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
          
          if(decoded.role=='admin'){
      
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
         return res.send("Admin token is required for authentication");
        }
       
        try {
         
          const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
          
          if(decoded.role=='admin'){
      
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
         return res.send("Admin token is required for authentication");
        }
       
        try {
         
          const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
          
          if(decoded.role=='admin'){
      
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
         return res.send("Admin token is required for authentication");
        }
       
        try {
         
          const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
          
          if(decoded.role=='admin'){
      
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
            return res.send("Unauthorized");
          }
          
        } catch (err) {
          return  res.status(401).send("Invalid Token");
        }
       
      });
       
      };
    
      getAllStaff = async(req, res) => {
        return new Promise((resolve) => {
        const token =
          req.body.token || req.query.token || req.headers["x-access-token"];
      
        if (!token) {
         return res.send("Admin token is required for authentication");
        }
       
        try {
         
          const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
          
          if(decoded.role=='admin'){
      
       let command =   `select * from staff `;
           
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

      getAllOrders = async(req, res) => {
        return new Promise((resolve) => {
        const token =
          req.body.token || req.query.token || req.headers["x-access-token"];
      
        if (!token) {
         return res.send("Admin token is required for authentication");
        }
       
        try {
         
          const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
          
          if(decoded.role=='admin'){
      
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
         return res.send("Admin token is required for authentication");
        }
       
        try {
         
          const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
          
          if(decoded.role=='admin'){
      
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
    };