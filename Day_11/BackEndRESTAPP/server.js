const express=require('express');
const expressSession=require('express-session');
const cors=require('cors');
const jwt=require('jsonwebtoken');
let jwtSecretKey="softobiz_secret";

const oneDay = 1000 * 60 * 60 * 24;
const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
//HTTP middleware pipline configuration
//set session middleware configuration
var sessionMiddlware=expressSession({
    secret:'cart',
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
});
app.use(sessionMiddlware);

app.get("/api/products",(req, res)=>{
    let products=[
        {"id":12, "title":"Gerbera","description":"Wedding Flower", "unitprice":12, "quantity":9999},
        {"id":13, "title":"Rose","description":"Valentine Flower", "unitprice":283, "quantity":6500},
        {"id":14, "title":"Lily","description":"Delicate Flower", "unitprice":37, "quantity":1500},
        {"id":15, "title":"Jasmine","description":"Smelling Flower", "unitprice":23, "quantity":5200},
        {"id":16, "title":"Lotus","description":"Worship Flower", "unitprice":56, "quantity":5070}
    ];
    res.send(products);
})

app.get("/api/products/:id",(req, res)=>{
   //fetch data from Data Access Logic Layer
   // from database
    let product={"id":12, "title":"Gerbera","description":"Wedding Flower", "unitprice":12, "quantity":9999}
    res.send(product);
})

//Shopping Cart Implementation


app.get("/api/cart",(req, res)=>{  
     if(req.session.cart){
        res.send(req.session.cart);
        res.end();
     }
     else{
        req.session.cart=[];
        res.send(req.session.cart);
        res.end();
    }
});

app.get("/api/addtocart/:id",(req,res)=>{
    req.body
    let item={"productid": req.params.id, quantity:1};
    req.session.cart.push(item);
    res.send(req.session.cart);
    res.end();
} );

app.get("/api/removefromcart/:id",(req,res)=>{ 
    req.session.cart=req.session.cart.filter((data)=>(data.productid !=req.params.id))
    res.send(req.session.cart);
    res.end();
});

app.post("/api/logout",(req,res)=>{
    let authKey="cart";
    let token =req.header(authKey);
    let extractedData=jwt.verify(token,jwtSecretKey)
    if(extractedData.client =="suresh@gmail.com"){

    req.session.destroy((err)=>{
        console.log( "session is destroyed");
        res.send("session is destroyed is explicitly");
        res.end();
    })
}
})

app.post("/api/login",(req, res)=>{
    let user=req.body;
    if(user.email==="suresh@gmail.com" &&
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

app.get("/api/orders",(req, res)=>{
    let authKey="cart";
    let token =req.header(authKey);
    let extractedData=jwt.verify(token,jwtSecretKey)
    if(extractedData.client =="suresh@gmail.com"){
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



app.listen(8000);
console.log("REST API server is listening on port 8000");