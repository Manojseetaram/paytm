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
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const bcrypt = require('bcrypt');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
app.use(express_1.default.json());
const JWT_PASSWORD = '123123';
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        console.log("sign up r0outer are bshow ");
        const hashedPassword = yield bcrypt.hash(password, 10);
        yield db_1.UserModel.create({ username, password: hashedPassword });
        res.status(201).json({
            message: "You signed up successfully"
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        console.log(username);
        const userExist = yield db_1.UserModel.findOne({ username });
        if (userExist) {
            const token = jsonwebtoken_1.default.sign({ id: userExist._id }, JWT_PASSWORD);
            res.json({
                message: "Sign in successfully",
                token
            });
        }
        else {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
    }
    catch (e) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}));
app.get("/verify", (req, res) => {
    const token = req.headers["authorization"];
    if (token) {
        return res.status(401).json({
            message: "Invalid token, please sign up"
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_PASSWORD);
        res.status(200).json({ message: "Token is valid", user: decoded });
    }
    catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
});
app.listen(4008, () => {
    console.log("Server running on port 4004");
});
