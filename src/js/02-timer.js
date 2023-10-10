import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector['[data-days]'];
const hours = document.querySelector['[data-hours]'];
const minutes = document.querySelector['[data-minutes]'];
const seconds = document.querySelector['[data-seconds]'];

startBtn.disabled = true;
let intervalId = null;
let selectedDate = null;

flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = Date.now();
        selectedDate = selectedDates[0];
        if (currentDate >= selectedDate) {
            Notiflix.Notify.failure('Please choose a date in the future');
            startBtn.disabled = true;
            return;
        }

        startBtn.disabled = false;
    },
});

startBtn.addEventListener('click', () => {
    intervalId = setInterval(() => {
        const currentDate = Date.now();
        const deltaTime = selectedDate - currentDate;

        const { days, hours, minutes, seconds } = convertMs(deltaTime);

        days.textContent = days;
        hours.textContent = hours;
        minutes.textContent = minutes;
        seconds.textContent = seconds;

        if(days === "00" && hours === "00" && minutes === "00" && seconds === "00") {
            clearInterval(intervalId);
        }
    }, 1000);
});

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute)) / second);

    return { days, hours, minutes, seconds };
}
