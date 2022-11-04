const refs = {
    bodyBcg: document.querySelector("body"),
    startBtn: document.querySelector("[data-start]"),
    stopBtn: document.querySelector("[data-stop]")
}
// console.log(bodyBcg)
// console.log(refs.startBtn);
// console.log(refs.stopBtn);

const DELAY = 1000;
let intervalId = null;

refs.startBtn.addEventListener('click', (e)=>{
    changeColor(e);
    disableBtn();
})

refs.stopBtn.addEventListener('click', ()=>{
    clearInterval(intervalId);
    enableBtn()
})

function changeColor(event) {
    if (event.isTrusted) {
        intervalId = setInterval(() => {
            refs.bodyBcg.style.backgroundColor = getRandomHexColor();
            // console.log(getRandomHexColor());
        }, DELAY);
    }
}

function disableBtn() {
    refs.startBtn.disabled = true;
}

function enableBtn() {
    refs.startBtn.disabled = false;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}