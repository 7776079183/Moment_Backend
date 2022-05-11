import * as express  from "express";
import user_route from './user-routes/user.routes';
import moment_route from './moment.route/moment.routes';

const router = express.Router();

router.use('/user',user_route);
router.use('/moment',moment_route);
router.use('/',(req,res)=>{
    res.status(200).send("API")
});

export = router;