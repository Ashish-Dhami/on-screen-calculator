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
  if (!chained) {
    ans_preview.textContent = roundedResult;
    hidden_preview.classList.remove("hidden");
    return "";
  }
  return roundedResult;
}
function init(displayText = "0") {
  num1 = "0";
  num2 = "";
  operator = null;
  display.textContent = displayText;
  updatePreview();
}
function logger() {
  console.log({ num1, num2, operator });
}
function updatePreview() {
  num1_preview.textContent = num1;
  num2_preview.textContent = num2;
  op_preview.textContent = operator;
  if (num1 || num2 || operator) {
    ans_preview.textContent = "";
    hidden_preview.classList.add("hidden");
  }
}

const display = document.querySelector(".calculator__display");
const buttons = document.querySelector(".calculator__functions");
const num1_preview = document.querySelector(".preview .num1");
const num2_preview = document.querySelector(".preview .num2");
const op_preview = document.querySelector(".preview .operator");
const ans_preview = document.querySelector(".preview .ans");
const hidden_preview = document.querySelector(".preview .hidden");
buttons.addEventListener("click", (e) => {
  let val = e.target.value;
  if (val == "clear") {
    init();
    updatePreview();
    return;
  }
  if (val == "backspace") {
    if (!operator) {
      num1 = num1.slice(0, -1).padEnd(1, "0");
      display.textContent = num1;
    } else {
      num2 = num2.slice(0, -1);
      display.textContent = num2 || num1;
    }
    updatePreview();
    logger();
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
      display.textContent = num1 = parseFloat(num1).toString();
    } else {
      num2 += val;
      display.textContent = num2 = parseFloat(num2).toString();
    }
  }
  updatePreview();
  logger();
});

let num1, num2, operator;
init();

//todo: -ve number support
//todo: float number support
//todo: keyboard support
