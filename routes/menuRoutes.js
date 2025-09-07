const express = require('express');
const menuRoute=express.Router();
const menuModel=require('../models/menu');

menuRoute.post('/' ,async (req, res) => {
    try {
      const data = req.body;  // single object
      const savedData = await menuModel.create(data);  // save one document
      console.log("Saved:", savedData);
      res.status(200).json(savedData);
    } catch (err) {
      console.error("Error in POST /menu:", err);
      res.status(400).json({ error: err.message });
    }
  });
  
menuRoute.get('/', async (req, res) => {
    try {
      // Await the query to get real documents, not the query object
      const data = await menuModel.find({});
      console.log("Data fetched:", data);
      res.status(200).json(data);
    } catch (err) {
      console.error(" GET /menu error:", err);
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports=menuRoute;