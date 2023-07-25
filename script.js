//Variables
let counter = 0;
let pattern = /\d\D\-?\+?\-?\d/g;
const calcContainer = document.querySelector(".calcContainer");
const calcBody = document.querySelector(".calcBody");
const screen = document.querySelector(".screen");
let btn = document.querySelectorAll(".btn");
const switcher = document.querySelector(".switcher");
const historyBtn = document.querySelector(".historyBtn");
const moon = document.querySelector(".bi-moon-fill");
const sun = document.querySelector(".bi-sun-fill");
const clock = document.querySelector(".bi-clock-fill");

//"Dark" mode adjustment
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  calcBody.classList.toggle("dark");
  switcher.classList.toggle("dark");
  historyBtn.classList.toggle("dark");
  calcContainer.classList.toggle("dark");
  moon.classList = "bi-sun-fill";
  moon.classList.toggle("dark");
  clock.classList.toggle("dark");
}

//Arrays
let numToShow = [];
let numToCalculate = [];
let history = [];
let lastSum = [];
let fullHistory = [];
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const operators = [
  "erase",
  "backSpace",
  "plusAndMinus",
  "division",
  "x",
  "+",
  "-",
  "equal",
];
const specialOper = ["erase", "backSpace", "equal", "plusAndMinus"];

//Button events
btn.forEach((item) => {
  item.onclick = () => {
    let itemId = item.id;
    let itemValue = item.value;

    if (itemId === "erase") {
      erase();
    } else if (itemId === "backSpace") {
      backSpace();
    } else if (itemId === "plusAndMinus") {
      plusAndMinusFunc();
    } else if (itemId === "equal") {
      equal();
    } else if (operators.includes(itemId) && !specialOper.includes(itemId)) {
      numToShow.push(item.textContent);
      numToCalculate.push(itemValue);
      screen.textContent = numToShow.join("");
    } else {
      if (!specialOper.includes(itemId)) {
        numToShow.push(itemValue);
        numToCalculate.push(itemValue);
        screen.textContent = numToShow.join("");
      }
    }

    sameOperCheck();
    fontSize();
  };
});

//Design functions
function fontSize() {
  if (screen.textContent.length >= 7) {
    screen.style.fontSize = "40px";
  }
  if (screen.textContent.length >= 13) {
    screen.style.fontSize = "30px";
  } else if (screen.textContent.length < 10) {
    screen.style.fontSize = "70px";
  }
}

//Functions
function erase() {
  screen.textContent = "";

  return (numToCalculate = []), (numToShow = []), (counter = 0);
}

function backSpace() {
  numToShow.pop();
  numToCalculate.pop();
  screen.textContent = numToShow.join("");
}

function plusAndMinusFunc() {
  if (counter === 0) {
    numToShow.unshift("-");
    numToCalculate.unshift("-");
    screen.textContent = numToShow.join("");

    return (counter = 1);
  } else {
    numToShow.shift();
    numToCalculate.shift();
    screen.textContent = numToShow.join("");

    return (counter = 0);
  }
}

function equal() {
  if (numToCalculate.join("").match(pattern)) {
    let calculateArrayString = numToCalculate.join("");

    history.push(screen.textContent);
    screen.textContent = eval(calculateArrayString);

    fontSize();

    return (
      (numToCalculate = [eval(calculateArrayString)]),
      (numToShow = [eval(calculateArrayString)]),
      (counter = 0),
      (lastSum = [eval(calculateArrayString)])
    );
  } else {
    screen.style.fontSize = "35px";
    screen.textContent = "Calculation error";
    setTimeout(() => (screen.textContent = ""), 1500);

    fontSize();

    return (numToCalculate = []), (numToShow = []), (counter = 0);
  }
}

function sameOperCheck() {
  for (let i = 0; i < numToCalculate.length; i++) {
    if (
      numToCalculate[i] === "-" &&
      numToCalculate[i] === numToCalculate[i - 1]
    ) {
      numToCalculate[i - 1] = "+";
    } else if (
      numToCalculate[i] === "/" &&
      numToCalculate[i] === numToCalculate[i - 1]
    ) {
      numToCalculate[i - 1] = null;
    } else if (
      numToCalculate[i] === "*" &&
      numToCalculate[i] === numToCalculate[i - 1]
    ) {
      numToCalculate[i - 1] = null;
    } else if (
      numToCalculate[i] === "+" &&
      numToCalculate[i] === numToCalculate[i - 1]
    ) {
      numToCalculate[i - 1] = null;
    }
  }
}

//Switch mode button
switcher.onclick = () => {
  calcBody.classList.toggle("dark");
  switcher.classList.toggle("dark");
  historyBtn.classList.toggle("dark");
  calcContainer.classList.toggle("dark");
  clock.classList.toggle("dark");

  if (moon.classList == "bi-sun-fill dark") {
    moon.classList = "bi-moon-fill";
  } else if (moon.classList == "bi-moon-fill") {
    moon.classList = "bi-sun-fill dark";
  }
};

//History button
historyBtn.onclick = () => {
  const lastHistory = history.length - 1;
  let historyItem = history[lastHistory] + "=" + lastSum;

  if (!fullHistory.includes(historyItem) && historyItem != "undefined=") {
    fullHistory.unshift(historyItem);
  }
  screen.textContent = fullHistory[0];
  screen.style.fontSize = "40px";

  if (screen.textContent.length >= 12) {
    screen.style.fontSize = "25px";
  }

  return (numToCalculate = []), (numToShow = []);
};
