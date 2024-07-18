document.getElementById('consent-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const agreed = document.getElementById('consent-checkbox').checked;

    if (agreed) {
        // If user agrees, submit the form
        fetch('/submit-consent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ agreed: true })
        })
            .then(response => {
                if (response.ok) {
                    // Redirect to the survey page if agreement is given
                    window.location.href = '/public/Survey.html';
                } else {
                    console.error('Failed to submit consent');
                    alert('Failed to submit consent');
                }
            })
            .catch(error => {
                console.error('Error submitting consent:', error);
                alert('Error submitting consent');
            });
    } else {
        // If user doesn't agree, show an alert
        alert('You must agree to participate in this survey to continue.');
    }
});