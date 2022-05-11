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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWTService = {
    createToken: ((payload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let token = yield jsonwebtoken_1.default.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: '8h' });
            return token;
        }
        catch (error) {
            console.log(error);
        }
    })),
    verfyToken: ((req, resp, next) => {
        var _a;
        try {
            var token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (token) {
                let payload = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
                if (payload) {
                    req.user = payload;
                    next();
                }
                else {
                    resp.status(401).send({ status: "FAIL", message: "Invalid user token" });
                }
            }
            else {
                resp.status(401).send({ status: "FAIL", message: "Invalid user token" });
            }
        }
        catch (error) {
            if (error.expiredAt) {
                resp.status(401).send({ status: "FAIL", message: "User token is expired" });
            }
            else {
                console.log(error);
                resp.status(401).send({ status: "FAIL", message: "Ivalid user token" });
            }
        }
    })
};
exports.default = JWTService;
