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

refs.btnRef.disabled = true;

const DELAY = 1000;

let differenceTime = null;
// console.log(refs.btnRef)

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
                setInterval(()=>{
                    const time = new Date();
                    changeTextTimer(convertMs(selectedDates[0].getTime() - time.getTime()))
                    // addLeadingZero();
                    console.log(convertMs(selectedDates[0].getTime() - time.getTime()))
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
    // console.log(days)
        refs.spanDays.textContent = days;
        refs.spanHour.textContent = hours;
        refs.spanMinute.textContent = minutes;
        refs.spanSecond.textContent = seconds;
 
    // console.log(days.toString().length === 1)
}
// function addLeadingZero() {
//     refs.spanDays.textContent.toString().padStart(3,0);
//     refs.spanHour.textContent.toString().padStart(2,0);
//     refs.spanMinute.textContent.toString().padStart(2,0);
//     refs.spanSecond.textContent.toString().padStart(2,0);
// }
// function additionalNum() {
    // if(refs.spanDays.textContent )
// }

// console.log("b".padStart(2,0))