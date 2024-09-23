let time = 600; // Default time in seconds (10 minutes)
let timerInterval;
const timerElement = document.getElementById('timer');
const timeInput = document.getElementById('timeInput');
const setButton = document.getElementById('setButton');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

function updateTimerDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function setTimer() {
    const minutes = parseInt(timeInput.value);
    if (!isNaN(minutes) && minutes > 0) {
        time = minutes * 60;
        updateTimerDisplay();
        startButton.disabled = false;
        stopButton.disabled = true;
        clearInterval(timerInterval);
    }
}

function updateTimer() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    time--;

    if (time < 0) {
        clearInterval(timerInterval);
        timerElement.textContent = "Time's up!";
    }
}

function startTimer() {
    startButton.disabled = true;
    stopButton.disabled = false;
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    startButton.disabled = false;
    stopButton.disabled = true;
    clearInterval(timerInterval);
}

setButton.addEventListener('click', setTimer);
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);

updateTimerDisplay(); // Initial display update
