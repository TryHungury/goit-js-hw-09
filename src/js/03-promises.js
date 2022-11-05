const refs = {
  formRef: document.querySelector(".form"),
  delayRef: document.querySelector("[name=delay]"),
  stepRef: document.querySelector("[name=step]"),
  amountRef: document.querySelector("[name=amount]")
}
// console.log("🚀formRef", refs.formRef)
// console.log("🚀delayRef", refs.delayRef)
// console.log("🚀stepRef", refs.stepRef)
// console.log("🚀amountRef", refs.amountRef)

refs.formRef.addEventListener('submit', (e)=>{
  e.preventDefault();

  const {elements:{delay,step,amount}}=e.currentTarget;

  createPromise(amount.value, step.value, delay.value)
  // console.log(e.target[0].value)
})

function createPromise(position, step, delay) {
    let count = 0;
    
    for (let idx = 1; idx <= position; idx+=1) {
      const shouldResolve = Math.random() > 0.3;
      let stepDelay = delay;

      if (idx > 1) {
        count += 1;
        // console.log(count)
      }

      stepDelay = parseInt(stepDelay) + step * count;
      const obj = {idx, stepDelay}
      // console.log("🚀obj", obj)

      setTimeout(() => {
        const promise = new Promise((resolve, reject) => { 
        if (shouldResolve) {
          resolve(obj)
        } else {
          reject(obj)
        }
      })
      
      promise.then(({i, stepDelay}) => {
        console.log(`✅ Fulfilled promise ${idx} in ${stepDelay}ms`);
      })
      .catch(({idx, stepDelay}) => {
        console.log(`❌ Rejected promise ${idx} in ${stepDelay}ms`);
      });
      }, stepDelay);
    }
}
