import express from 'express'
import session from 'express-session';
import  cors    from 'cors';
import router from './routes/routers.js';
import cookieparser from 'cookie-parser';

const app=express();
const PORT = 9000;

var sessionmiddleware={
    secret: "thisismysecrctekey",
    saveUninitialized:true,
    resave: false ,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
      }  
};
app.use(session(sessionmiddleware));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(cookieparser());
//REST API Route Mapping
router(app);

app.listen(PORT, () => {
  console.log(`App Server is Listening on Port ${PORT}`);
});