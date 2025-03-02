const exp  = require('express');
const expressAsyncHandler = require('express-async-handler');
require('dotenv').config();
const axios = require('axios');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const UserApi = exp();
const { requireAuth } = require('@clerk/express')
const User = require('../models/UserModel');


UserApi.use(exp.json())

let stocksCollection;
UserApi.use((req,res,next)=>{
    stocksCollection=req.app.get('stocks');
    next();
})

UserApi.post("/register", expressAsyncHandler(async (req, res) => {
    let { name, email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    const hashedPassword = await bcryptjs.hash(password,6);
    password = hashedPassword;
    const newUser = new User({ name, email, password });
    const createdUser = await newUser.save();
    res.status(201).json(createdUser);
}));

UserApi.post("/login", expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user && (await bcryptjs.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
}));

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

UserApi.get('/all-stocks',expressAsyncHandler(async (req, res) => {
    try {
      // Fetch all stocks from the collection
      const stocks = await stocksCollection.find()// Convert cursor to array
      //console.log("stocks",stocks)
      // Send the fetched stocks back as a response
      res.status(200).send(stocks);
    } catch (error) {
      console.error("Error fetching stocks:", error);
      res.status(500).json({ message: "Failed to retrieve stocks." });
    }
  }));


UserApi.get("/stocks/:symbol",requireAuth({ signInUrl: '/unauthorized' }), expressAsyncHandler(async (req, res) => {
  const { symbol } = req.params;
  //console.log("auth",req.headers.authorization)
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
  
  try {
    const response = await axios.get(url);
    console.log(response.data)
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}));  

UserApi.get('/unauthorized',expressAsyncHandler(async(req,res)=>{
  res.send({message:"Unauthorized request"})
}))

UserApi.get('/stockswithcountry/:activeCountry',expressAsyncHandler(async(req,res)=>{
  const activeCountry = req.params.activeCountry;
  try{
  const stocks = await stocksCollection.find({country:activeCountry})
  //console.log(stocks)
  res.status(200).send({message:"stocks",payload:stocks});
  }catch(error){
    console.error("Error fetching stocks:",error);
    res.status(500).json({ message: "Failed to retrieve stocks." });
  }
}))


module.exports =UserApi;


