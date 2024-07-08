//using the middleware to decode the user from the jwt
//the middleware contains three args->req, res,next, basically, next is the function need to be called next after fetching the id from the jwt token, further details in NB
var jwt = require('jsonwebtoken');
const JWT_SECRET="Janhwiisagoodgir$l";
const fetchUser=(req,res,next)=>{
    //get the token from the header
    const token=req.header('auth-token');//auth-token is the name of the header given by us
    //if token not available, th eHeader in the thunderclient
    if(!token){
        res.status(401).send({error:"Please athenticate using a valid token"});
    }
    try{
        const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;//we will get the user then the "next" function will be called
    next();
    }catch(error){
        res.status(401).send({error:"Please athenticate using a valid token"});
    }
}
module.exports=fetchUser;