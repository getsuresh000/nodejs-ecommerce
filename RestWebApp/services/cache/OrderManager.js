import Order from "../../models/OrdersModels.js";
import sql from '../db/db.js';

export default class OrderManager {
    constructor() {
        this.model = new Order;
    }

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

    getById = function (id) {
        return new Promise(resolve => {
            let command = `SELECT * FROM  ${this.model.table_name} WHERE order_id=` + id;
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
            let command = `DELETE FROM ${this.model.table_name} Where order_id=` + id;
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

            sql.query(`update ${this.model.table_name} set ? where order_id=?`, [data, id], (err, rows, fields) => {
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