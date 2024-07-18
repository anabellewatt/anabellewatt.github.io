document.getElementById('consent-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const agreed = document.getElementById('consent-checkbox').checked;

    if (agreed) {
        // If user agrees, submit the form
        // Store consent in localStorage
        localStorage.setItem('consentGiven', 'true');
        // Redirect to the survey page
        window.location.href = '/public/Survey.html';
    } else {
        // If user doesn't agree, show an alert
        alert('You must agree to participate in this survey to continue.');
    }
});