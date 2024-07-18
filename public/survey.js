document.addEventListener('DOMContentLoaded', async () => {
    loadpage();

    document.getElementById('pause-button').addEventListener('click', togglePause);
    document.getElementById('resume-button').addEventListener('click', togglePause);

    try {
        const { projects, projectInfo } = await fetchAndParseProjects('cleaned.csv');
        selectAndDisplayProjects(projects, projectInfo);

    } catch (error) {
        console.error('Error loading projects:', error);
    }

    function selectAndDisplayProjects(projects, projectInfo) {
        if (projects.length < 20) {
            console.error('Not enough projects to select 20.');
            return;
        }

        const selectedProjects = getRandomProjects(projects, 20);

        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = ''; // Clear existing projects

        const modalContainer = document.getElementById('modal-container');
        const projectInfoElement = document.getElementById('project-info');
        const closeModal = document.getElementById('close-modal');

        selectedProjects.forEach((project, index) => {
            if (!project) {
                console.warn(`Project at index ${index} is empty, skipping.`);
                return;
            }
            const projectItem = document.createElement('li');
            projectItem.classList.add('project-item3');
            projectItem.setAttribute('data-project', JSON.stringify(project));
            projectItem.textContent = project.name;
            projectsContainer.appendChild(projectItem);


            projectItem.addEventListener('click', () => {
                const info = JSON.parse(projectItem.getAttribute('data-project'));
                if (info) {
                    displayProjectInfo(info);
                } else {
                    console.error(`No project information found for project: ${project.name}`);
                }
            });

            projectsContainer.appendChild(projectItem);
        });

        // Initialize Sortable after all items are added
        new Sortable(projectsContainer, {
            animation: 150,
            ghostClass: 'sortable-ghost',
            handle: '.project-item3' // Ensures drag handle is set correctly
        });

        closeModal.addEventListener('click', () => {
            modalContainer.style.display = 'none';
        });

        document.getElementById('submit-button').addEventListener('click', event => {
            event.preventDefault();
            const timerElement = document.getElementById('timer');
            const currentTime = timerElement.textContent;
            localStorage.setItem('RankProjectDuration', JSON.stringify(currentTime));

            const sortedProjects = Array.from(projectsContainer.children).map(child => child.textContent);
            console.log('Ranked Projects:', sortedProjects);
            localStorage.setItem('rankedProjects', JSON.stringify(sortedProjects));
            localStorage.setItem('projectInfo', JSON.stringify(projectInfo));
            window.location.href = 'scoreprojects.html';
        });



    }

});
