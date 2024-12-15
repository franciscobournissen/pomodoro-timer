const upMin = document.getElementById("upMin");
const downMin = document.getElementById("downMin");
const upSec = document.getElementById("upSec");
const downSec = document.getElementById("downSec");

const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
//prettier-ignore
const audio = new Audio("sound/alarm.mp3");

// Event listeners for time adjustment
upMin.addEventListener("click", () => {
    const minutesElement = document.getElementById("minutes");
    let minutes = parseInt(minutesElement.innerHTML);
    if (minutes < 59) {
        minutes++;
        minutesElement.innerHTML = minutes.toString().padStart(2, "0");
    }
});

downMin.addEventListener("click", () => {
    const minutesElement = document.getElementById("minutes");
    let minutes = parseInt(minutesElement.innerHTML);
    if (minutes > 0) {
        minutes--;
        minutesElement.innerHTML = minutes.toString().padStart(2, "0");
    }
});

upSec.addEventListener("click", () => {
    const secondsElement = document.getElementById("seconds");
    let seconds = parseInt(secondsElement.innerHTML);
    if (seconds < 59) {
        seconds++;
        secondsElement.innerHTML = seconds.toString().padStart(2, "0");
    }
});

downSec.addEventListener("click", () => {
    const secondsElement = document.getElementById("seconds");
    let seconds = parseInt(secondsElement.innerHTML);
    if (seconds > 0) {
        seconds--;
        secondsElement.innerHTML = seconds.toString().padStart(2, "0");
    }
});

// Event listeners for timer control
let interval;

function startTimer(time) {
    let timer = time;
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    interval = setInterval(() => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        minutesElement.innerHTML = minutes.toString().padStart(2, "0");
        secondsElement.innerHTML = seconds.toString().padStart(2, "0");
        timer--;
        if (timer < 0) {
            clearInterval(interval);
            audio.play();
        }
    }, 1000);
}

startButton.addEventListener("click", () => {
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    const minutes = parseInt(minutesElement.innerHTML);
    const seconds = parseInt(secondsElement.innerHTML);
    const time = minutes * 60 + seconds;
    if (time > 0) {
        if (interval) {
            clearInterval(interval);
        }
        startTimer(time);
    }
});

stopButton.addEventListener("click", () => {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
});

resetButton.addEventListener("click", () => {
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    minutesElement.innerHTML = "25";
    secondsElement.innerHTML = "00";
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
});
