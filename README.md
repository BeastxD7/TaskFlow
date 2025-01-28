# Task Manager App 🖍

A full-stack **Task Manager App** built with the following technologies:

- **Backend**: Node.js, Express, Prisma, PostgreSQL, JWT, Bcrypt
- **Frontend**: React (with Vite), Tailwind CSS, TypeScript

This app allows users to **create, read, update, and delete tasks** while ensuring authentication and data privacy for multiple users.

---

## 🚀 Features

- **User Authentication**: Secure sign-up and log-in with password hashing (Bcrypt) and token-based authentication (JWT).
- **Task Management**:
  - Create, edit, and delete tasks.
  - View all tasks associated with the logged-in user.
- **Backend Validation**: All inputs validated with **Zod** for secure and clean data handling.
- **Protected Routes**: Only authenticated users can access the task management functionality.

---

## 🛠 Tech Stack

### Backend:

- **Node.js**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL**
- **JWT** for authentication
- **Bcrypt** for password hashing

### Frontend (to be implemented):

- **React** (with Vite for fast development)
- **Tailwind CSS** for styling
- **TypeScript** for type safety

---

## 🔧 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/BeastxD7/task-manager-prisma.git
cd task-manager-prisma
```

### 2. Set Up the Backend

#### Install Dependencies

```bash
cd backend
npm install
```

#### Set Environment Variables

Create a `.env` file in the `backend` directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/task_manager"
JWT_SECRET="your_jwt_secret"
SALT=6
```

#### Run Prisma Migrations

```bash
npx prisma migrate dev
```

#### Start the Server

```bash
npm run dev
```

---

### 3. Set Up the Frontend (Coming Soon)

The React frontend will handle user authentication and task management. Stay tuned for updates!

---

## 📂 Folder Structure

```
task-manager/
├── backend/               # Backend code (Node.js + Express)
│   ├── prisma/            # Prisma schema and migrations
│   ├── src/               # Source files
│   ├── .env               # Environment variables
│   ├── package.json       # Backend dependencies
│   └── index.ts          # Entry point for the backend server
└── frontend/              # Frontend code (React + Vite) [Coming Soon]
```

---

## ✨ How to Contribute

1. Fork the repo.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add feature"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## 🖍 License

This project is licensed under the MIT License.

---

## 📧 Contact

For any questions or suggestions, feel free to reach out at [**shashankdevadiga2003@gmail.com**](mailto\:shashankdevadiga2003@gmail.com).

