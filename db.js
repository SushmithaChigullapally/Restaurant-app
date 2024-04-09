const mongoose=require('mongoose');
const mongoUrl='mongodb://localhost:27017/hotel';
mongoose.connect(mongoUrl);

const db=mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to mongodb server");
});
db.on('error',()=>{
    console.error("Error connecting");
});
db.on('disconnected',()=>{
    console.log("disconnected to mongodb server");
});

module.exports=db;