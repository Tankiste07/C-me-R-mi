"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
// Routes
app.use('/api', projectRoutes_1.default);
app.use('/api', taskRoutes_1.default);
const uri = process.env.URI;
mongoose_1.default.connect(uri)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.log('Error connecting to MongoDB', error);
});
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
