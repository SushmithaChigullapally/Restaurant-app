const express = require('express');
const router = express.Router(); 
const person = require('./../models/person');

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new person(data);
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server issue' });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await person.find();
        console.log("data fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server issue' });
    }
});

router.get('/:workType', async (req, res) => {
    const workType = req.params.workType;
    try {
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await person.find({ work: workType });
            console.log("Response fetched");
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid workType' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server error" });
    }
});

router.put('/:id',async(req,res)=>{
   try{
    const id=req.params.id;
    const newdata=req.body;
    const response=await person.findByIdAndUpdate(id,newdata,{
        new:true,
        runValidators:true
    })
    if(!response){
        return res.status(404).json({error:'Person not found'});
    }
    console.log("Updated successfully");
    res.status(200).json(response);
   }
   catch(err){
    console.log(err);
        res.status(500).json({ error: "Internal Server error" });
   }

})

router.delete('/:id',async(req,res)=>{
    try{
     const id=req.params.id;
     const response=await person.findByIdAndDelete(id);
     if(!response){
         return res.status(404).json({error:'Person not found'});
     }
     console.log("Deleted successfully");
     res.status(200).json({message:"Deleted successfully"});
    }
    catch(err){
     console.log(err);
         res.status(500).json({ error: "Internal Server error" });
    }
 
 })

module.exports = router;
