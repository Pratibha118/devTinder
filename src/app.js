const express = require('express');
const { adminAuth } = require('../middlewares/auth');

const app = express();

//request handler

app.use('/', (err, req, res, next) => {
    if (err) {
        res.status(500).send('error occured')
    }
})

app.use('/getDataUser', (req,res) => {
    try {
        throw new Error();
    } catch (e) {
        res.status(500).send('something went wrong')
    }

})


//wild card error handler
app.use('/', (err, req, res, next) => {
    if (err) {
        res.status(500).send('error occured')
    }
})



//Server is listening at port 3000, so that outer world can connect us
app.listen(3000, () => {
    console.log('Server running at port 3000')
});