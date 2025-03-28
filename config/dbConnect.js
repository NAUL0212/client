//p1: import
const mongoose = require('mongoose');

//p2: func connect
const dbConnect = async() =>{
    try{
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('Connect successfully !')
    }catch(error){
        console.log('Connect faild !');
    }
};

module.exports = dbConnect;




