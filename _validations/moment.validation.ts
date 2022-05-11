const { body } = require('express-validator');

const userValidations = {
    addupdateMoment:[
        body('comment').not().isEmpty().withMessage('Comment is required').trim(),
    ],
    deleteMoment:[
        body('comment').not().isEmpty().withMessage('Comment is required').trim(),
    ],
    
}

export default userValidations;
