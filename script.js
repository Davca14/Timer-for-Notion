let time = 600; // Default time in seconds (10 minutes)
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
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Update progress bar
    const progressPercentage = (time / initialTime) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    // Update timer color based on remaining time
    if (time <= initialTime * 0.2) {
        timerElement.style.color = '#ff0000'; // Red color for last 20%
    } else if (time <= initialTime * 0.5) {
        timerElement.style.color = '#ffa500'; // Orange color for last 50%
    } else {
        timerElement.style.color = '#333'; // Default color
    }
}

function setTimer() {
    const minutes = parseInt(timeInput.value);
    if (!isNaN(minutes) && minutes > 0) {
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
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    time--;

    if (time < 0) {
        clearInterval(timerInterval);
        timerElement.textContent = "Time's up!";
        alarmSound.play(); // Play alarm sound
    }

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
