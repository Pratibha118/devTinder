const express = require('express');

const app = express();

//request handler
app.get("/",(req,res) =>{
    res.send("Hello from server...")
})

app.get("/hello",(req,res) =>{
    res.send("Hello...")
})

app.get("/test",(req,res) =>{
    res.send("testing...")
})







//Server is listening at port 3000, so that outer world can connect us
app.listen(3000, () => {
    console.log('Server running at port 3000')
});