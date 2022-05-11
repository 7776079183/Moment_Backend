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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express = __importStar(require("express"));
const moment_controller_1 = __importDefault(require("../../_controllers/moment.controller"));
const router = express.Router();
const jwt_helper_1 = __importDefault(require("../../_helpers/jwt-helper"));
const moment_validation_1 = __importDefault(require("../../_validations/moment.validation"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './_uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};
const upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
router.post('/', jwt_helper_1.default.verfyToken, upload.single('moment_image'), moment_validation_1.default.addupdateMoment, moment_controller_1.default.addMoment);
router.put('/', jwt_helper_1.default.verfyToken, upload.single('moment_image'), moment_validation_1.default.addupdateMoment, moment_controller_1.default.updateMoment);
router.delete('/:_id', jwt_helper_1.default.verfyToken, moment_controller_1.default.deleteMoment);
router.get('/', jwt_helper_1.default.verfyToken, moment_controller_1.default.getMoments);
module.exports = router;
