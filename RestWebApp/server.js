import express from 'express'
import session from 'express-session';

import cookieParser from "cookie-parser";
import  cors    from 'cors';
import router from './routes/router.js';
const app=express();


app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    resave: false ,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
      }  
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(cookieParser);

//REST API Route Mapping
router(app);
app.listen(8000);
console.log("REST API server is listening on port 8000");