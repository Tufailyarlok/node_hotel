const jwt = require('jsonwebtoken');

const hellojwt=(req,res,next)=>{

    const authorization=req.headers.authorization
    if(!authorization) return res.status(401).json({error:"not found token"})


    //extract the jwt token from the request header
    const token= req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:"Unauthorized"});  
    try{
        //verify the jwt token if match then it return payload
        const payload=jwt.verify(token,process.env.JWT_SECRET);

        req.userPayload=payload
        next();
    } 
    catch(err){
        console.error(err);
        res.status(401).json({error:"invalid token"})
        
    }
}

//function to generate token
const generateToken=(userData)=>{
    return jwt.sign({userData},process.env.JWT_SECRET,{expiresIn:30});
}



module.exports={hellojwt,generateToken};