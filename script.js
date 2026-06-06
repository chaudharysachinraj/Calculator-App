const display = document.querySelector(".display");

function addToDisplay(input) {
  // Cursor ko end par rakho
  display.scrollLeft = display.scrollWidth;

  const operators = ["+", "-", "*", "/", "%"];
  const lastChar = display.value.slice(-1);

  // Operator number ke baad he lagne chahiye
  if (display.value === "") {

    if (input === "-" || input === ".") {
      display.value += input;
      return;
    }

    // + - / * allow hai
    if (["+", "*", "/", "%"].includes(input)) {
      return;
    }
  }

   // Ek se jyada operators na aaye
  if (operators.includes(input)) {
    if (operators.includes(lastChar)) {
      display.value =
        display.value.slice(0, -1) + input;
      return;
    }
  }

  // Normal input add karo
  display.value += input;
}



// display clear karne ke liye
function clearDisplay() {
  display.value = "";
}



// calclulation ke liye eval ka use karenge
function calculate() {
  try {
    let expression = display.value;

    expression = expression.replace(
      /(\d+(?:\.\d+)?)\+(\d+(?:\.\d+)?)%/g,
      (_, a, b) => `${a}+(${a}*${b}/100)`
    );

    expression = expression.replace(
      /(\d+(?:\.\d+)?)\-(\d+(?:\.\d+)?)%/g,
      (_, a, b) => `${a}-(${a}*${b}/100)`
    );

    expression = expression.replace(
      /(\d+(?:\.\d+)?)\*(\d+(?:\.\d+)?)%/g,
      (_, a, b) => `${a}*(${b}/100)`
    );

    expression = expression.replace(
      /(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)%/g,
      (_, a, b) => `${a}/(${b}/100)`
    );

    display.value = eval(expression);
  } catch {
    display.value = "Error";
  }
}



// delete last character
function backspace() {
  display.value = display.value.slice(0, -1);
}



// Keyboard support
document.addEventListener("keydown", (e) =>{

  // Number
  if("0123456789".includes(e.key)){
    addToDisplay(e.key);
  }

  // Operators
  if("+-*/.%".includes(e.key)){
    addToDisplay(e.key);
  }
  // Enter = Calculate
  if(e.key === "Enter"){
    calculate();
  }

  //Backspace = delete
  if(e.key === "Backspace"){
    backspace();
  }

  // Escape = Clear
  if (e.key === "Escape"){
    clearDisplay();
  }
});

