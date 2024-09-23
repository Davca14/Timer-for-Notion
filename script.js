let time = 0; // Default time in seconds (0 minutes)
let timerInterval;
const timerElement = document.getElementById('timer');
const timeInput = document.getElementById('timeInput');
const setButton = document.getElementById('setButton');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const progressBar = document.getElementById('progressBar');
const alarmSound = document.getElementById('alarmSound');
let initialTime = time;

function updateTimerDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Update progress bar
    const progressPercentage = initialTime > 0 ? (time / initialTime) * 100 : 0;
    progressBar.style.width = `${progressPercentage}%`;
}

function setTimer() {
    const minutes = parseInt(timeInput.value);
    if (!isNaN(minutes) && minutes >= 0) {
        time = minutes * 60;
        initialTime = time; // Reset initial time
        updateTimerDisplay();
        startButton.disabled = false;
        stopButton.disabled = true;
        clearInterval(timerInterval);
    }
}

function updateTimer() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (time <= 0) {
        clearInterval(timerInterval);
        timerElement.textContent = "00:00";
        alarmSound.play(); // Play alarm sound
        startButton.disabled = false;
        stopButton.disabled = true;
        return;
    }

    time--;
    updateTimerDisplay();
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
