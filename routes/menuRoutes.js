const express = require('express');
const router = express.Router(); 
const MenuItem = require('./../models/menu');

router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newMenu=new MenuItem(data);
        const response=await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server issue'});
    }
 })

 router.get('/',async(req,res)=>{
    try{
        const data=await MenuItem.find();
        console.log("data fetched");
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server issue'});
    }
 })

 router.get('/:tasteType', async (req, res) => {
    const tasteType = req.params.tasteType;
    try {
        if (tasteType == 'sour' || tasteType == 'sweet' || tasteType == 'spicy') {
            const response = await MenuItem.find({ taste: tasteType });
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
     const response=await MenuItem.findByIdAndUpdate(id,newdata,{
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
      const response=await MenuItem.findByIdAndDelete(id);
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
