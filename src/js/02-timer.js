import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    inputRef: document.querySelector("#datetime-picker"),
    btnRef: document.querySelector("[data-start]"),
    spanDays: document.querySelector("[data-days]"),
    spanHour: document.querySelector("[data-hours]"),
    spanMinute: document.querySelector("[data-minutes]"),
    spanSecond: document.querySelector("[data-seconds]")
}

const DELAY = 1000;
refs.btnRef.disabled = true;

flatpickr('#datetime-picker',
option={
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const data = new Date();
        console.log("🚀data", data)
        if(data >= selectedDates[0]) {
            window.alert("Please choose a date in the future")
        }
        else {
            refs.btnRef.disabled = false;

            // differenceTime = selectedDates[0].getTime() - data.getTime();
            refs.btnRef.addEventListener('click', ()=>{
                const timerId = setInterval(()=>{
                    const time = new Date();
                    if ((selectedDates[0].getTime()/1000)-1 === parseInt(time.getTime()/1000)) {
                        clearInterval(timerId);
                        refs.btnRef.disabled = true;
                    }
                    changeTextTimer(convertMs(selectedDates[0].getTime() - time.getTime()))
                    // addLeadingZero();
                    // console.log(convertMs(selectedDates[0].getTime() - time.getTime()))
                },DELAY);
            })
        }
    },

})


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
    return { days, hours, minutes, seconds };
}

function changeTextTimer({days, hours, minutes, seconds}) {
        refs.spanDays.textContent = days.toString === 1? days: addLeadingZero(days);
        refs.spanHour.textContent = hours.toString === 1? hours: addLeadingZero(hours);
        refs.spanMinute.textContent = minutes.toString === 1? minutes: addLeadingZero(minutes);
        refs.spanSecond.textContent = seconds.toString === 1? seconds: addLeadingZero(seconds);
}
function addLeadingZero(value) {
    return value.toString().padStart(2,0);
    // console.log(value.toString().padStart(2,0))
}
