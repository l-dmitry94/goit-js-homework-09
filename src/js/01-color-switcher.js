const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

const INTERVAL_TIME = 1000;
let intervalId = null;

stopBtn.disabled = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}

function changeColor() {
    body.style.backgroundColor = getRandomHexColor();
}

startBtn.addEventListener('click', () => {
    changeColor();
    intervalId = setInterval(() => {
        changeColor();
    }, INTERVAL_TIME);

    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
    clearInterval(intervalId);

    startBtn.disabled = false;
    stopBtn.disabled = true;
});
