

import jwt from "jsonwebtoken";
import secret from "../config.js";



  //constructor Dependency Injection

 const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET , (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)
if(user)
  req.role=user
   
    next()
  })
}
export default {verifyToken}