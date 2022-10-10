
import sql from '../services/db/db.js';
import bcrypt from 'bcrypt';
var session;

export default class AuthManager {

    Register = async function (req, res) {
        const salt = await bcrypt.genSalt(6);
        const password = await bcrypt.hash(req.body.password, salt);
        const { name, address, mobile, role } = req.body;
        const {email}=req.body;
        sql.query("select * from users where email=? ", {email}, (async (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            else if (result.length == 0) {
                sql.query("insert into users set ?", { name, email, password, address, mobile, role }, (err, rows) => {
                    if (err) {
                        return err
                    } else {
                        return rows;
                    }
                })
            }
            else if (result.length > 0) {
                return "User already exists!!"
            }
}))}

    Login = async (req, res) => {
        const { email } = req.body;

        const password = req.body.password;
        sql.query("select * from users where email=? ", [email], (async (err, result) => {

            if (result.length > 0) {
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

}