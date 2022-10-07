import express from 'express'
import expressSession from 'express-session';
import  cors    from 'cors';
import router from './routes/router.js';
const oneDay = 1000 * 60 * 60 * 24;
const app=express();

var sessionMiddlware=expressSession({
    secret:'cart',
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
});

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(sessionMiddlware);

//REST API Route Mapping
router(app);

app.listen(8000);
console.log("REST API server is listening on port 8000");