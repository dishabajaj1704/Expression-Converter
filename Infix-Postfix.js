const ARRMAX = 100;
const SS = 100;
const OPERATOR = (-10);
const OPERAND = (-20);
const LEFTPAREN = (-30);
const RIGHTPAREN = (-40);
const ADDPREC = 1;
const SUBPREC = 1;
const MULPREC = 2;
const DIVPREC = 2;
const MODPREC = 2;
const NONE = 999;

/* STACK OPERATIONS */
//Top is the special keyword in js so we cant use it

var infix_Array = Array(ARRMAX).fill(0);
var balancedParen;
var items;
var postfix;
var t = -1;
var showIndexTill = 0;
var inputf;


/**Dom elements */
var convert = document.getElementById('convert');
var prefix_rb = document.getElementById('prefix_rb');
var postfix_rb = document.getElementById('postfix_rb');
var postfix_ans = document.getElementById('postfix_ans');
var prefix_ans = document.getElementById('prefix_ans');
convert.addEventListener('click', showAns)

function showAns(evt) {
    inputf = document.getElementById('inputf').value;
    if (inputf == "") {
        window.alert("TextField is empty!");
    } else {
        infix_Array = [...inputf];
        const inputLength = infix_Array.length
        items = Array(inputLength).fill(0);
        postfix = Array(inputLength).fill(0);
        if (postfix_rb.checked) {
            console.log(infix_Array)

            infixToPostFix();
            console.log(postfix);
            postfix = postfix.slice(0, showIndexTill);
            postfix = postfix.join("")
            postfix_ans.setAttribute('class', 'ans');
            postfix_ans.innerHTML = "Postfix Expression: " + postfix;
            console.log(items);
        }


    }
    if (prefix_rb.checked) {
        let q = 0;
        var reversedArray = infix_Array.reverse();
        for (let i = 0; i < reversedArray.length; i++) {
            if (reversedArray[i] == '(') {
                reversedArray[i] = ')';
            }
            else if (reversedArray[i] == ')') {
                reversedArray[i] = '(';
            }
        }

        infix_Array = reversedArray;
        console.log(infix_Array);
        infixToPostFix();
        postfix = postfix.slice(0, showIndexTill);
        let prefix = postfix.reverse();

        prefix = prefix.join("")
        prefix_ans.setAttribute('class', 'ans');
        prefix_ans.innerHTML = "Prefix Expression: " + prefix;


    }

}

function getType(sym) {
    switch (sym) {
        case '(':
            return LEFTPAREN;
        case ')':
            return RIGHTPAREN;
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
            return OPERATOR;
        default:
            return OPERAND;
    }
}

function getPrec(sym) {
    switch (sym) {
        case '+':
            return ADDPREC;
        case '-':
            return SUBPREC;
        case '*':
            return MULPREC;
        case '/':
            return DIVPREC;
        case '%':
            return MODPREC;
        case '(':
            return LEFTPAREN;
        default:
            return NONE;
    }
}
function isEmpty() {
    if (t == -1) {
        return 1;
    } else {
        return 0;
    }
}

function isFull() {
    if (t == SS - 1) {
        return true;
    } else {
        return false;
    }
}

function push(sym) {
    console.log("SYmbol:- " + sym);
    if (isFull()) {
        console.log("Stack OverFolow!");
        return false;
    } else {
        t++;
        console.log(t);
        items[t] = sym;
        console.log(items);
        return true;
    }
}

function stackTop() {
    return items[t];
}

function pop() {
    if (isEmpty()) {
        console.log("Stack UnderFlow!");
        return;
    } else {
        var poppedElem = items[t];
        t--;
        console.log(t);
        return poppedElem;

    }
}


function peek() {
    if (isEmpty()) {
        console.log("Stack UnderFlow!");
        return;
    } else {
        return items[t];
    }
}

function infixToPostFix() {
    // As we know Infix contains brackets and postfix don't so if we are on 13th char in infix doesn't mean postfix contains 12 elements
    // The length of postfix array will be small than Infix
    // i and p indexes are for to keep track on infix and postfix array
    var i, p, len, type, currPrec;
    var currentsym, poppedElement;
    len = infix_Array.length;
    i = 0;
    p = 0;
    while (i < len) {
        currentsym = infix_Array[i];
        type = getType(currentsym);
        switch (type) {
            case LEFTPAREN:
                push(currentsym);
                break;

            case OPERATOR:
                currPrec = getPrec(currentsym);
                let stackTopPrec = getPrec(stackTop());
                console.log("Current Prec:- " + currPrec);
                console.log("Stack top precedence:- " + stackTopPrec);
                while (isEmpty() == 0 && currPrec <= stackTopPrec) {
                    console.log("Hereeeee");
                    postfix[p++] = pop();
                }
                push(currentsym);
                console.log(t);
                console.log("Current symbol is pushed");
                break;
            case OPERAND:
                postfix[p++] = currentsym;
                break;
            case RIGHTPAREN:
                while (getType((poppedElement = pop())) != LEFTPAREN) {
                    postfix[p++] = poppedElement;
                }
        }
        console.log(postfix);
        i++;
    } // end of while

    while (isEmpty() == 0) {
        poppedElement = pop();
        console.log(poppedElement);
        if (getType(poppedElement) == LEFTPAREN) {
            console.log("\nInvalid Infix Expression Given!!");

        }

        postfix[p++] = poppedElement;
    }

    showIndexTill = p;
}


function BalancedParenthesis() {

}

