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
exports.signup = void 0;
const validation_1 = require("../utils/validation");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const client = new client_1.PrismaClient();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = validation_1.userSchema.parse(req.body);
        if (password) {
            if (process.env.SALT) {
                const saltValue = parseInt(process.env.SALT);
                const hashedPassword = yield bcrypt_1.default.hash(password, saltValue);
                const createdUser = yield client.user.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword,
                    },
                    select: {
                        name: true,
                        email: true,
                    },
                });
                res.status(201).json({
                    message: "User Created Succesfully!",
                    user: createdUser,
                });
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Error Creating User!",
            error,
        });
    }
});
exports.signup = signup;
