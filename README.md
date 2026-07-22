# 🦸 Community Hero

> An AI-powered civic issue reporting platform that enables citizens to report, track, and monitor public infrastructure issues while providing administrators with an efficient management dashboard.

Developed during the **Vibe2Ship Hackathon (Coding Ninjas × Google for Developers)** as a practical solution to bridge the communication gap between citizens and local authorities through digital issue reporting. :contentReference[oaicite:0]{index=0}

---

## 📌 Problem Statement

Citizens often struggle to report civic issues such as potholes, damaged streetlights, water leakages, overflowing garbage, and other public infrastructure problems. Traditional complaint systems are slow, difficult to track, and lack transparency.

Community Hero provides a centralized platform where users can submit complaints, monitor progress, and receive updates while enabling administrators to manage reports efficiently.

---

## ✨ Features

### 👤 Citizen Portal

- Secure user registration and login using JWT Authentication
- Report civic issues with images
- Categorize issues
- Track complaint status
- View complaint history
- Responsive dashboard

### 🛡️ Admin Portal

- View all reported issues
- Update complaint status
- Manage users and reports
- Dashboard for issue monitoring

### 🤖 AI Features (Current / Planned)

- AI-assisted issue categorization
- Intelligent report validation
- Future support for duplicate issue detection

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS3
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Cloud Services

- Firebase Hosting
- Cloudinary

---

## 📂 Project Structure

```text
community-hero/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── package.json
│
├── firebase.json
├── .firebaserc
└── README.md
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/GIRIDHARPRABHU06/community-hero.git
```

### Install Dependencies

Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd frontend
npm install
```

### Configure Environment Variables

Create a `.env` file inside the backend directory.

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### Run the Application

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

---

## 📸 Screenshots

> Add screenshots here.

- Home Page
- Login
- Dashboard
- Report Issue
- Admin Dashboard

---

## 🎯 Future Enhancements

- Real-time notifications
- Interactive map integration
- Progressive Web App (PWA)
- Multi-language support
- Email notifications
- AI-powered duplicate complaint detection
- Authority dashboard analytics

---

## 👨‍💻 Author

**Giridhar Prabhu**

GitHub:
https://github.com/GIRIDHARPRABHU06

LinkedIn:
https://linkedin.com/in/giridhar-prabhu-46750031b

---

## 📜 License

This project was built for educational and portfolio purposes during the **Vibe2Ship Hackathon**. :contentReference[oaicite:1]{index=1}
