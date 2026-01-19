function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  let result;
  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      if (b === 0) break;
      result = divide(a, b);
  }
  return result ?? `ERROR!`;
}

function renderResult(chained = true) {
  let result = operate(operator, +num1, +num2);
  if (result == "ERROR!") {
    init(result);
    return;
  }
  let roundedResult = Number.isInteger(result)
    ? result.toString()
    : parseFloat(result.toFixed(6)).toString();
  display.textContent = roundedResult;
  return chained ? roundedResult : "";
}
function init(displayText = "0") {
  num1 = "";
  num2 = "";
  operator = null;
  display.textContent = displayText;
}
function logger() {
  console.log({ num1, num2, operator });
}

const display = document.querySelector(".calculator__display");
const buttons = document.querySelector(".calculator__functions");
buttons.addEventListener("click", (e) => {
  let val = e.target.value;
  if (val == "clear") {
    init();
    return;
  }
  if (isNaN(val)) {
    let chained = val != "=" && !!num1;
    if (operator && num1 && num2) {
      [num1, num2] = [renderResult(chained) ?? "", ""];
    }
    operator = !(chained && num1) ? null : val;
  } else {
    if (!operator) {
      num1 += val;
      display.textContent = parseFloat(num1).toString();
    } else {
      num2 += val;
      display.textContent = parseFloat(num2).toString();
    }
  }
  logger();
});

let num1, num2, operator;
init();

//todo: -ve number support
