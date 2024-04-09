const express=require('express');
const app=express();
const db=require('./db');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.listen(3000);

app.get('/',function(req,res){
    res.send("Hello");
 })

const perrou=require('./routes/personRoutes.js');
app.use('/person',perrou);

const menrou=require('./routes/menuRoutes.js');
app.use('/menu',menrou);
 
 

 

 