import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { signInSchema, TaskInsertSchema, userSchema } from "./utils/validation";
import { userMiddleware } from "./middlewares/auth.middleware";
import cors from "cors"



const client = new PrismaClient();

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://taskflow-k0es.onrender.com"],
  credentials: true
}));


app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = userSchema.parse(req.body);

    if (password) {
      if (process.env.SALT) {
        const saltValue = parseInt(process.env.SALT);
        const hashedPassword = await bcrypt.hash(password, saltValue);

        const createdUser = await client.user.create({
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
  } catch (error:any) {
    console.log(error);
    

    //check if it is  zod error
    if(error.name == "ZodError"){
      res.status(400).json({
        message:error.issues[0].message,
        error
      });
      return;
    }

    res.status(400).json({
      message: "Error Creating User!",
      error,
    });
  }
});

app.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = signInSchema.parse(req.body);

    const existingUser = await client.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      const isMatched = await bcrypt.compare(password, existingUser.password);

      if (isMatched) {
        const token = jwt.sign(
          { userId: existingUser.id },
          process.env.JWT_SECRET as Secret,
        );

        res.status(200).json({
          message: "success",
          Name: existingUser.name,
          email: existingUser.email,
          token,
        });
      } else {
        res.status(401).json({
          message: "Wrong Password",
        });
      }
    } else {
      res.status(401).json({
        message: "No user exists!",
      });
    }
  } catch (error:any) {
    console.log(error);

    //check if it is  zod error
    if(error.name == "ZodError"){
      res.status(400).json({
        message:error.issues[0].message,
        error
      });
      return;
    }

    res.status(400).json({
      message: "error",
      error,
    });
  }
});

app.post("/api/tasks", userMiddleware, async (req, res) => {
  try {
    const { title, description } = TaskInsertSchema.parse(req.body);

    const userId = req.userId;

    if (!userId) {
      res.status(500).json({
        message: "middleware error with req.user",
      });
      return;
    }

    const createdTask = await client.task.create({
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
  } catch (error:any) {
    console.log(error);

    if(error.name == "ZodError"){
      res.status(400).json({
        message:error.issues[0].message,
        error
      });
      return;
    }

    res.status(400).json({
      message: "Error creating task",
      error,
    });
  }
});

app.get("/api/tasks", userMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

  if (!userId) {
    res.status(500).json({
      message: "middleware error with req.user",
    });
    return;
  }

  const userTasks = await client.task.findMany({
    where: {
      userId,
    },
    select: {
      id:true,
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
  } catch (error:any) {
    console.log(error);
    
 //check if it is  zod error
 if(error.name == "ZodError"){
  res.status(400).json({
    message:error.issues[0].message,
    error
  });
  return;
}

res.status(400).json({
  message: "error",
  error,
});

  }
});

app.patch("/api/tasks/:id", userMiddleware, async (req, res) => {
  try {
    const { completed } = req.body;
    const id = parseInt(req.params.id);

    const updatedTask = await client.task.update({
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
  } catch (error: any) {
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
});

app.delete("/api/tasks/:id", userMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const deletedTask = await client.task.delete({
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
  } catch (error: any) {
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
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});


app.listen(3000, () => {
  console.log("server running in port 3000");
});
