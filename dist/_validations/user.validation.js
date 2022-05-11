"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { body } = require('express-validator');
const user_model_1 = __importDefault(require("../_models/user.model"));
const userValidations = {
    registerUser: [
        body('email').isEmail().withMessage('Please enter valid email-ID').trim(),
        body('full_name').not().isEmpty().withMessage('Full name is required').trim(),
        body('city').not().isEmpty().withMessage('City is required').trim(),
        body('password').isLength({ min: 7 }).withMessage('Strong password required').trim(),
        body('email').custom((value) => {
            return user_model_1.default.findOne({ email: value }).then(user => {
                if (user) {
                    return Promise.reject('E-mail already registered please try to login');
                }
            });
        }),
    ],
    loginUser: [
        body('email').not().isEmpty().withMessage('Email-ID is required').trim(),
        body('password').not().isEmpty().withMessage('Password is required').trim(),
    ]
};
exports.default = userValidations;
