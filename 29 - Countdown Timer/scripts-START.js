
const timeLeft = document.querySelector('.display__time-left');
const buttons = document.querySelectorAll('.timer__button');
const form = document.querySelector('#custom');

let interval = null;

function displayTime(seconds) {
  clearInterval(interval);
  let secondsLeft = seconds;
  timeLeft.innerHTML = `${Math.floor(secondsLeft / 60)}:${secondsLeft % 60 || '00'}`;
  interval = setInterval(() => {
    secondsLeft -= 1;
    if (secondsLeft <= 0) {
      clearInterval(interval);
      return;
    }
    timeLeft.innerHTML = `${Math.floor(secondsLeft / 60)}:${secondsLeft % 60 || '00'}`
  }, 1000)
}

function setTimer() {
  displayTime(this.dataset.time);
}

buttons.forEach(button => {
  button.addEventListener('click', setTimer)
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = form.querySelector('input');
  displayTime(input.value * 60)
  e.target.reset();
});