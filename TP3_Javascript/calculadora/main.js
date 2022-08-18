var canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var letters = "01";
letters = letters.split("");

var fontSize = 10,
  columns = canvas.width / fontSize;

var drops = [];
for (var i = 0; i < columns; i++) {
  drops[i] = 1;
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, .1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < drops.length; i++) {
    var text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = "#0f0";
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
      drops[i] = 0;
    }
  }
}

setInterval(draw, 27);

function changeMode() {
  var i = document.querySelector("#canvasDisplay");
  i.style.display = i.style.display === "block" ? "" : "block";
  var ft = document.querySelector("#ft");
  var disp = document.querySelector("#Display");
  if (i.style.display == "") {
    ft.style.backgroundImage = "linear-gradient(#fffedb00, #0073ff30)";
    disp.style.backgroundColor = "white";
    disp.style.borderColor = "white";
    disp.style.color = "black";
  } else {
    ft.style.backgroundImage = "linear-gradient(#fffedb00, #00ff0090)";
    disp.style.backgroundColor = "#050505";
    disp.style.borderColor = "#0f0";
    disp.style.color = "#0f0";
  }
}

const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operacion: null,
};

function updateDisplay() {
  const display = document.querySelector("#Display");
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", (event) => {
  const { target } = event;

  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operacion")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("backspace")) {
    backSpace();
    updateDisplay();
    return;
  }

  if (target.classList.contains("clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }

  console.log(calculator);
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operacion } = calculator;
  const inputValue = parseFloat(displayValue);

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operacion) {
    const result = calculate(firstOperand, inputValue, operacion);
    calculator.displayValue = `${parseFloat(result.toFixed(4))}`;
    calculator.firstOperand = result;
  }
  calculator.waitingForSecondOperand = true;
  calculator.operacion = nextOperator;
}

function calculate(firstOperand, secondOperand, operacion) {
  if (operacion === "+") {
    return firstOperand + secondOperand;
  } else if (operacion === "-") {
    return firstOperand - secondOperand;
  } else if (operacion === "x") {
    return firstOperand * secondOperand;
  } else if (operacion === "/") {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function backSpace() {
  calculator.displayValue = calculator.displayValue.slice(0, -1);
}

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}
