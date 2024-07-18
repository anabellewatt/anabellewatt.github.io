const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to serve the consent page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'consent.html'));
});

// Route to handle form submission
app.post('/submit-survey', (req, res) => {
    const surveyData = req.body;

    // Save the survey data to a JSON file
    const filename = `survey-${Date.now()}.json`;
    const filePath = path.join(__dirname, 'data', filename);

    fs.writeFile(filePath, JSON.stringify(surveyData, null, 2), (err) => {
        if (err) {
            console.error('Error saving survey:', err);
            res.status(500).send('Error saving survey');
        } else {
            res.status(200).send('Survey saved successfully');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
