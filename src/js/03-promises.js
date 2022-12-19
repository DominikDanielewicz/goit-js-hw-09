'use strict';
import Notiflix from 'notiflix';

const firstDelay = document.querySelector("input[name='delay']");
const delayStep = document.querySelector("input[name='step']");
const amount = document.querySelector("input[name='amount']");
const form = document.querySelector('form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

function promiseCreator(position, delay) {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(
        `✅ Fulfilled promise ${position + 1} in ${
          Number(firstDelay.value) + position * delay
        }ms`
      );
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(
        `❌ Rejected promise ${position + 1} in ${
          Number(firstDelay.value) + position * delay
        }ms`
      );
    });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  for (let position = 0; position < amount.value; position++) {
    setTimeout(() => {
      promiseCreator(position, delayStep.value);
    }, Number(firstDelay.value) + position * Number(delayStep.value));
  }
});
