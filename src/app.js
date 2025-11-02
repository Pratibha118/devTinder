const express = require('express');
const { adminAuth } = require('../middlewares/auth');

const app = express();


app.use('/admin',adminAuth)

// app.use("/",(req,res,next) =>{
//     console.log('first')
//     next();
// })
app.get('/multi',(req,res,next) =>{
    console.log('second')
    res.send("Hello from multi...2")
}
)

app.get('/admin/getData',(req,res,next) =>{
    console.log('second')
    res.send("Data send")
}
)

//request handler
app.get("/",(req,res) =>{
    res.send("Hello from server...")
})

//get query params while adding params in url
app.get("/hello",(req,res) =>{
    console.log(req.query)
    res.send("Hello...")
})

//get dymanic routes
app.get("/user/:userID/:name",(req,res) =>{
    console.log(req.params)
    res.send("parmas...")
})

//regex
app.get(/.*fly$/,(req,res) =>{
    res.send("parmas...")
})

//regex
app.get(/a/,(req,res) =>{
    res.send("simple parmas...")
})

app.post("/add",async (req,res) =>{
    console.log('post call ')
    res.send("Hello...post")
})

app.delete("/delete",async (req,res) =>{
    console.log('delete call ')
    res.send("Hello...delete")
})

app.get("/test",(req,res) =>{
    res.send("testing code...")
})

//Server is listening at port 3000, so that outer world can connect us
app.listen(3000, () => {
    console.log('Server running at port 3000')
});