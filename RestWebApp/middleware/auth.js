

import jwt from "jsonwebtoken";
import secret from "../config.js";



  //constructor Dependency Injection

const auth = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
 
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
  
}
export default {auth}