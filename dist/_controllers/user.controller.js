"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../_models/user.model"));
const password_helper_1 = __importDefault(require("../_helpers/password.helper"));
const jwt_helper_1 = __importDefault(require("../_helpers/jwt-helper"));
const { validationResult } = require('express-validator');
const UserController = {
    registerUser: ((req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return resp.status(400).send({ status: "FAIL", errors: errors.array() });
            }
            let usr = new user_model_1.default({
                full_name: req.body.full_name,
                city: req.body.city,
                email: req.body.email,
                password: yield password_helper_1.default.encryptPassword(req.body.password)
            });
            let userdata = yield usr.save();
            resp.status(200).send({ status: "SUCCESS", data: userdata });
        }
        catch (error) {
            console.log(error);
            resp.status(500).send({ status: "FAIL", message: "Internal server error" });
        }
    })),
    loginUser: ((req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return resp.status(400).send({ status: "FAIL", errors: errors.array() });
            }
            let usr = yield user_model_1.default.findOne({ email: req.body.email });
            if (usr) {
                if (yield password_helper_1.default.checkPassword(req.body.password, usr.password)) {
                    let jwt_token = yield jwt_helper_1.default.createToken({ _id: usr._id });
                    resp.status(200).send({ status: "SUCCESS", message: "Login successFul", token: jwt_token });
                }
                else {
                    resp.status(401).send({ status: "FAIL", message: "Wrong password login failed" });
                }
            }
            else {
                resp.status(400).send({ status: "FAIL", message: `User ${req.body.email} dosen't exist` });
            }
        }
        catch (error) {
            console.log(error);
            resp.status(500).send({ status: "FAIL", message: "Internal server error" });
        }
    })),
    currentUser: ((req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let currentUser = yield user_model_1.default.findOne({ _id: req.user._id });
            resp.status(200).send({ status: "SUCCESS", message: "token verified", user: currentUser });
        }
        catch (error) {
            console.log(error);
            resp.status(500).send({ status: "FAIL", message: "Internal server error" });
        }
    }))
};
exports.default = UserController;
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
