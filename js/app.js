
const currentInput = document.querySelector('.currentInput');
const answerScreen = document.querySelector('.answerScreen');
const buttons = document.querySelectorAll('button');
const erasebtn = document.querySelector('#erase');
const clearbtn = document.querySelector('#clear');


let realTimeScreenValue = [];
let currentNumber = "";
let previousNumber = "";
let operator = null;
let resultShown = false; // controle para saber se o último clique foi "="


const operadores = {
  somar: (a, b) => a + b,
  subtrair: (a, b) => a - b,
  multiplicar: (a, b) => a * b,
  dividir: (a, b) => (b === 0 ? "Erro" : a / b)
};

clearbtn.addEventListener("click", () => {
  realTimeScreenValue = [];
  currentNumber = "";
  previousNumber = "";
  operator = null;
  resultShown = false;
  currentInput.textContent = "";
  answerScreen.textContent = "0";
  answerScreen.style.color = "rgba(150, 150, 150, 0.87)";
});

erasebtn.addEventListener("click", () => {
  if (resultShown) return; // não apaga resultado
  currentNumber = currentNumber.slice(0, -1);
  realTimeScreenValue.pop();
  currentInput.textContent = realTimeScreenValue.join('');
});


buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.id === "erase" || btn.id === "clear") return;

    
    if (btn.classList.contains("num_btn")) {
      
      if (resultShown) {
        currentNumber = "";
        realTimeScreenValue = [];
        resultShown = false;
      }

      currentNumber += btn.value;
      realTimeScreenValue.push(btn.value);
      currentInput.textContent = realTimeScreenValue.join('');
    }


    if (btn.classList.contains("fun_btn")) {
      const funButton = btn.id;

      switch (funButton) {
        case "somar":
        case "subtrair":
        case "multiplicar":
        case "dividir":
          if (currentNumber === "" && !previousNumber) return;

          if (resultShown) {
            resultShown = false;
          }

          if (previousNumber && operator && currentNumber) {
            previousNumber = operadores[operator](
              parseFloat(previousNumber),
              parseFloat(currentNumber)
            ).toString();
          } else if (!previousNumber) {
            previousNumber = currentNumber;
          }

          operator = funButton;
          currentNumber = "";
          realTimeScreenValue.push(btn.textContent);
          currentInput.textContent = realTimeScreenValue.join('');
          answerScreen.textContent = previousNumber;
          break;

        case "calcular":
          if (previousNumber && operator && currentNumber) {
            const result = operadores[operator](
              parseFloat(previousNumber),
              parseFloat(currentNumber)
            );
            answerScreen.textContent = result;
            currentInput.textContent = result;

         
            previousNumber = result.toString();
            currentNumber = "";
            operator = null;
            realTimeScreenValue = [result.toString()];
            resultShown = true; 
          }
          break;
      }
    }
  });
});
