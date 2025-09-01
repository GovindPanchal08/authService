---

# 🔐 Node.js Authentication Service

A **production-ready authentication service** built with **Node.js + Express.js**.
It provides secure user authentication using **JWT (Access + Refresh tokens)**, **Email Verification**, and **Google OAuth2**.

This service is designed as a **plug-and-play auth microservice** that can be integrated into any project.

---

## 🚀 Features

✅ User Registration & Login
✅ JWT Authentication (Access + Refresh Tokens)
✅ Email Verification via Tokenized Links
✅ Google OAuth2 Login (Passport.js)
✅ Logout + Token Invalidation
✅ Security Best Practices (Rate Limiting, Helmet, CORS, Sanitization)

🔒 **Advanced Security**

* Password hashing with `bcrypt`
* Secure cookie & token handling
* Rate limiting to prevent brute force
* Helmet for secure HTTP headers
* CORS configured for safe cross-origin requests

---

## 📡 API Endpoints

| Method | Endpoint                        | Description                     |
| ------ | ------------------------------- | ------------------------------- |
| POST   | `/api/auth/register`            | Register new user               |
| POST   | `/api/auth/login`               | Login existing user             |
| GET    | `/api/auth/verify-email/:token` | Verify email with token         |
| POST   | `/api/auth/logout`              | Logout user & invalidate tokens |
| POST   | `/api/auth/refresh-token`       | Refresh JWT access token        |
| GET    | `/api/auth/google`              | Google OAuth redirect           |
| GET    | `/api/auth/google/callback`     | Google OAuth callback handler   |

---

## ⚙️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB + Mongoose
* **Auth:** JWT (jsonwebtoken), Passport.js (Google OAuth)
* **Email Service:** Nodemailer
* **Security:** bcrypt, Helmet, CORS, Rate Limiters, Validator
* **Environment Management:** dotenv

---

## 📈 Upcoming Features

* 🔑 Forgot / Reset Password Flow
* 🔗 More OAuth Providers (GitHub, LinkedIn)
* 🔒 Two-Factor Authentication (OTP/Authenticator App)
* 📘 Swagger/OpenAPI Documentation
* 📡 Public Developer API Integration

---

## 🛠 Installation & Setup

```bash
# Clone repository
git clone https://github.com/yourusername/auth-service.git
cd filename

# Install dependencies
npm install

# Create .env file
touch .env
```

### 🧾 Example `.env` File

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

### 🚀 Run the Project

```bash
# Development
npx nodemon server.js

# Production
npm start
```

---

## 🔄 Auth Flow

```
Register → Verify Email → Login → Issue Tokens → Access Protected Routes → Refresh Tokens → Logout
```

---


## 📡 API Documentation

### 1. 🔑 Register User

```http
POST /api/auth/register
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Responses:**

* `201 Created` – User created successfully
* `400 Bad Request` – Email already exists

---

### 2. 🔐 Sign In

```http
POST /api/auth/login
Content-Type: application/json
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Responses:**

* `200 OK` – Returns access & refresh tokens
* `401 Unauthorized` – Invalid credentials

---

### 3. ♻️ Refresh Token

```http
POST /api/auth/refresh-token
Content-Type: application/json
```

**Request Body:**

```json
{
  "refreshToken": "your_refresh_token"
}
```

**Responses:**

* `200 OK` – Returns new access token
* `403 Forbidden` – Invalid or expired refresh token

---

### 4. 🚪 Logout

```http
POST /api/auth/logout
```

**Description:** Invalidate the refresh token to log out the user.

**Responses:**

* `200 OK` – Logged out successfully

---

### 5. 🌐 Google OAuth

```http
GET /api/auth/google
```

**Description:** Redirects to Google for authentication.

**Responses:**

* `302 Found` – Redirect to Google login page

---

### 6. 📧 Verify Email

```http
GET /api/auth/verify-email/:id
```

**Description:** Verify a user’s email using a unique link sent via email.

**Responses:**

* `200 OK` – Email verified successfully
* `400 Bad Request` – Invalid or expired link

---
---

## 🤝 Contribution

Want to improve this project? Fork it, create a feature branch, and submit a PR 🚀

---

## 📄 License

MIT License – free to use, modify, and distribute.

---

---

👉 Do you want me to also create a **Postman Collection JSON** (import-ready) for your API so anyone testing your repo can hit the endpoints instantly?
