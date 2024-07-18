// Client-side JavaScript code (e.g., in your Survey.html or end.html file)
// Make sure to replace 'http://localhost:3000/end.html' with the correct URL of your server endpoint

const sendDataToServer = () => {
    const surveyData = {
        rankedProjects: JSON.parse(localStorage.getItem('rankedProjects')),
        scoreProjects: JSON.parse(localStorage.getItem('rankedScores')),
        groupProjects: JSON.parse(localStorage.getItem('categorizedProjects')),
        checkedProjects: JSON.parse(localStorage.getItem('checkedProjects')),
        questions:JSON.parse(localStorage.getItem('userAnswers')),
        rankedProjectsTime: JSON.parse(localStorage.getItem('RankProjectDuration')),
        scoreProjectsTime:JSON.parse(localStorage.getItem('ScoreProjectDuration')),
        groupProjectsTime:JSON.parse(localStorage.getItem('GroupProjectDuration')),
        checkProjectsTime:JSON.parse(localStorage.getItem('CheckProjectDuration'))
    };

    fetch('http://localhost:3000/end.html', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(surveyData)
    })
        .then(response => {
            if (response.ok) {
                console.log('Survey data sent successfully');
                // Optionally, you can redirect the user or perform other actions upon successful submission
            } else {
                console.error('Error sending survey data:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error sending survey data:', error);
        });
};

// Call the function to send data to the server when needed
sendDataToServer();
