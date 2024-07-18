document.addEventListener('DOMContentLoaded',async ()=>{

    loadpage();

    document.getElementById('pause-button').addEventListener('click', togglePause);
    document.getElementById('resume-button').addEventListener('click', togglePause);


// Fetch and process the CSV file
    try {
        const {projects,projectInfo} = await fetchAndParseProjects('cleaned.csv');
        displayProjects(projects);
    } catch (error) {
        console.error('Error loading projects:', error);
    }
// Function to shuffle an array


// Function to select a specified number of random projects
// Display the projects in the container
    function displayProjects(projects) {
        projects = getRandomProjects(projects,20);
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = ''; // Clear existing projects

        projects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.classList.add('project-item');
            projectItem.setAttribute('data-project', JSON.stringify(project));

            const projectName = document.createElement('span');
            projectName.classList.add('project-name');
            projectName.textContent = project.name;

            const actions = document.createElement('div');
            actions.classList.add('actions');

            const approveButton = document.createElement('button');
            approveButton.classList.add('approve');
            approveButton.textContent = '\u2714';
            approveButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the event from bubbling up to the project item
                console.log(`Project ${project.name} approved`);
                projectItem.classList.add('approved');
                projectItem.classList.remove('disapproved');
            });

            const disapproveButton = document.createElement('button');
            disapproveButton.classList.add('disapprove');
            disapproveButton.textContent = 'X';
            disapproveButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the event from bubbling up to the project item
                console.log(`Project ${project.name} disapproved`);
                projectItem.classList.add('disapproved');
                projectItem.classList.remove('approved');
            });

            actions.appendChild(approveButton);
            actions.appendChild(disapproveButton);

            projectItem.appendChild(projectName);
            projectItem.appendChild(actions);

            // Add click event listener to the entire project item to show project information in the modal
            projectItem.addEventListener('click', () => {
                const info = JSON.parse(projectItem.getAttribute('data-project'));
                if (info){
                    displayProjectInfo(info);
                } else {
                    console.error(`No project information found for project: ${project.name}`);
                }
            });

            projectsContainer.appendChild(projectItem);
        });
    }

    // Close the modal
    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('modal-container').style.display = 'none';
    });

    // Handle form submission and save the categorized data
    document.getElementById('submit-button').addEventListener('click', event => {
        console.log('Form submitted');
        event.preventDefault();
        const timerElement = document.getElementById('timer');
        const currentTime = timerElement.textContent;
        localStorage.setItem('CheckProjectDuration', JSON.stringify(currentTime));

        const projectsContainer = document.getElementById('projects-container');
        const projectItems = projectsContainer.querySelectorAll('.project-item');

        const categorizedProjects = {
            approved: [],
            disapproved: []
        };

        projectItems.forEach(projectItem => {
            const isApproved = projectItem.classList.contains('approved');
            const isDisapproved = projectItem.classList.contains('disapproved');
            const project = JSON.parse(projectItem.getAttribute('data-project'));

            if (isApproved) {
                categorizedProjects.approved.push(project.name);
            } else if (isDisapproved) {
                categorizedProjects.disapproved.push(project.name);
            } else {
                // If neither approved nor disapproved, assign disapproval
                categorizedProjects.disapproved.push(project.name);
                projectItem.classList.add('disapproved');
            }
        });

        console.log('Checked Projects:', categorizedProjects);
        localStorage.setItem('checkedProjects', JSON.stringify(categorizedProjects));
        window.location.href = 'comments.html';  // Replace with the URL of the next page
    });
});

