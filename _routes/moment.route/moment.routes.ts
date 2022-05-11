import * as express  from "express";
import moment from "../../_controllers/moment.controller"
const router = express.Router();
import JWTService from '../../_helpers/jwt-helper';
import momentValidation from '../../_validations/moment.validation';
import multer from 'multer';

const storage = multer.diskStorage({    
    destination: function (req, file, cb) {
    cb(null, './_uploads/')
},
    filename: function (req: any, file: any, cb: any) {
        cb(null, Date.now() + "_" + file.originalname)
    }
});

const fileFilter = (req: any,file: any,cb: any) => {
    if(file.mimetype === "image/jpg"  || 
        file.mimetype ==="image/jpeg"  || 
        file.mimetype ===  "image/png"){
        
        cb(null, true);
    }else{
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
    }
}
const upload = multer({storage: storage, fileFilter : fileFilter});

router.post('/',JWTService.verfyToken,upload.single('moment_image'),momentValidation.addupdateMoment,moment.addMoment);
router.put('/',JWTService.verfyToken,upload.single('moment_image'),momentValidation.addupdateMoment,moment.updateMoment);
router.delete('/:_id',JWTService.verfyToken,moment.deleteMoment);
router.get('/',JWTService.verfyToken,moment.getMoments);



export = router;