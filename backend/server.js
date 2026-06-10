const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoint for Age Calculation
app.post('/api/calculate-age', (req, res) => {
    const { dob } = req.body;

    if (!dob) {
        return res.status(400).json({ error: 'Date of birth is required' });
    }

    const birthDate = new Date(dob);
    const currentDate = new Date();

    // Validate the date format
    if (isNaN(birthDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
    }

    // Prevent future dates
    if (birthDate > currentDate) {
        return res.status(400).json({ error: 'Date of birth cannot be in the future' });
    }

    // Calculate Exact Age
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    // Adjust for negative days (borrow days from previous month)
    if (days < 0) {
        months--;
        // Get number of days in the previous month
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += previousMonth.getDate();
    }

    // Adjust for negative months (borrow from years)
    if (months < 0) {
        years--;
        months += 12;
    }

    // Return successful response
    res.json({
        years,
        months,
        days,
        message: 'Calculation successful'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
