"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const userDetailSchema = new mongoose_1.default.Schema({
    usr_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user'
    },
    hobbies: [{
            type: String,
        }],
    location: [{
            lat: String,
            lng: String
        }],
    des: {
        type: String,
    }
});
const user_details = mongoose_1.default.model('user_details', userDetailSchema);
module.exports = user_details;
