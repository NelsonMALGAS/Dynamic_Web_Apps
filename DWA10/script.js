const slPlusBtn =document.querySelector("body > div > div.buttons > sl-button:nth-child(1)")
const slMinusBtn = document.querySelector("body > div > div.buttons > sl-button:nth-child(2)")
const resetBtn = document.querySelector("body > div > sl-button")
const input = document.querySelector("body > div > div.counter > sl-input")
const arlet = document.querySelector("body > div > sl-alert")
const body = document.querySelector("body")


let count = 1

slPlusBtn.addEventListener('click' , () =>{
    arlet.open = false
    input.value = count++
  

})

slMinusBtn.addEventListener('click' , () =>{
    arlet.open = false
    input.value = count--
})

resetBtn.addEventListener('click' , ()=>{
    count = 0
    input.value = 0
    arlet.open = true
})

