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

form.addEventListener('submit', e => {
  e.preventDefault();

  setTimeout(() => {
    setInterval(() => {
      createPromise(amount.value, delayStep.value)
        .then(({ position, delay }) => {
          Notiflix.Notify.failure(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.success(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }, delayStep.value);
  }, firstDelay.value);
});
