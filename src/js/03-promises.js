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

  let position = 1;

  setTimeout(() => {
    createPromise(position, delayStep.value)
      .then(({ position, delay }) => {
        Notiflix.Notify.failure(
          `✅ Fulfilled promise ${position} in ${firstDelay.value}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.success(
          `❌ Rejected promise ${position} in ${firstDelay.value}ms`
        );
      });
    position++;
    const interval = setInterval(() => {
      if (position >= amount.value) {
        clearInterval(interval);
      }
      createPromise(position, delayStep.value)
        .then(({ position, delay }) => {
          Notiflix.Notify.failure(
            `✅ Fulfilled promise ${position} in ${
              Number(firstDelay.value) + delay * (position - 1)
            }ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.success(
            `❌ Rejected promise ${position} in ${
              Number(firstDelay.value) + delay * (position - 1)
            }ms`
          );
        });
      position++;
    }, delayStep.value);
  }, firstDelay.value);
});
