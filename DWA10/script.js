const slPlusBtn =document.querySelector('[data-plus-btn]')
const slMinusBtn = document.querySelector('[data-minus-btn]')
const resetBtn = document.querySelector('[data-reset]')
const input = document.querySelector('[data-input]')
const arlet = document.querySelector('[data-arlet]')
const body = document.querySelector("body")


let count = 0

slPlusBtn.addEventListener('click' , () =>{
    input.value = count++
    arlet.open = false
  
})

slMinusBtn.addEventListener('click' , () =>{
    input.value = count--
    arlet.open = false
})

resetBtn.addEventListener('click' , ()=>{
    count = 0
    input.value = 0
    arlet.open = true
})

