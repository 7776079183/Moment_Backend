import  {  Request, Response } from 'express';
import Moment from '../_models/moment.model';
const { validationResult } = require('express-validator');
import * as fs from 'fs';
const momentController = {
    addMoment:(async (req:any,resp:Response) =>{ 
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return resp.status(400).send({ status:"FAIL",errors: errors.array() });
            }
            let moment = new Moment({
                image_url:req.file.filename,
                comment:req.body.comment,
                tags:JSON.parse(req.body.tags),
                user_id:  req.user._id
            })
            let momentdata = await moment.save();
            resp.status(200).send({status:"SUCCESS",message:"Moment added successfuly",data:momentdata})
          
        } catch (error) {
            console.log(error);
            resp.status(500).send({status:"FAIL",message:"Internal server error"});
        }
    }),

    updateMoment:(async (req:any,resp:Response) =>{ 
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return resp.status(400).send({ status:"FAIL",errors: errors.array() });
            }
            let data = {
                image_url:req.file.filename,
                comment:req.body.comment,
                tags:JSON.parse(req.body.tags)
            }
            let moment = await Moment.findOneAndUpdate({ _id:req.body._id }, data);
            await fs.promises.unlink('_uploads/'+moment.image_url);
            resp.status(200).send({status:"SUCCESS",message:"Moment updated successfuly"})
          
        } catch (error) {
            console.log(error);
            resp.status(500).send({status:"FAIL",message:"Internal server error"});
        }
    }),
   
    deleteMoment:(async (req:Request,resp:Response) =>{ 
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return resp.status(400).send({ status:"FAIL",errors: errors.array() });
            }
            let moment =  await Moment.findOneAndRemove({_id:req.params._id});
            await fs.promises.unlink('_uploads/'+moment.image_url);
            if(moment){
                resp.status(200).send({status:"SUCCESS",message:"Moment added successfuly",data:moment});
            }else{
                resp.status(400).send({status:"FAIL",message:"Moment id not founds"});
            }
            
        } catch (error) {
            console.log(error);
            resp.status(500).send({status:"FAIL",message:"Internal server error"});
        }
    }),
    getMoments:(async (req:Request,resp:Response) =>{ 
        try {
            let moments =  await Moment.find();
            resp.status(200).send({status:"SUCCESS",data:moments});
        } catch (error) {
            console.log(error);
            resp.status(500).send({status:"FAIL",message:"Internal server error"});
        }
    })
} 

export default momentController;