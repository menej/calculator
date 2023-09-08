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
        if (b.length === 10) return;

        if (b === "0") b = number;
        else b += number;
        updateDisplay(b);
    }
}

function operate(e) {
    let operation = e.target.getAttribute("data-key");

    // Check if operation is equals and the current operation is null
    if (operation === "Enter" && op === null) return;

    // Check if operation is already declared
    if (op === null || b === "0") {
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
            a /= b;
            break;
        default:
            console.error("Executed operation does not exists.");
    }

    a = a.toString();
    b = "0";
    if (operation === "Enter") op = null;
    else op = operation;
    updateDisplay(a);
}

function clear(e) {
    a = "0";
    b = "0";
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
let b = "0";
let op = null;
updateDisplay(a);  // Initiate the display
