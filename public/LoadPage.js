function loadpage() {
    const modal = document.getElementById('instructions-modal');
    modal.style.display = 'block';

// Start timer when "OK" button is clicked
    document.getElementById('start-button').addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the modal
        startTimer();
    });
}

function fetchAndParseProjects(csvFilePath) {
    return fetch(csvFilePath)
        .then(response => response.text())
        .then(csvData => {
            return new Promise((resolve, reject) => {
                Papa.parse(csvData, {
                    header: true,
                    dynamicTyping: true,
                    complete: function(results) {
                        console.log('Parsed CSV Data:', results.data); // Log parsed data for debugging
                        const projects = results.data.map(row => ({
                            name: row['title'],
                            goal: row['goal'],
                            description: row['description'],
                            difficulty: row['difficulty'],
                            capacity: row['max_students'],
                            criteria: row['completion_criteria']
                        })).filter(project => project.name); // Ensure no empty names
                        const projectInfo = results.data.map(row => ({
                            name: row['title'],
                            goal: row['goal'],
                            description: row['description'],
                            difficulty: row['difficulty'],
                            capacity: row['max_students'],
                            criteria: row['completion_criteria']

                        })).filter(info => info.name); // Ensure no empty names

                        resolve({ projects, projectInfo });
                    },
                    error: function(error) {
                        console.error('Parsing Error:', error);
                        reject(error);
                    }
                });
            });
        })
        .catch(error => {
            console.error('Fetch or Parsing Error:', error);
            throw error;
        });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function displayProjectInfo(project) {
    const modalContainer = document.getElementById('modal-container');
    const projectInfoElement = document.getElementById('project-info');

    projectInfoElement.innerHTML = `
            <h2>${project.name}</h2>
            <p><strong>Goal:</strong> ${project.goal}</p>
            <p><strong>Description:</strong> ${project.description}</p>
            <p><strong>Difficulty:</strong> ${project.difficulty}</p>
            <p><strong>Capacity of Students:</strong> ${project.capacity}</p>
            <p><strong>Completion Criteria:</strong> ${project.criteria}</p>
        `;

    modalContainer.style.display = 'block';
}

function getRandomProjects(projects, count){
    const shuffledProjects = shuffleArray(projects);
    return shuffledProjects.slice(0, count);
}

