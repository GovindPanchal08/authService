# 🔐 Node.js Auth Service

A complete authentication service built with Node.js and Express.js, featuring secure and scalable login solutions.

## 🚀 Features

- User Registration
- User Login
- JWT Auth (Access + Refresh Tokens)
- Email Verification
- Google OAuth2 Login
- Logout + Token Invalidation
- Secure Practices (Rate Limiting, Helmet, CORS, etc.)

## 📡 API Endpoints

| Method | Endpoint                      | Description                 |
|--------|-------------------------------|-----------------------------|
| POST   | `/api/auth/register`          | Register new user           |
| POST   | `/api/auth/login`             | Login existing user         |
| GET    | `/api/auth/verify-email`      | Verify email with token     |
| POST   | `/api/auth/logout`            | Logout user                 |
| POST   | `/api/auth/refresh-token`     | Refresh JWT access token    |
| GET    | `/api/auth/google`            | Google OAuth redirect       |
| GET    | `/api/auth/google/callback`   | OAuth callback handler      |

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Nodemailer
- Google OAuth (Passport.js)
- dotenv, Helmet, CORS, Rate Limiters

## 🔐 Security

- Passwords hashed using `bcrypt`
- Email-based account verification
- Token-based session control
- Rate limiting to prevent brute force
- Helmet + CORS configurations

## 📈 Upcoming Features

- Forgot / Reset Password
- OAuth: GitHub, LinkedIn
- 2FA (OTP/Authenticator App)
- API Documentation (Swagger)
- Public Developer API Integration

## 🛠 Installation

```bash
git clone https://github.com/yourusername/auth-service.git
npm install
npm run dev
