import Flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const startBtnRef = document.querySelector('[data-start]');
const inputRef = document.querySelector('#datetime-picker');
startBtnRef.disabled = true;

let isActive = false;
let intervalId = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= options.defaultDate) {
            Notify.failure('Please choose a date in the future');

            startBtnRef.disabled = true;

            return;
        }

        Notify.success('Cool, now you can to run the timer');

        startBtnRef.addEventListener('click', () => {
            isActive = true;

            startBtnRef.disabled = true;
            inputRef.disabled = true;

            const futureTime = selectedDates[0].getTime();

            intervalId = setInterval(() => {
                const currentTime = Date.now();
                const deltaTime = futureTime - currentTime;
                const timeComponents = convertMs(deltaTime);

                if (deltaTime <= 0) {
                    clearInterval(intervalId);

                    isActive = false;

                    startBtnRef.disabled = false;
                    inputRef.disabled = false;

                    return;
                }

                Object.entries(timeComponents).forEach(([name, value]) => {
                    document.querySelector(`[data-${name}]`).textContent =
                        addLeadingZero(value);
                });
            }, 1000);
        });
        startBtnRef.disabled = false;
    },
};

const flatpickr = new Flatpickr('#datetime-picker', options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
}