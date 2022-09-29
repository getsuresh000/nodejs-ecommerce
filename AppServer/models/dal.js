var session = require('express-session');
const sql = require('./db');
var session;
/* Users Start*/

exports.Users = function () {
    return new Promise(resolve => {
        let command = "SELECT * FROM users";
        sql.query(command, (err, rows, fields) => {
            resolve(rows);
        })
    })
};


exports.UserById = function (id) {
    return new Promise(resolve => {
        let command = "SELECT * FROM  users WHERE id=" + id;
        sql.query(command, (err, rows, fields) => {
            resolve(rows);
        })
    })
};


exports.InsertUser = function (req) {
    return new Promise(resolve => {
        const { fullname, email, password } = req.body;

        sql.query("insert into users set ?", { fullname, email, password }, (err, rows, fields) => {
            resolve(rows);
        })

    })
}
exports.RemoveUser = function (id) {
    return new Promise(resolve => {
        let command = "DELETE FROM users Where id=" + id;
        sql.query(command, (err, rows, fields) => {
            resolve(rows);
        })
    })
}

exports.UpdateUser = function (req) {
    return new Promise(resolve => {
        const { id } = req.params;
        const data = req.body;
        sql.query("update users set ? where id=?", [data, id], (err, rows) => {
            resolve(rows);

        })
    })
}

/* Users End*/

/* Category Start */

exports.Category=function(req){
    return new Promise(resolve=>{
      
        sql.query("select * from categories",(err,result)=>{
           resolve(result)
        })
    
    })
}

exports.CategoryById=function(id){
    return new Promise(resolve=>{
        
        sql.query("select * from categories where id="+id,(err,result)=>{
            resolve(result)
        })
    } )
}

exports.CategoryByName=function(req){
    return new Promise(resolve=>{
        const { name} = req.params;
        sql.query("select * from categories where categoryName=?",[name],(err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                resolve(result)
            }
        })
    } )
}

exports.InsertCategory=function(req){
    return new Promise(resolve => {
        const { categoryName, description} = req.body;

        sql.query("insert into categories set ?", { categoryName, description}, (err, rows, fields) => {
            resolve(rows);
        })

    })
}   

exports.DeleteCategory=function(id){
    return new Promise(resolve => {
        sql.query("delete  from categories where id="+id,(err,result)=>{
            resolve(result)
        })
    } )
}

/* Category End */

/* Products Start*/

exports.Products = function () {
    return new Promise(resolve => {
        let command = "SELECT * FROM products";
        sql.query(command, (err, rows, fields) => {
            resolve(rows);
        })
    })
};


exports.ProductById = function (id) {
    return new Promise(resolve => {
        let command = "SELECT * FROM  products WHERE id=" + id;
        sql.query(command, (err, rows, fields) => {
            resolve(rows);

        })
    })
};




exports.InsertProduct = function (req) {
    return new Promise(resolve => {
        const { categoryId, productName, productPrice } = req.body;

        sql.query("insert into products set ?", { categoryId, productName, productPrice }, (err, rows, fields) => {
            resolve(rows);
        })

    })
}

exports.RemoveProduct = function (id) {
    return new Promise(resolve => {
        let command = "DELETE FROM products Where id=" + id;
        sql.query(command, (err, rows, fields) => {
            resolve(rows);
        })
    })
}

exports.UpdateProduct = function (req) {
    return new Promise(resolve => {
        const { id } = req.params;
        const data = req.body;
        sql.query("update products set ? where id=?", [data, id], (err, rows) => {
            resolve(rows);

        })
    })
}

/* Products End*/

/* Whislist start */


exports.Wishlist = (req,res) => {
    return new Promise(resolve => {
        session=req.session;
        if(session.userid){
            console.log(session.userid)
        sql.query("SELECT * FROM whislist INNER JOIN users ON whislist.userId=users.id WHERE whislist.userId="+ session.userid, (err, result) => {
            resolve(result);
        }
        
        )
    }else{
        console.log("please login")
    }
    

    })
}

exports.InsertWishlist = function (req) {
    return new Promise(resolve => {
        const { userId, productId } = req.body;
        sql.query("insert into whislist set ? ", { userId, productId }, (err, rows, fields) => {
            resolve(rows);
            if(err){
                console.log(err)
               } 
        })
    })
}

exports.RemoveWishlist = function (id) {
    return new Promise(resolve => {
        let command = "DELETE FROM whislist Where id=" + id;
        sql.query(command, (err, rows, fields) => {
            resolve(rows);
        })
    })
}

exports.WishlistByUserId = function (id) {
    return new Promise(resolve => {
        let command = "SELECT * FROM  whislist WHERE userId=" + id;
        sql.query(command, (err, rows, fields) => {
            resolve(rows);

        })
    })
};
/* Whislist End */

/*Orders Start */
exports.InsertOrders = function (req) {
    return new Promise(resolve => {
        const { wishlistid, orderDate, subtotal, discount, shippingFee, total, paymentMethod, status } = req.body;
        sql.query("insert into orders set ? ", { wishlistid, orderDate,subtotal,discount,shippingFee ,total,paymentMethod,status}, (err, rows, fields) => {
            resolve(rows);
           if(err){
            console.log(err)
           }
        })
    })
}

exports.RemoveOrders = function (id) {
    return new Promise(resolve => {
        let command = "DELETE FROM orders Where id=" + id;
        sql.query(command, (err, rows, fields) => {
            resolve(rows);
        })
    })
}

exports.Orders= (req) => {
    return new Promise(resolve => {
        sql.query("select * from orders", (err, result) => {
            resolve(result);
        })
    })
}

exports.UpdateOrders = function (req) {
    return new Promise(resolve => {
        const { id } = req.params;
        const data = req.body;
        sql.query("update orders set ? where id=?", [data, id], (err, rows) => {
            resolve(rows);

        })
    })
}

exports.OrdersById = function (id) {
    return new Promise(resolve => {
        let command = "SELECT * FROM  orders WHERE id=" + id;
        sql.query(command, (err, rows, fields) => {
            resolve(rows);

        })
    })
};

/*Orders End */

