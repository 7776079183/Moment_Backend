"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    image_url: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
    },
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true });
const Moment = mongoose_1.default.model('moment', userSchema);
module.exports = Moment;
