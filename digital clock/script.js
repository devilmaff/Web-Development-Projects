const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const ampmEl = document.getElementById('ampm');
const dayNameEl = document.getElementById('day-name');
const monthNameEl = document.getElementById('month-name');
const dayNumEl = document.getElementById('day-num');
const yearEl = document.getElementById('year');

function updateClock() {
    const now = new Date();

    // Get Time
    let h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    // Determine AM/PM and convert to 12-hour format if desired
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; // the hour '0' should be '12'

    // Helpers to add leading zeros
    const formatTime = (time) => time < 10 ? `0${time}` : time;

    // Update DOM for Time
    hoursEl.innerText = formatTime(h);
    minutesEl.innerText = formatTime(m);
    secondsEl.innerText = formatTime(s);
    ampmEl.innerText = ampm;

    // Get Date
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Update DOM for Date
    dayNameEl.innerText = days[now.getDay()];
    monthNameEl.innerText = months[now.getMonth()];
    dayNumEl.innerText = formatTime(now.getDate());
    yearEl.innerText = now.getFullYear();
}

// Initial call
updateClock();

// Update every second
setInterval(updateClock, 1000);
