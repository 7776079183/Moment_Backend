"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const moment_model_1 = __importDefault(require("../_models/moment.model"));
const { validationResult } = require('express-validator');
const fs = __importStar(require("fs"));
const momentController = {
    addMoment: ((req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return resp.status(400).send({ status: "FAIL", errors: errors.array() });
            }
            let moment = new moment_model_1.default({
                image_url: req.file.filename,
                comment: req.body.comment,
                tags: JSON.parse(req.body.tags),
                user_id: req.user._id
            });
            let momentdata = yield moment.save();
            resp.status(200).send({ status: "SUCCESS", message: "Moment added successfuly", data: momentdata });
        }
        catch (error) {
            console.log(error);
            resp.status(500).send({ status: "FAIL", message: "Internal server error" });
        }
    })),
    updateMoment: ((req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body.tags);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return resp.status(400).send({ status: "FAIL", errors: errors.array() });
            }
            let data = {
                image_url: req.file.filename,
                comment: req.body.comment,
                tags: JSON.parse(req.body.tags)
            };
            let moment = yield moment_model_1.default.findOneAndUpdate({ _id: req.body._id }, data);
            yield fs.promises.unlink('_uploads/' + moment.image_url);
            resp.status(200).send({ status: "SUCCESS", message: "Moment updated successfuly" });
        }
        catch (error) {
            console.log(error);
            resp.status(500).send({ status: "FAIL", message: "Internal server error" });
        }
    })),
    deleteMoment: ((req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return resp.status(400).send({ status: "FAIL", errors: errors.array() });
            }
            let moment = yield moment_model_1.default.findOneAndRemove({ _id: req.params._id });
            yield fs.promises.unlink('_uploads/' + moment.image_url);
            if (moment) {
                resp.status(200).send({ status: "SUCCESS", message: "Moment added successfuly", data: moment });
            }
            else {
                resp.status(400).send({ status: "FAIL", message: "Moment id not founds" });
            }
        }
        catch (error) {
            console.log(error);
            resp.status(500).send({ status: "FAIL", message: "Internal server error" });
        }
    })),
    getMoments: ((req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let moments = yield moment_model_1.default.find();
            resp.status(200).send({ status: "SUCCESS", data: moments });
        }
        catch (error) {
            console.log(error);
            resp.status(500).send({ status: "FAIL", message: "Internal server error" });
        }
    }))
};
exports.default = momentController;
