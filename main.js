document.addEventListener("DOMContentLoaded", function() {
  const keys = document.querySelector(".calculator-keys");
  const display = document.querySelector(".calculator-screen");
  let firstValue = null;
  let waitingForSecondValue = false;
  let displayValue = "0";
  let operator = null;
  let equalsButton;

  const buttons = [
    { text: "AC", value: "all-clear", class: "all-clear" },
    { text: "+/-", value: "+/-", class: "operator" },
    { text: "%", value: "%", class: "operator" },
    { text: "/", value: "/", class: "operator" },
    { text: "7", value: "7", class: "" },
    { text: "8", value: "8", class: "" },
    { text: "9", value: "9", class: "" },
    { text: "*", value: "*", class: "operator" },
    { text: "4", value: "4", class: "" },
    { text: "5", value: "5", class: "" },
    { text: "6", value: "6", class: "" },
    { text: "-", value: "-", class: "operator" },
    { text: "1", value: "1", class: "" },
    { text: "2", value: "2", class: "" },
    { text: "3", value: "3", class: "" },
    { text: "+", value: "+", class: "operator" },
    { text: "0", value: "0", class: "zero" },
    { text: ",", value: ",", class: "operator" },
    { text: "=", value: "=", class: "operator" },
  ];

  buttons.forEach((button) => {
    let btn = document.createElement("button");
    btn.innerText = button.text;
    btn.value = button.value;

    if (button.class) {
      btn.classList.add(button.class);
    }

    keys.appendChild(btn);

    btn.addEventListener("click", function() {
      const value = this.value;
      if (value === "all-clear") {
        clear();
      } else if (value === "=") {
        handleEquals();
      } else if (value === "+/-") {
        // Handle positive/negative toggle
        displayValue = displayValue * -1;
        updateDisplay();
      } else {
        handleButton(value);
      }
    });

    if (button.value === "=") {
      equalsButton = btn;
    }
  });

  let calculate = {
    "/": (firstValue, secondValue) => firstValue / secondValue,
    "*": (firstValue, secondValue) => firstValue * secondValue,
    "+": (firstValue, secondValue) => firstValue + secondValue,
    "-": (firstValue, secondValue) => firstValue - secondValue,
    "%": (firstValue, secondValue) => firstValue % secondValue,
  };

  function updateDisplay() {
    display.value = displayValue;
  }

  function inputDecimal(dot) {
    if (!displayValue.includes(dot)) {
      displayValue += dot;
    }
  }

  function inputNumber(number) {
    if (waitingForSecondValue) {
      displayValue = number;
      waitingForSecondValue = false;
    } else {
      displayValue = displayValue === "0" ? number : displayValue + number;
    }
  }

  function handleButton(nextValue) {
    console.log("Button clicked:", nextValue);
    if (!isNaN(nextValue) || nextValue === ".") {
      inputNumber(nextValue);
    } else {
      if (operator !== null && !waitingForSecondValue) {
        result();
      }
      operator = nextValue;
      waitingForSecondValue = true;
      firstValue = parseFloat(displayValue);
    }
    updateDisplay();
  }

  function handleEquals() {
    console.log("Equals button clicked");
    if (operator && !waitingForSecondValue) {
      result();
      updateDisplay();
    }
  }

  function clear() {
    firstValue = null;
    waitingForSecondValue = false;
    operator = null;
    displayValue = "0";
    updateDisplay();
  }

  function result() {
    console.log("Result function called");
    const secondValue = parseFloat(displayValue);
    console.log("Second value:", secondValue);

    if (operator === "/" && secondValue === 0) {
      console.log("Division by zero");
      displayValue = "Error";
    } else {
      const result = calculate[operator](firstValue, secondValue);
      console.log("Result:", result);
      displayValue = String(result);
    }

    console.log("Display value after calculation:", displayValue);

    firstValue = parseFloat(displayValue);
    operator = null;
    waitingForSecondValue = false;
  }

  equalsButton.addEventListener("click", handleEquals);
});
