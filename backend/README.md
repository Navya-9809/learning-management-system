# LMS Backend (Node + Express + MongoDB)

## Setup

1. Install dependencies:
   - `cd backend`
   - `npm install`

2. Create `.env` (copy from `backend/.env.example`) and set:
   - `MONGOURL=...`
   - `JWT_SECRET=...`

3. (Optional) Seed an admin user:
   - Set `ADMIN_EMAIL` + `ADMIN_PASSWORD` in `backend/.env`
   - Run `npm run seed:admin`

4. Start server:
   - `npm start`
   - Health check: `GET http://localhost:5000/api/health`

## Auth (JWT + Roles)

### Register (student)
`POST /api/auth/register`

Body:
```json
{ "name": "Navya", "email": "navya@example.com", "password": "Password123" }
```

Response:
```json
{ "token": "JWT...", "user": { "id": "...", "name": "Navya", "email": "navya@example.com", "role": "student" } }
```

### Login
`POST /api/auth/login`

Body:
```json
{ "email": "navya@example.com", "password": "Password123" }
```

### Current user
`GET /api/auth/me` (Protected)

Header:
`Authorization: Bearer <token>`

## Courses

### Create course (Admin only)
`POST /api/courses` (Protected + Admin)

Body:
```json
{
  "title": "React Basics",
  "description": "Learn React from scratch",
  "thumbnail": "https://example.com/thumb.png",
  "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "price": 499
}
```

Notes:
- The backend validates the YouTube URL and stores `youtubeEmbedUrl` like:
  - `embedVideoUrl: https://www.youtube.com/embed/dQw4w9WgXcQ`

### Get all courses
`GET /api/courses`

Optional query params:
- `q` (searches in `title` + `description`)
- `createdBy` (admin/user id)

### Get single course
`GET /api/courses/:id`

### Update course (Admin only)
`PUT /api/courses/:id` (Protected + Admin)

Body (any of):
```json
{ "title": "Updated title", "videoUrl": "https://youtu.be/dQw4w9WgXcQ" }
```

### Delete course (Admin only)
`DELETE /api/courses/:id` (Protected + Admin)

## Enrollment

### Enroll in a course (Student only)
`POST /api/enroll/:courseId` (Protected)

Header:
`Authorization: Bearer <token>`

Response:
```json
{ "message": "Enrolled successfully", "courseId": "..." }
```

### Get my enrollments
`GET /api/users/me/enrollments` (Protected)

## Postman testing steps

1. Create an environment:
   - `baseUrl = http://localhost:5000`
   - `token =` (empty initially)

2. Register or login:
   - `POST {{baseUrl}}/api/auth/login`
   - Copy `token` from response and set `token` in Postman env.

3. For protected requests, add header:
   - `Authorization: Bearer {{token}}`

4. Create an admin:
   - Run `npm run seed:admin`, then login with that admin email/password.

## YouTube embed logic (sample)

The backend converts URLs like:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/shorts/VIDEO_ID`

into:
- `https://www.youtube.com/embed/VIDEO_ID`

This is stored in MongoDB as `youtubeEmbedUrl` and returned in the course API response.
In this backend, the stored field is `embedVideoUrl`.
