// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  if (isNaN(dividend) || isNaN(divider)) {
    document.body.innerText = "Something critical went wrong. Please reload the page";
    console.error("Something critical went wrong. Please reload the page");
  } else if (divider <= 0) {
    result.innerText = "Division not performed. Invalid number provided. Try again";
    console.error("Division not performed. Invalid number provided. Try again");
  } else {

    result.innerText = Math.floor(dividend / divider);

  }
});



//The below code is my implimentation for try catch error

// const form = document.querySelector("[data-form]");
// const result = document.querySelector("[data-result]");

// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   try {
//     const entries = new FormData(event.target);
//     const { dividend, divider } = Object.fromEntries(entries);

//     if (isNaN(dividend) || isNaN(divider)) {
//       throw new Error("Something critical went wrong. Please reload the page");
//     } else if (divider <= 0) {
//       throw new Error("Division not performed. Invalid number provided. Try again");
//     } else {
//       const quotient = Math.floor(dividend / divider);
//       result.innerText = quotient.toString();
//     }
//   } catch (error) {
//     result.innerText = error.message;
//     console.error(error.message);
//   }
// });




