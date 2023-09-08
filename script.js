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
}

function operate(e) {
    let operation = e.target.getAttribute("data-key");

    // Check if operation is already declared
    if (op === null || b === null) {
        op = operation;
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

    a = a.toString();
    if (operation === "Enter") {
        op = null;
        b = null;
    }
    else op = operation;
    updateDisplay(a);
}

function clear(e) {
    a = "0";
    b = null;
    op = null;
    updateDisplay(a);
}

document.addEventListener("DOMContentLoaded", () => {
    let clearButton = document.querySelector('button[data-key="Backspace"]');
    clearButton.addEventListener("click", clear);

    let digitButtons = document.querySelectorAll('.digit');


    digitButtons.forEach((button) => button.addEventListener("click", updateDigit));

    let operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach((button) => button.addEventListener("click", operate))
});


let a = "0";
let b = null;
let op = null;
updateDisplay(a);  // Initiate the display
