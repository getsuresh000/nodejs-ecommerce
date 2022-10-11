import express from 'express'
import session from 'express-session';
import  cors    from 'cors';
import router from './routes/routers.js';

const app=express();
const PORT = 8000;

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

//REST API Route Mapping
router(app);

app.listen(PORT, () => {
  console.log(`App Server is Listening on Port ${PORT}`);
});