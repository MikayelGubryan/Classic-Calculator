document.addEventListener("DOMContentLoaded", function() {
  const numbers = document.querySelectorAll(".key");
  const operators = document.querySelectorAll(".keys");
  const counter = document.querySelector("#counter");
  const result = document.querySelector(".bottom-key-t");
  const comma = document.querySelector(".bottom-key-s");
  let firstNum = null;
  let secondNum = null;
  let operator = "";

  function clear() {
    firstNum = null;
    secondNum = null;
    operator = "";
    counter.value = "0";
  }

  function calculate() {
    if (operator && firstNum !== null && secondNum !== null) {
      switch (operator) {
        case "+":
          counter.value = parseFloat(firstNum) + parseFloat(secondNum);
          break;
        case "-":
          counter.value = parseFloat(firstNum) - parseFloat(secondNum);
          break;
        case "×":
          counter.value = parseFloat(firstNum) * parseFloat(secondNum);
          break;
        case "÷":
          counter.value = parseFloat(firstNum) / parseFloat(secondNum);
          break;
      }
    }
  }

  function input(key) {
    if (key === "AC") {
      clear();
    } else if (key === "=") {
      calculate();
    } else if (!isNaN(key) || key === ",") {
      if (operator === "") {
        firstNum = firstNum === null ? key : firstNum + key;
        counter.value = parseFloat(firstNum); 
      } else {
        if (!(key === "," && counter.value.includes(","))) {
          secondNum = secondNum === null ? key : secondNum + key;
          counter.value += key;
        }
      } 
    }else if(key === ",") {
      calculate();
    } else {
      if (operator !== "") {
        calculate();
      }
      operator = key;
      counter.value += key;
    }
  }

  numbers.forEach(function(button) {
    button.addEventListener("click", function(event) {
      const key = event.target.textContent;
      input(key);
    });
  });

  operators.forEach(function(operatorButton) {
    operatorButton.addEventListener("click", function(event) {
      const key = event.target.textContent;
      input(key);
    });
  });

    result.addEventListener("click", function(event) {
      input("=");
  });
  
    comma.addEventListener("click", function(event) {
      console.log("exav")
      input(",");
  });
});

  

  