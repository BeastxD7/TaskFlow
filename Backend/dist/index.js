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
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const validation_1 = require("./utils/validation");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const cors_1 = __importDefault(require("cors"));
const client = new client_1.PrismaClient();
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://taskflow-k0es.onrender.com"],
    credentials: true
}));
app.post("/api/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                res.status(200).json({
                    message: "User Created Succesfully!",
                    user: createdUser,
                });
            }
        }
    }
    catch (error) {
        console.log(error);
        //check if it is  zod error
        if (error.name == "ZodError") {
            res.status(400).json({
                message: error.issues[0].message,
                error
            });
            return;
        }
        //check if it is prisma email error
        if (error.name == "PrismaClientKnownRequestError") {
            if (error.meta.target[0] == "email") {
                res.status(400).json({
                    message: "Email Already Exists!",
                    error
                });
            }
            return;
        }
        res.status(400).json({
            message: "Error Creating User!",
            error,
        });
    }
}));
app.post("/api/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                const token = jsonwebtoken_1.default.sign({ userId: existingUser.id }, process.env.JWT_SECRET);
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
        //check if it is  zod error
        if (error.name == "ZodError") {
            res.status(400).json({
                message: error.issues[0].message,
                error
            });
            return;
        }
        res.status(400).json({
            message: "error",
            error,
        });
    }
}));
app.post("/api/tasks", auth_middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = validation_1.TaskInsertSchema.parse(req.body);
        const userId = req.userId;
        if (!userId) {
            res.status(500).json({
                message: "middleware error with req.user",
            });
            return;
        }
        const createdTask = yield client.task.create({
            data: {
                title,
                description,
                userId,
            },
            select: {
                title: true,
                description: true,
                completed: true,
            },
        });
        res.status(201).json({
            message: "Task created",
            task: createdTask,
        });
    }
    catch (error) {
        console.log(error);
        if (error.name == "ZodError") {
            res.status(400).json({
                message: error.issues[0].message,
                error
            });
            return;
        }
        res.status(400).json({
            message: "Error creating task | Email already exists!",
            error,
        });
    }
}));
app.get("/api/tasks", auth_middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(500).json({
                message: "middleware error with req.user",
            });
            return;
        }
        const userTasks = yield client.task.findMany({
            where: {
                userId,
            },
            select: {
                id: true,
                title: true,
                description: true,
                completed: true,
            },
        });
        if (!userTasks) {
            res.status(200).json({
                message: "No Tasks yet!",
            });
            return;
        }
        res.status(200).json({
            message: "Tasks Found",
            tasks: userTasks,
        });
        return;
    }
    catch (error) {
        console.log(error);
        //check if it is  zod error
        if (error.name == "ZodError") {
            res.status(400).json({
                message: error.issues[0].message,
                error
            });
            return;
        }
        res.status(400).json({
            message: "error",
            error,
        });
    }
}));
app.patch("/api/tasks/:id", auth_middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { completed } = req.body;
        const id = parseInt(req.params.id);
        const updatedTask = yield client.task.update({
            where: {
                id,
                userId: req.userId,
            },
            data: {
                completed,
            },
        });
        res.status(200).json({
            message: "Task updated",
            task: updatedTask,
        });
    }
    catch (error) {
        if (error.meta.cause == "Record to update not found.") {
            res.status(403).json({
                message: "No tasks with Found!",
            });
            return;
        }
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
}));
app.delete("/api/tasks/:id", auth_middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const deletedTask = yield client.task.delete({
            where: {
                id,
                userId: req.userId,
            },
            select: {
                title: true,
                completed: true,
            },
        });
        res.status(200).json({
            message: "Task deleted",
            task: deletedTask,
        });
    }
    catch (error) {
        if (error.meta.cause == "Record to delete does not exist.") {
            res.status(403).json({
                message: "No task found to Delete!",
            });
            return;
        }
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
}));
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Server is running" });
});
app.listen(3000, () => {
    console.log("server running in port 3000");
});
