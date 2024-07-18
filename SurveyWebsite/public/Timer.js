let timerInterval;
let elapsedTime = 0;
let isPaused = false;

function startTimer() {
    const timerElement = document.getElementById('timer');
    const startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(() => {
        if (!isPaused) {
            elapsedTime = Date.now() - startTime;
            timerElement.textContent = formatTime(elapsedTime);
        }
    }, 1000);
}

function formatTime(time) {
    const totalSeconds = Math.floor(time / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function togglePause() {
    const pauseButton = document.getElementById('pause-button');
    const resumeButton = document.getElementById('resume-button');
    const resumeButtonBlackout = document.getElementById('resume-button-blackout');
    const blackoutScreen = document.getElementById('blackout-screen');

    isPaused = !isPaused;
    if (isPaused) {
        clearInterval(timerInterval);
        pauseButton.style.display = 'none';
        resumeButton.style.display = 'inline-block';
        blackoutScreen.style.display = 'flex';
    } else {
        startTimer();
        pauseButton.style.display = 'inline-block';
        resumeButton.style.display = 'none';
        blackoutScreen.style.display = 'none';
    }

    resumeButtonBlackout.addEventListener('click', () => {
        isPaused = false;
        startTimer();
        pauseButton.style.display = 'inline-block';
        resumeButton.style.display = 'none';
        blackoutScreen.style.display = 'none';
    });
}