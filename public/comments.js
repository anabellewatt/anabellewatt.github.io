document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('instructions-modal');
    modal.style.display = 'block';

    document.getElementById('start-button').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    const form = document.getElementById('questions-form');

    document.getElementById('submit-button').addEventListener('click', event => {
        event.preventDefault();

        const formData = new FormData(form);
        const answers = {};

        formData.forEach((value, key) => {
            answers[key] = sanitizeInput(value);
        });

        const rankedMethods = Array.from(document.getElementById('ranking-container').children)
            .map(child => child.textContent);

        const result = {
            answers: answers,
            rankedMethods: rankedMethods
        };

        localStorage.setItem('userAnswers', JSON.stringify(result));

        window.location.href = 'end.html';
    });

    new Sortable(document.getElementById('ranking-container'), {
        animation: 150,
        ghostClass: 'sortable-ghost',
        handle: '.project-item'
    });
});

const sanitizeInput = (input) => {
    if (typeof input !== 'string') {
        return '';
    }
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/`/g, '&#96;')
        .replace(/\$/g, '&#36;')
        .replace(/\\/g, '&#92;')
        .replace(/\//g, '&#47;')
        .trim()
        .substring(0, 1000); // Limit input length
};
