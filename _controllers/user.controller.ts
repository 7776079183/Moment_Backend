import  {  Request, Response } from 'express';
import User from '../_models/user.model';
import security from '../_helpers/password.helper';
import JWTService from '../_helpers/jwt-helper';
const { validationResult } = require('express-validator');

const UserController = {

    registerUser:(async (req:Request,resp:Response) =>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
             return resp.status(400).send({ status:"FAIL",errors: errors.array() });
            }
            let usr = new User({
                full_name:req.body.full_name,
                city:req.body.city,
                email:req.body.email,
                password:  await security.encryptPassword(req.body.password)
            })
            let userdata = await usr.save();
            resp.status(200).send({status:"SUCCESS",data:userdata}) 
        } catch (error) {
            console.log(error);
            resp.status(500).send({status:"FAIL",message:"Internal server error"}) ;
        }
    }),

    loginUser:(async (req:Request, resp: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
             return resp.status(400).send({ status:"FAIL",errors: errors.array() });
            }
            let usr:any = await User.findOne({email:req.body.email});
            if(usr){
                if(await security.checkPassword(req.body.password,usr.password)){
                    let jwt_token = await JWTService.createToken({_id:usr._id});
                    resp.status(200).send({status:"SUCCESS",message:"Login successFul",token:jwt_token}); 
                }else{
                    resp.status(401).send({status:"FAIL",message:"Wrong password login failed"}); 
                }
            }else{
                resp.status(400).send({ status:"FAIL",message:`User ${req.body.email} dosen't exist` });
            }
            
        } catch (error) {
            console.log(error);
            resp.status(500).send({status:"FAIL",message:"Internal server error"}) ;
        }
    }),
    
    currentUser:(async (req:any, resp: Response) => {
        try {
            let currentUser = await User.findOne({_id:req.user._id});
            resp.status(200).send({status:"SUCCESS",message:"token verified",user:currentUser});
        } catch (error) {
            console.log(error);
            resp.status(500).send({status:"FAIL",message:"Internal server error"});
        }
    })
}


export default UserController;


/* 

db.students.aggregate([
{
$lookup:
{
from : “sports”,
localField : “pupil”,
foreignField : “winner”,
as : “games”
} } ] )

*/

//db.users.aggregate([{$lookup:{ from:'user_details',localField:'_id', foreignField:'usr_id',as:'user_details' }}])