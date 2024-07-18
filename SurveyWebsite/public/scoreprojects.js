document.addEventListener('DOMContentLoaded', () => {
    loadpage();

    document.getElementById('pause-button').addEventListener('click', togglePause);
    document.getElementById('resume-button').addEventListener('click', togglePause);

    const rankedProjects = JSON.parse(localStorage.getItem('rankedProjects'));
    const projectInfo = JSON.parse(localStorage.getItem('projectInfo')) || [];

    if (rankedProjects.length === 0 || projectInfo.length === 0) {
        alert('No projects found to score.');
        return;
    }
    const rankedProjectsContainer = document.getElementById('ranked-projects-container');

    if (rankedProjects && rankedProjects.length > 0) {
        rankedProjects.forEach((project, index) => {

            const projectItem = document.createElement('div');
            projectItem.classList.add('project-item');

            const projectName = document.createElement('span');
            projectName.textContent = project;

            const projectScore = document.createElement('input');
            projectScore.type = 'number';
            projectScore.min = 0;
            projectScore.max = 10;
            projectScore.name = `score-${project}`;
            projectScore.placeholder = 'Score (0-10)';
            projectScore.value = '0'; // Initialize the score to 0


            projectScore.addEventListener('input', () => {
                let valid = true;
                const scoreValue = parseInt(projectScore.value, 10);

                // Check previous projects' scores
                for (let i = 0; i < index; i++) {
                    const prevScore = parseInt(document.querySelector(`input[name='score-${rankedProjects[i]}']`).value, 10);
                    if (scoreValue > prevScore) {
                        valid = false;
                        break;
                    }
                }

                // Check subsequent projects' scores
                for (let i = index + 1; i < rankedProjects.length; i++) {
                    const nextScore = parseInt(document.querySelector(`input[name='score-${rankedProjects[i]}']`).value, 10);
                    if (scoreValue < nextScore) {
                        valid = false;
                        break;
                    }
                }

                if (!valid) {
                    alert('Score must be less than or equal to the project above it and greater than or equal to the project below it.');
                    projectScore.value = '0'; // Reset to a valid value
                }
            });

            projectItem.appendChild(projectName);
            projectItem.appendChild(projectScore);
            rankedProjectsContainer.appendChild(projectItem);

            projectItem.addEventListener('click', (event) => {
                if(event.target!==projectScore) {
                    const info = projectInfo.find(info => info.name === project);
                    console.log('Clicked Project:', project);
                    if (info) {
                        // Display project information in modal
                        displayProjectInfo(info);
                    } else {
                        console.error(`No project information found for project: ${project.name}`);
                    }
                }
            });

            return projectItem;


        });
    }else {
        rankedProjectsContainer.textContent = 'No ranked projects found.';
    }


// Close the modal
    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('modal-container').style.display = 'none';
    });

    // Handle form submission
    document.getElementById('score-form').addEventListener('submit', event => {
        const timerElement = document.getElementById('timer');
        const currentTime = timerElement.textContent;
        localStorage.setItem('ScoreProjectDuration', JSON.stringify(currentTime));

        event.preventDefault();

        const formData = new FormData(event.target);
        const rankedProjects = JSON.parse(localStorage.getItem('rankedProjects')); // Retrieve ranked projects

        // Ensure rankedProjects contains only project names
        const rankedProjectNames = rankedProjects.map(project => project.name ? project.name : project);

        const rankedScores = rankedProjectNames.map(projectName => {
            const score = formData.get(`score-${projectName}`);
            return { name: projectName, score: parseInt(score, 10) }; // Create object with project name and score
        });

        console.log('Ranked Scores:', rankedScores);
        // Save the ranked scores in local storage
        localStorage.setItem('rankedScores', JSON.stringify(rankedScores));
        window.location.href = 'groupby.html';  // Replace with the URL of the next page
    });
});