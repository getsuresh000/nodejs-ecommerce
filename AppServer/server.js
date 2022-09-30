const express=require('express');
const routes=require('./router');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const jwt=require('jsonwebtoken');
let jwtSecretKey="transflower_secret";
const app=express();
const cors = require('cors');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
let PORT=7000;

app.get("/api/orders1",(req, res)=>{
  let authKey="Authorization";
  let token =req.header(authKey);
  let extractedData=jwt.verify(token,jwtSecretKey)
  if(extractedData.client =="suresh.p@gmail.com"){
      console.log(" procesing request for /api/ordres......");
      let myOrders=[
          { "orderid":543, "date": "30/9/2022", total:6000, status:"intransit"},
          { "orderid":544, "date": "21/9/2022", total:67500, status:"processed"},
          { "orderid":545, "date": "17/9/2022", total:23000, status:"processed"},
          { "orderid":546, "date": "3/8/2022", total:65000, status:"processed"},
          { "orderid":547, "date": "12/7/2022", total:2200, status:"processed"},
          { "orderid":548, "date": "26/12/2022", total:16000, status:"processed"},
      ];
      res.status(200).send(myOrders);
  }
  else{
      res.status(403).send("unauthorized request");
  }
});
app.post("/api/login1",(req, res)=>{
  let user=req.body;
  if(user.email==="suresh.p@gmail.com" &&
      user.password==='12345'){
          //define claim
          let data={
                   time:Date(),
                   client:user.email     
          };
          console.log(data);
          let token=jwt.sign(data,jwtSecretKey);
          console.log(token);
          res.status(200).send(token);
      }
      else{
          res.status(403).send("Invalid User");
      }
});
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
app.listen(PORT,()=>{
    console.log(`App server is listening on port: ${PORT}`);
})