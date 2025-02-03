# TaskFlow

TaskFlow is a full-stack task management application that allows multiple users to create, update, delete, and manage their tasks efficiently. Built with modern web technologies, it provides a seamless experience for organizing tasks.

## 🚀 Tech Stack

- **Frontend:** React (Vite), TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT (JSON Web Token)
- **Real-time Updates:** WebSockets (optional)

## 📌 Features

✅ User Authentication (Sign-up & Sign-in with JWT)

✅ Task CRUD Operations (Create, Read, Update, Delete)

✅ Protected Routes (Only authenticated users can access tasks)

✅ Responsive UI with Dark Mode Toggle

✅ Error Handling & Validation with Zod

✅ Secure API with JWT Middleware

## 📂 Folder Structure
```
TaskFlow/
├── backend/                # Express.js backend
│   ├── prisma/             # Prisma schema & migrations
│   ├── routes/             # API routes (auth, tasks)
│   ├── middleware/         # JWT authentication middleware
│   ├── index.ts            # Express server entry point
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── pages/          # Dashboard, Landing, Auth Pages
│   │   ├── components/     # Reusable UI components
│   │   ├── utils/          # API requests & validation
│   │   ├── App.tsx         # Main app component
│
├── .env                    # Environment variables
├── package.json            # Dependencies & scripts
├── README.md               # Project documentation
```

## 🛠️ Installation & Setup

1. **Clone the repository**
```sh
 git clone https://github.com/BeastxD7/TaskFlow.git
 cd taskflow
```

2. **Set up the backend**
```sh
 cd backend
 npm install
```
- Configure `.env` with your PostgreSQL URL & JWT secret.
- Run Prisma migrations:
```sh
 npx prisma migrate dev
 npx prisma generate
```
- Start the backend server:
```sh
 npm run dev
```

3. **Set up the frontend**
```sh
 cd ../frontend
 npm install
 npm run dev
```

## 🔑 Environment Variables
Create a `.env` file in the backend folder with:
```
DATABASE_URL=postgresql://your_db_url
JWT_SECRET=your_secret_key
SALT=6
```

## 🚀 Running the App
- Open **`http://localhost:5173`** for the frontend.
- The backend runs on **`http://localhost:3000`**.

## 📜 API Endpoints
### **Authentication**
| Method | Endpoint      | Description        |
|--------|-------------|--------------------|
| POST   | /api/signup  | Register new user |
| POST   | /api/signin  | Authenticate user |

### **Tasks**
| Method | Endpoint        | Description       |
|--------|----------------|-------------------|
| GET    | /api/tasks      | Get all tasks    |
| POST   | /api/tasks      | Create a task    |
| PUT    | /api/tasks/:id  | Update a task    |
| DELETE | /api/tasks/:id  | Delete a task    |

## 🎯 Future Enhancements
🔹 Task prioritization (High, Medium, Low)  
🔹 Drag & Drop Task Sorting  
🔹 Real-time Task Updates using WebSockets  

## 🙌 Contributing
Feel free to contribute! Open an issue or submit a PR.

## 📄 License
This project is licensed under the MIT License.

---
Made with ❤️ by Beast

