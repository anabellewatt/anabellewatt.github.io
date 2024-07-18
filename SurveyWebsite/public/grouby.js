document.addEventListener('DOMContentLoaded', async () => {
    loadpage();

    document.getElementById('pause-button').addEventListener('click', togglePause);
    document.getElementById('resume-button').addEventListener('click', togglePause);


    try {
        const {projects,projectInfo} = await fetchAndParseProjects('cleaned.csv');
        selectAndDisplayProjects(projects);
    } catch (error) {
        console.error('Error loading projects:', error);
    }

// Select and display 20 projects
    function selectAndDisplayProjects(projects) {
        if (projects.length < 20) {
            console.error('Not enough projects to select 20.');
            return;
        }

        const selectedProjects = getRandomProjects(projects, 20);

        // Store the 20 selected projects in localStorage
        localStorage.setItem('allProjects', JSON.stringify(selectedProjects));

        const projectsContainer = document.getElementById('projects-container3');
        const modalContainer = document.getElementById('modal-container');
        const closeModal = document.getElementById('close-modal');
        projectsContainer.innerHTML = ''; // Clear existing projects

        selectedProjects.forEach((project, index) => {
            const projectItem = document.createElement('div');
            projectItem.classList.add('project-item3');
            projectItem.setAttribute('data-project', JSON.stringify(project));
            projectItem.textContent = project.name;
            projectsContainer.appendChild(projectItem);

            // Add click event listener to show project information in modal
            projectItem.addEventListener('click', () => {
                const info = JSON.parse(projectItem.getAttribute('data-project'));
                if (info) {
                    displayProjectInfo(info);
                } else {
                    console.error(`No project information found for project: ${project.name}`);
                }
            });
        });

        closeModal.addEventListener('click', () => {
            modalContainer.style.display = 'none';
        });

        // Enable sorting and grouping
        new Sortable(projectsContainer, {
            animation: 150,
            ghostClass: 'sortable-ghost',
            group: 'projects',
        });

        // Enable sorting for category dropzones
        ['really-want', 'okay-with', 'dont-want', 'not-qualified'].forEach(category => {
            new Sortable(document.getElementById(`dropzone-${category}`), {
                animation: 150,
                group: 'projects',
            });
        });
    }

// Handle form submission and save the categorized data
    document.getElementById('submit-button').addEventListener('click', event => {
        event.preventDefault();
        const timerElement = document.getElementById('timer');
        const currentTime = timerElement.textContent;
        localStorage.setItem('GroupProjectDuration', JSON.stringify(currentTime));

        const categories = ['really-want', 'okay-with', 'dont-want', 'not-qualified'];
        const categorizedProjects = {
            'really-want': [],
            'okay-with': [],
            'dont-want': [],
            'not-qualified': []
        };

        // Track all sorted project names
        const sortedProjects = new Set();

        categories.forEach(category => {
            const projectElements = document.getElementById(`dropzone-${category}`).getElementsByClassName('project-item3');
            categorizedProjects[category] = Array.from(projectElements).map(projectElement => {
                const project = JSON.parse(projectElement.getAttribute('data-project'));
                sortedProjects.add(project.name);
                return project.name; // Store only the project name
            });
        });

        // Find unsorted projects and add them to the "Don't want" category
        const allProjects = JSON.parse(localStorage.getItem('allProjects')) || [];
        const unsortedProjects = allProjects.filter(project => !sortedProjects.has(project.name));

        categorizedProjects['dont-want'].push(...unsortedProjects.map(project => project.name)); // Add only names

        console.log('Categorized Projects:', categorizedProjects);
        localStorage.setItem('categorizedProjects', JSON.stringify(categorizedProjects));
        window.location.href = 'check.html';  // Replace with the URL of the next page
    });
});

