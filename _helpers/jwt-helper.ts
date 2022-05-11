import jwt from 'jsonwebtoken';
import  {  Request, Response } from 'express';

const JWTService = {
    createToken: (async (payload:any)=>{
        try {
            let token = await jwt.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: '8h' });
            return token;
        } catch (error) {
            console.log(error);
        }
        
    }),
    verfyToken:((req:any,resp:Response,next:any)=>{
        try {
            var token = req.headers['authorization']?.split(" ")[1];
            if(token){
               let payload = jwt.verify(token, `${process.env.JWT_SECRET}`);
               if(payload){
                req.user = payload;
                next();
               }else{
                resp.status(401).send({status:"FAIL",message:"Invalid user token"}); 
               }
            }else{
                resp.status(401).send({status:"FAIL",message:"Invalid user token"}); 
            }
            
        } catch (error:any) {
            if(error.expiredAt){
                resp.status(401).send({status:"FAIL",message:"User token is expired"}) ;
            }else{
                console.log(error);
                resp.status(401).send({status:"FAIL",message:"Ivalid user token"}) ;
            }   
            
        }
    })
}

export default JWTService;