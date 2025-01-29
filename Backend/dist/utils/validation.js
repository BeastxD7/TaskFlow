"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskInsertSchema = exports.signInSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string()
        .min(2, "Name must be at least 2 characters long").max(50, "Name cannot exceed 50 characters").regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces (no numbers allowed)"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
});
exports.signInSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
});
exports.TaskInsertSchema = zod_1.z.object({
    title: zod_1.z.string().min(2, "Title must be at least 2 characters long").max(50, "Name cannot exceed 50 characters"),
    description: zod_1.z.string().min(10, "Description must be at least 10 characters long").max(200, "Description cannot exceed 200 characters"),
});
