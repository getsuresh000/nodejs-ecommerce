const express=require('express');
const routes=require('./router');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const app=express();
const cors = require('cors');
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//session middleware
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    resave: false ,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
      }  
}));

  // cookie parser middleware
app.use(cookieParser());
routes(app);
app.listen(7000,()=>{
    console.log("App server is listening on port: 7000");
})