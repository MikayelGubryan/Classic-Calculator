document.addEventListener("DOMContentLoaded", function() {
    const numbers = document.querySelectorAll(".key");
    const operators = document.querySelectorAll(".keys");
    const counter = document.querySelector("#counter");
  
    let firstNum = null;
    let secondNum = null;
    let operator = "";
  
    function clear() {
      firstNum = null;
      secondNum = null;
      operator = "";
      counter.textContent = "0";
    }
  
    function calculate() {
      if (operator && firstNum !== null && secondNum !== null) {
        switch (operator) {
          case "+":
            counter.textContent = parseFloat(firstNum) + parseFloat(secondNum);
            break;
          case "-":
            counter.textContent = parseFloat(firstNum) - parseFloat(secondNum);
            break;
          case "×":
            counter.textContent = parseFloat(firstNum) * parseFloat(secondNum);
            break;
          case "÷":
            counter.textContent = parseFloat(firstNum) / parseFloat(secondNum);
            break;
        }
      }
    }
  
    function input(key) {
        if (key === "AC") {
          clear();
        } else if (key === "=") {
          calculate();
        } else if (!isNaN(key) || key === ".") {
          if (operator === "") {
            firstNum = firstNum === null ? key : firstNum + key;
            counter.textContent = parseFloat(firstNum); 
          } else {
            secondNum = secondNum === null ? key : secondNum + key;
            counter.textContent += key;
          } 
        } else {
          if (operator !== "") {
            calculate();
          }
          operator = key;
          counter.textContent += " " + operator + " ";
        }
      }
      
      
    numbers.forEach(function(button) {
      button.addEventListener("click", function(event) {
        const key = event.target.textContent;
        input(key);
      });
    });
  });
  