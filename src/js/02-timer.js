'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startButton = document.querySelector('button[data-start]');
const valueDays = document.querySelector('span[data-days]');
const valueHours = document.querySelector('span[data-hours]');
const valueMinutes = document.querySelector('span[data-minutes]');
const valueSeconds = document.querySelector('span[data-seconds]');

startButton.setAttribute('disabled', '');

const fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      selectedDates[0] = new Date();
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.setAttribute('disabled', '');
    }

    if (selectedDates[0] > new Date()) {
      startButton.removeAttribute('disabled');
    }
  },
});

startButton.addEventListener('click', () => {
  const timerId = setInterval(() => {
    let timeLeft = time(fp.selectedDates[0] - new Date());
    let formatedTime = addLeadingZero(timeLeft);

    valueDays.textContent = formatedTime.days;
    valueHours.textContent = formatedTime.hours;
    valueMinutes.textContent = formatedTime.minutes;
    valueSeconds.textContent = formatedTime.seconds;

    if (Number(valueSeconds.textContent) < 0) {
      clearInterval(timerId);
      valueDays.textContent = '00';
      valueHours.textContent = '00';
      valueMinutes.textContent = '00';
      valueSeconds.textContent = '00';
    }

    if (
      valueDays.textContent === '00' &&
      valueHours.textContent === '00' &&
      valueMinutes.textContent === '00' &&
      valueSeconds.textContent === '00'
    ) {
      clearInterval(timerId);
    }
  }, 1000);
});

const time = function convertMs(ms) {
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
};

function addLeadingZero(timeObject) {
  for (const el in timeObject) {
    if (timeObject[el] < 10) {
      timeObject[el] = timeObject[el].toString().padStart(2, '0');
    }
  }
  return timeObject;
}
