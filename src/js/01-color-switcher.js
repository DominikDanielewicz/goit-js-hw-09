'use strict';

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const bodyArea = document.querySelector('body');
let timerId;

startButton.addEventListener('click', () => {
  startButton.setAttribute('disabled', '');
  timerId = setInterval(updateColor, 1000);
});

stopButton.addEventListener('click', () => {
  clearInterval(timerId);
  startButton.removeAttribute('disabled');
});

function updateColor() {
  bodyArea.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
