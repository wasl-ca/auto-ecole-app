# 🚘 ATTT Driving School Automation App

Full-stack web application that automates the process of managing students and registering them for driving exams via the [ATTT website](https://www.attt.com.tn/autoecole.php?code_menu=74).

Built with:

- 🧠 MongoDB
- ⚙️ Express.js
- 🧭 Puppeteer (for automation)
- 💻 React.js
- 🐳 Docker & Docker Compose

---

## 📦 Features

- 🔐 Login to ATTT with your official credentials
- 📅 Scrape and display available driving exam dates
- 👨‍🎓 Manage your student database (CRUD)
- 📝 Register students for driving exams (code / conduite)
- 🌍 Web interface for managing everything

---

## 📂 Project Structure

```
project-root/
├── backend/               # Express API + Puppeteer logic
│   ├── puppeteer/         # Automation logic (scraping, form-filling)
│   ├── models/            # Mongoose models (Student)
│   ├── routes/            # API endpoints
│   ├── server.js          # Entry point
│   └── .env               # Secrets
│
├── frontend/              # React app
│   └── src/               # Components, Pages, etc.
│
├── mongo-init/ (optional) # Seed MongoDB with test data
├── docker-compose.yml     # Container orchestration
├── README.md              # This file
└── .env                   # Environment variables
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/attt-driving-school-app.git
cd attt-driving-school-app
```

### 2. Setup Environment Variables

Create a `.env` file inside `backend/`:

```env
MONGO_URI=mongodb://mongo:27017/atttapp
ATTT_USERNAME=your_username
ATTT_PASSWORD=your_password
```

> ⚠️ Do not commit your credentials — `.env` is in `.gitignore`.

### 3. Start the App (Dev or Prod)

Using Docker:

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: Port `27017`

---

## 🧠 MongoDB Data Model

### `Student`

```json
{
  "name": "Ali Ben Salah",
  "nationalId": "0123456789",
  "phone": "55123456",
  "examType": "code", // or "conduite"
  "preferredDate": "2024-06-25"
}
```

---

## 🧭 Puppeteer Automation

- `login.js`: logs into ATTT platform
- `getExamDates.js`: scrapes exam sessions
- `registerStudent.js`: submits registration form

> Runs headlessly in Docker (Chromium dependencies installed).

---

## 🧪 API Endpoints

| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| GET    | `/api/students`       | List students                  |
| POST   | `/api/students`       | Add student                    |
| PUT    | `/api/students/:id`   | Update student                 |
| DELETE | `/api/students/:id`   | Delete student                 |
| GET    | `/api/exam-dates`     | Get available exam dates       |
| POST   | `/api/register`       | Register student to an exam    |

---

## 🧰 Tech Stack

| Layer     | Technology         |
|-----------|--------------------|
| Frontend  | React.js           |
| Backend   | Node.js + Express  |
| Database  | MongoDB + Mongoose |
| Automation| Puppeteer          |
| Infra     | Docker + Compose   |

---

## 🔒 Security Notice

- Your credentials are stored securely in environment variables.
- Do **NOT** share or publish them.
- Consider using secret managers in production environments.

---

## 📬 Future Improvements

- ✅ Authentication (login to your app)
- 📈 Analytics dashboard (exam status, success rate)
- 📧 Email/SMS notifications
- 🌍 Multilingual interface

---

## 👨‍💻 Author

Built with ❤️ by Asma Elfaleh
