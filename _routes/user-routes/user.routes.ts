import * as express  from "express";
import user from "../../_controllers/user.controller"
const router = express.Router();
import userValidations from '../../_validations/user.validation';
import JWTService from '../../_helpers/jwt-helper';


router.post('/',userValidations.registerUser,user.registerUser);
router.post('/login',userValidations.loginUser,user.loginUser);
router.get('/current-user',JWTService.verfyToken,user.currentUser);

export = router;