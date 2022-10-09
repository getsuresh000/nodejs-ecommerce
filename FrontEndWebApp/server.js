const express=require('express');
const app=express();
app.use(express.static('public'));
app.get("/", (req, res)=>{
    res.sendFile("index.html");
})
app.listen(7000);
console.log("server Side Javascript Code");
console.log("Website is hosted on web server. Listening on port 7000");
