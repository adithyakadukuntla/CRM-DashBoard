const jwt=require('jsonwebtoken');
require('dotenv').config()

 const verifyToken=(req,res,next)=>{
    //get bearer token
    let bearerToken=req.headers.authorization;

    console.log("bearer token",bearerToken)
    if(!bearerToken){
        return res.send({message:"Unauthorized access..plz login "})
    }
    let token=bearerToken.split(' ')[1];
    try{
        const options = { algorithms: ['RS256'] };
    let decodedToken=jwt.verify(token,process.env.CLERK_PUBLISHABLE_KEY,options)
    next()
    }catch(err){
        console.log("err",err)
        next(err)  
    }
}

module.exports=verifyToken;