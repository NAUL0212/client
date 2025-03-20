//p1: import
require('dotenv').config(); // Load biến môi trường từ .env
const mongoose = require('mongoose');

//p2: func connect
async function connect(){
    try{
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('Connect successfully !')
    }catch(error){
        console.log('Connect faild !');
    }
};

module.exports = {connect};