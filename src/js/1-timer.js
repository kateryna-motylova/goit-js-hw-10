import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  startBtn: document.querySelector("[data-start]"),
  input: document.querySelector("#datetime-picker"),
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};

let selectedDate = null;
let timerId = null;

refs.startBtn.disabled = true;
resetTimer();

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor((ms % hour) / minute),
    seconds: Math.floor((ms % minute) / second),
  };
}

function renderTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function resetTimer() {
  renderTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function startTimer() {
  if (!selectedDate || timerId) return;

  refs.startBtn.disabled = true;
  refs.input.disabled = true;

  timerId = setInterval(() => {
  const diff = selectedDate - Date.now();

    if (diff <= 0) {
      stopTimer();
      resetTimer();

      refs.input.disabled = false;
      refs.startBtn.disabled = true;
      selectedDate = null;

      iziToast.success({
        message: "Time is over!",
        position: "topRight",
      });

      return;
    }

    renderTimer(convertMs(diff));
  }, 1000);
}

flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const pickedDate = selectedDates[0];

    refs.startBtn.disabled = true;

    if (!pickedDate || pickedDate <= Date.now()) {
      iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight",
      });

      selectedDate = null;
      return;
    }

    selectedDate = pickedDate;
    refs.startBtn.disabled = false;
  },
});

refs.startBtn.addEventListener("click", startTimer);