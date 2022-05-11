"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_route_1 = __importDefault(require("./_routes/index.route"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const allowedOrigins = ['http://localhost:4200'];
const options = {
    origin: allowedOrigins
};
app.use((0, cors_1.default)(options));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/', express_1.default.static('_uploads'));
app.use('/api', index_route_1.default);
mongoose_1.default.connect(`${process.env.DB_URI}${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log("Connnected With Database......");
}).catch((error) => {
    console.log(error);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
