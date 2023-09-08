function updateDisplay(number) {
    let display = document.querySelector(".display");
    display.textContent = number;
}

function updateDigit(e) {
    let number = e.target.getAttribute('data-key');
    if (op === null) {
        // Display can display up to 10 digits
        if (a.length === 10) return;

        if (a === "0") a = number;
        else a += number;

        updateDisplay(a);
    } else {
        // Display can display up to 10 digits
        if (b !== null && b.length === 10) return;

        if (b === null || b === "0") b = number;
        else b += number;
        updateDisplay(b);
    }

    unsetActive()
}

function operate(e) {
    let operation = e.target.getAttribute("data-key");

    // Check if operation is already declared
    if (op === null || b === null) {
        op = operation;

        unsetActive()
        if (operation !== 'Enter') setActive(e.target);

        return;
    }

    // Op is declared, do the operation
    a = +a;
    b = +b;
    switch (op) {
        case "+":
            a += b;
            break;
        case "-":
            a -= b;
            break;
        case "*":
            a *= b;
            break;
        case "/":
            if (b === 0) a = "Error";
            else a /= b;
            break;
        default:
            console.error("Executed operation does not exists.");
    }
    a = parseFloat(a.toFixed(5));

    a = a.toString();
    if (operation === "Enter") {
        op = null;
        b = null;
    } else {
        op = operation;
    }
    updateDisplay(a);
}

function unsetActive() {
    let activeOperation = document.querySelector('.bg-active-orange');
    if (activeOperation !== null) activeOperation.classList.remove('bg-active-orange');
}

function setActive(button) {
    button.classList.add('bg-active-orange')
}

function clear(e) {
    a = "0";
    b = null;
    op = null;
    updateDisplay(a);
}

function addFraction() {
    let displayText = document.querySelector('.display').textContent;
    // Note to self: this is badly implemented, should have used a boolean variable
    if (a === displayText && !a.includes(".")) {
        a += ".";
        updateDisplay(a);
    } else if (b === displayText && !b.includes(".")) {
        b += ".";
        updateDisplay(b);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let clearButton = document.querySelector('button[data-key="Backspace"]');
    clearButton.addEventListener("click", clear);

    let digitButtons = document.querySelectorAll('.digit');


    digitButtons.forEach((button) => button.addEventListener("click", updateDigit));

    let operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach((button) => button.addEventListener("click", operate))

    let fractionButton = document.querySelector('button[data-key="."]');
    fractionButton.addEventListener("click", addFraction);
});


let a = "0";
let b = null;
let op = null;
updateDisplay(a);  // Initiate the display
