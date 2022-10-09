
import sql from '../db/db.js';

export default class UserManager {
    constructor() {
        this.users = [];
    }

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


