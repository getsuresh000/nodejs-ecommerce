
import sql from '../db/db.js';
export default class ProductManager {
    constructor() {
        this.users = [];
    }

    getAll = function () {
        return new Promise(resolve => {
            let command = "SELECT * FROM products";
            sql.query(command, (err, rows) => {
                resolve(rows);

            })

        })
    };



    getById = function (id) {
        return new Promise(resolve => {
            let command = "SELECT * FROM  products WHERE id=" + id;
            sql.query(command, (err, rows, fields) => {
                resolve(rows);
            })
        })
    };


    Insert = function (req) {
        return new Promise(resolve => {
            const { data} = req.body;

            sql.query("insert into products set ?", [data], (err, rows, fields) => {
                resolve(rows);
            })

        })
    }

    Delete = function (id) {
        return new Promise(resolve => {
            let command = "DELETE FROM products Where id=" + id;
            sql.query(command, (err, rows, fields) => {
                resolve(rows);
            })
        })
    }
    Update = function (req) {
        return new Promise(resolve => {
         
            const {data}= req.body;
            const {id}=req.params.id;
        
            sql.query("update products set ? where id=?",[data,id], (err, rows,fields) => {
                if (err) {
                    console.log(err);
                }
                else {
                    resolve(rows);
                }


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

