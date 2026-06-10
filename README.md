## Age Calculator Pro 🕰️

A complete full-stack Age Calculator web application with a modern, professional UI featuring glassmorphism and dark/light mode functionality.

## Project Overview

This project is a precision age calculator that determines exactly how old a person is in Years, Months, and Days. It features a responsive, beautifully animated frontend built with vanilla web technologies, paired with a robust Node.js/Express backend that handles the precise date calculations and validations to ensure accuracy.

## Features ✨

- **Exact Age Calculation**: Calculates exact age in Years, Months, and Days.
- **Modern UI/UX**: Premium glassmorphism design with vibrant gradients and animated background shapes.
- **Dark/Light Mode**: User-toggleable theme with preferences saved to `localStorage`.
- **Responsive Design**: Flawless experience across mobile, tablet, and desktop devices.
- **Server-side Validation**: Robust backend validation preventing future dates and invalid inputs.
- **Smooth Animations**: Number counting animations and subtle micro-interactions.
- **Real-time Loading States**: Spinner animations while fetching data from the API.

## Technologies Used 🛠️

**Frontend:**
- HTML5 (Semantic Structure)
- CSS3 (Custom Variables, Flexbox, Grid, Glassmorphism)
- Vanilla JavaScript (DOM manipulation, Fetch API)
- FontAwesome (Icons)
- Google Fonts (Outfit)

**Backend:**
- Node.js
- Express.js (REST API creation)
- CORS (Cross-Origin Resource Sharing)

## Folder Structure 📁

```text
codealpaha_task1/
│
├── backend/
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js           # Express API and calculation logic
│
├── frontend/
│   ├── css/
│   │   └── styles.css      # UI styling, responsive design
│   ├── js/
│   │   └── script.js       # Client-side validation and API interaction
│   └── index.html          # Main application interface
│
└── README.md               # Project documentation
```

## Installation Steps 🚀

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd codealpaha_task1
```

### 2. Running Backend
Navigate to the backend directory, install dependencies, and start the server:

```bash
cd backend
npm install
node server.js
```
The backend server will run on `http://localhost:5000`.

### 3. Running Frontend
You can run the frontend by simply opening the `index.html` file in your preferred browser:
- Double-click `frontend/index.html`
- OR use an extension like VS Code Live Server.

## API Endpoints 🔌

### `POST /api/calculate-age`

Calculates age based on the provided date of birth.

**Request Body (JSON):**
```json
{
  "dob": "1990-05-15"
}
```

**Success Response (200 OK):**
```json
{
  "years": 34,
  "months": 0,
  "days": 26,
  "message": "Calculation successful"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Date of birth cannot be in the future"
}
```
## Screenshot
<img width="811" height="513" alt="Screenshot 2026-06-10 113038" src="https://github.com/user-attachments/assets/de719c55-a913-444d-986d-093f79d72d38" />
Home loanding page of the website

<img width="792" height="766" alt="Screenshot 2026-06-10 112851" src="https://github.com/user-attachments/assets/9f85be6c-fec7-4ebb-8ca9-95733aacc6c5" />
Output calculated - this is website output which shows the years months and days with details


## Future Enhancements 🔮

- Add "Upcoming Birthday" countdown.
- Add astrology/zodiac sign based on the Date of Birth.
- Store history of calculated ages using a database (e.g., MongoDB).
- Add support for multiple languages (i18n).
- Deploy frontend to Vercel/Netlify and backend to Render/Heroku.

## Author ✍️

- Designed & Developed by Haripriya K P
- GitHub: https://github.com/Haripriya-clou
- LinkedIn: https://www.linkedin.com/in/haripriya-k-p-928462378/


