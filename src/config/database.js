const mongoose = require('mongoose');

const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://pratibhafullstack_db_user:05mjb5uF5ke26J93@cluster0.etb04wq.mongodb.net/devTinderDB')
}

module.exports = {connectDB}