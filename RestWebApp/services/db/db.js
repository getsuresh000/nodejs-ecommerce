
import mysql from "mysql2";

const conn = mysql.connect({
 
   host: "127.0.0.1",
   user: "root",
   password:  "Suresh@509",
   database: "ecom"
   
})


conn.connect((err)=>{
    if(err) {
     console.log(err);   
    }
    else{
    console.log("Connected Successfully with Database...");
    }
});

export default conn;

