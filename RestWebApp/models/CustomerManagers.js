
import sql from '../services/db/db.js';
export default class CustomerManager {
    constructor() {
        this.users = [];
    }

    getAll = function () {
        return new Promise(resolve => {
            let command = "SELECT * FROM customers";
            sql.query(command, (err, rows) => {
                resolve(rows);

            })

        })
    };



    getById = function (id) {
        return new Promise(resolve => {
            let command = "SELECT * FROM  customers WHERE customer_id=" + id;
            sql.query(command, (err, rows, fields) => {
                resolve(rows);
            })
        })
    };


    Insert = function (req) {
        return new Promise(resolve => {
            const  data = req.body;

            sql.query("insert into customers set ?", [data], (err, rows, fields) => {
                resolve(rows);
            })

        })
    }

    Delete = function (id) {
        return new Promise(resolve => {
            let command = "DELETE FROM customers Where customer_id=" + id;
            sql.query(command, (err, rows, fields) => {
                resolve(rows);
            })
        })
    }
    Update = function (req,id) {
        return new Promise(resolve => {
         
            const data= req.body;
        
            sql.query("update customers set ? where customer_id=?",[data,id], (err, rows,fields) => {
                if (err) {
                    console.log(err);
                }
                else {
                    resolve(rows);
                }


            })
        })
    }

}