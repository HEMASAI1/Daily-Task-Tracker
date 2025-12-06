# Daily Task Tracker 📝

A simple, friendly daily to-do web app built with the MERN stack — perfect for keeping track of tasks, toggling statuses, and organizing your day.

## 🚀 What is this

Daily Task Tracker is a minimal but functional full-stack application that lets you:

- Create tasks with titles  
- Mark tasks as **Pending** or **Completed**  
- Delete tasks  
- Filter tasks by status (All / Pending / Completed)  
- See quick stats (total, pending, done)  

It’s a clean demo of using **MongoDB**, **Express.js**, **React**, and **Node.js** — a great starting point if you want to learn or showcase REST APIs + full-stack CRUD.

## 📂 Folder structure

<img width="671" height="178" alt="image" src="https://github.com/user-attachments/assets/a7addfc2-ba1f-4ae8-9a79-e81c406a8cab" />


## 🧰 Tech stack & dependencies

**Frontend**  
- React (with Vite)  
- Fetch API for HTTP calls  
- CSS for styling & minimal animations  

**Backend**  
- Node.js + Express  
- MongoDB with Mongoose for persistence  
- RESTful APIs (CRUD on tasks)  

## 🔧 Setup & run locally

> Make sure you have Node.js and npm installed, and an instance of MongoDB (local or Atlas).

bash
# 1. Clone repo
git clone https://github.com/HEMASAI1/Daily-Task-Tracker.git
cd Daily-Task-Tracker

# 2. Install dependencies & start backend
cd server
npm install
# create .env file with MONGO_URI (e.g. mongodb://127.0.0.1:27017/task_tracker)
npm run dev

# 3. In a new terminal, start frontend
cd ../client
npm install
npm run dev

Frontend will open at http://localhost:5173 and talk to backend at http://localhost:5000.

✅ What works now (features)

Add tasks

Delete tasks

Toggle status (pending ↔ completed)

Filter tasks by status

Live task-count summary (total, pending, done)

Persistent storage with MongoDB

🎯 Future improvements (TODOs)

Add edit task capability

Add user authentication (sign-in, multi-user support)

Add due dates & reminders for tasks

Improve UI (drag-and-drop, animations, theme switcher)

Deploy live (frontend + backend + database)

🧑‍💻 Why I built it

I created this project to solidify my understanding of building a full-stack MERN app with REST APIs — from database schema to UI and real network calls.
It’s a neat sandbox for practicing CRUD operations, state management, async calls, and backend-frontend integration.

📄 License & Use

This project is open-source. Feel free to fork, modify, or build on it for learning or demo purposes.
If you publish changes or improvements, feel free to mention/credit the original author.
