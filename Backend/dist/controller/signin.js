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
const validation_1 = require("../utils/validation");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client = new client_1.PrismaClient();
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = validation_1.signInSchema.parse(req.body);
        const existingUser = yield client.user.findFirst({
            where: {
                email,
            },
        });
        if (existingUser) {
            const isMatched = yield bcrypt_1.default.compare(password, existingUser.password);
            if (isMatched) {
                const token = jsonwebtoken_1.default.sign({ userId: existingUser.id }, process.env.JWT_SECRET, {
                    expiresIn: "24h",
                });
                res.status(200).json({
                    message: "success",
                    Name: existingUser.name,
                    email: existingUser.email,
                    token,
                });
            }
            else {
                res.status(401).json({
                    message: "Wrong Password",
                });
            }
        }
        else {
            res.status(401).json({
                message: "No user exists!",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "error",
            error,
        });
    }
});
