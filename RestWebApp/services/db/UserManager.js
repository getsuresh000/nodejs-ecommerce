
import sql from './db.js';
import bcrypt from 'bcrypt';
var session;
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


    Insert = async function(req,res) {
            const salt = await bcrypt.genSalt(6);
            const password = await bcrypt.hash(req.body.password, salt);
            const { name, email,address,mobile,role } = req.body;
            return new Promise(resolve => {
 
            sql.query("insert into users set ?", { name, email, password,address,mobile,role }, (err, rows) => {
               if(err){
              resolve(err)
               }else{
                resolve(rows);
               }
            })
            })   
    }
 
    Login = async (req, res) => {
        const { email } = req.body;
    
        const password = req.body.password;
        sql.query("select * from users where email=? ", [email], (async (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            else if (result.length == 0) {
                res.send("User not found!!")
            }
            else if (result.length > 0) {
                const hashedPassword = result[0].password;
                if (await bcrypt.compare(password, hashedPassword)) {
                    session = req.session;
                    session.userid = result[0].id;
                    console.log(req.session)
                }
    
    
                else {
                    res.send("Password incorrect!")
                }
            }
        })
    
        )
    };
    Delete = function (id) {
        return new Promise(resolve => {
            let command = "DELETE FROM users Where id=" + id;
            sql.query(command, (err, rows, fields) => {
                resolve(rows);
            })
        })
    }
    Update = function (req,id) {
        return new Promise(resolve => {
         
            const [data1]= req.body;

        
            sql.query("update users set ? where id=?",[data1,id], (err, rows,fields) => {
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


