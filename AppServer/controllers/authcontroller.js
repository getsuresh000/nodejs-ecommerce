const sql = require('../models/db');
const bcrypt = require("bcrypt");
var session;
exports.register = async (req, res) => {
    const salt = await bcrypt.genSalt(6);
    const password = await bcrypt.hash(req.body.password, salt);
    const { fullname, email, address, city, state, mobile } = req.body;

    sql.query("insert into users (fullname, email, password, address, city, state, mobile) values(?,?,?,?,?,?,?)", [fullname, email, password, address, city, state, mobile], (err, result) => {
        if (err) {
            res.send("Failed registration!!!");
            console.log(err);
        }
        else {
            res.send("Successfully Registered");
            console.log(req.body);
        }

    })
}


exports.login = async (req, res) => {
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
                session=req.session;
        session.userid=req.body.email;
        console.log(req.session)
                res.send("welcome " + result[0].fullname)
            }


            else {
                res.send("Password incorrect!")
            }
        }
    })

    )
};


  
  exports.logout = (req, res) => {
    req.session.destroy();
    res.send("logout success")
  
    
  };
  