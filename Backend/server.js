const exp = require("express");
const app = exp();
require('dotenv').config();//process.env
const mongoose = require("mongoose");
const UserApi = require('./Api/UserApi');
const axios= require('axios');
const cors = require('cors');
const port = process.env.PORT || 4000;

app.use(cors());
const Stock = require('./models/StockSchema')
//db connection
mongoose.connect(process.env.DBURL)
    .then(() => {
        app.listen(port, () => console.log(`server listening on port ${port}..`))
        console.log("DB connection success")
    })
    .catch(err => console.log("Error in DB connection ", err))

    
//body parser middleware
app.use(exp.json())
//connect API rouites
app.use('/api', (req, res, next) => {
    req.app.set('stocks', Stock); // Setting the stocks collection in the app context
    next();
}, UserApi);

app.use((err,req,res,next)=>{
    res.send({status:'error',message:err.message})
    })
