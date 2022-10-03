const express=require('express');
const expressSession=require('express-session');
const cors=require('cors');

const oneDay = 1000 * 60 * 60 * 24;
const app=express();

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
        {"id":1, "title":"Gerbera","description":"Wedding Flower", "unitprice":12, "quantity":9999},
        {"id":2, "title":"Rose","description":"Valentine Flower", "unitprice":283, "quantity":6500},
        {"id":3, "title":"Lily","description":"Delicate Flower", "unitprice":37, "quantity":1500},
        {"id":4, "title":"Jasmine","description":"Smelling Flower", "unitprice":23, "quantity":5200},
        {"id":5, "title":"Lotus","description":"Worship Flower", "unitprice":56, "quantity":5070}
    ];
    res.send(products);
})


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

app.get("/api/checkout",(req,res)=>{
    req.session.destroy((err)=>{
        console.log( "session is destroyed");
        res.send("session is destroyed is explicitly");
        res.end();
    })
})


app.listen(8000);
console.log("REST API server is listening on port 8000");