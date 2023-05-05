class Calculator {
    constructor() {
      this.opStack = [];
      this.valStack = [];
    }
  
    isOperand(c) {
      return /\d/.test(c) || c === '.';
    }
  
    charToInt(c) {
      return c.charCodeAt(0) - '0'.charCodeAt(0);
    }
  
    isOperator(c) {
      return ['+', '-', '*', '/', '^'].includes(c);
    }
  
    precedence(op) {
      switch (op) {
        case '^':
          return 3;
        case '*':
        case '/':
          return 2;
        case '+':
        case '-':
          return 1;
        default:
          return -1;
      }
    }
  
    applyOp(a, b, op) {
      switch (op) {
        case '+':
          return a + b;
        case '-':
          return a - b;
        case '*':
          return a * b;
        case '/':
          if (b === 0) {
            throw new Error("Terdapat Persamaan yang dibagi dengan 0");
          }
          return a / b;
        case '^':
          return Math.pow(a, b);
        default:
          return 0;
      }
    }
  
    clearStacks() {
      while (this.opStack.length > 0) {
        this.opStack.pop();
      }
  
      while (this.valStack.length > 0) {
        this.valStack.pop();
      }
    }
  
    evaluate(tokens) {
      this.clearStacks();
      let i = 0;
      while (i < tokens.length) {
        const c = tokens[i];
        if (c === ' ') {
          i++;
          continue;
        }
        if (this.isOperand(c)) {
          let val = 0;
          let decimal = false;
          let decimalPlace = 1;
          while (i < tokens.length && this.isOperand(tokens[i])) {
            if (tokens[i] === '.') {
              decimal = true;
              i++;
              continue;
            }
            if (decimal) {
              val = val + this.charToInt(tokens[i]) / (10 * decimalPlace);
              decimalPlace *= 10;
            } else {
              val = val * 10 + this.charToInt(tokens[i]);
            }
            i++;
          }
          this.valStack.push(val);
        } else if (this.isOperator(c)) {
          while (this.opStack.length > 0 && this.precedence(c) <= this.precedence(this.opStack[this.opStack.length - 1])) {
            const b = this.valStack.pop();
            const a = this.valStack.pop();
            const op = this.opStack.pop();
            this.valStack.push(this.applyOp(a, b, op));
          }
          this.opStack.push(c);
          i++;
        } else if (c === '(') {
          this.opStack.push(c);
          i++;
        } else if (c === ')') {
          while (this.opStack.length > 0 && this.opStack[this.opStack.length - 1] !== '(') {
            const b = this.valStack.pop();
            const a = this.valStack.pop();
            const op = this.opStack.pop();
            this.valStack.push(this.applyOp(a, b, op));
          }
          if (this.opStack.length === 0) {
            throw new Error("Pada persamaan tersebut terdapat kesalahan tanda kurung!");
          }
          this.opStack.pop();
          i++;
        } else {
          throw new Error("Terdapat karakter yang tidak dikenali yaitu '" + c + "'");
        }
      }
      while (this.opStack.length > 0) {
        const b = this.valStack.pop();
        const a = this.valStack.pop();
        const op = this.opStack.pop();
        this.valStack.push(this.applyOp(a, b, op));
      }
      if (this.valStack.length !== 1) {
        throw new Error("Invalid expression");
      }
      return this.valStack[0];
    }
}


//++++++++++++++++++++++++++++++++++++++++++++++++

const calculator = new Calculator();
let pers1 = ["2 + 3",
            "4 * 5.5 - 2.25",
            "(10 - 5) * 2.5",
            "3.14^2 + 2.5",
            "6 / 0.5 + 4.5",
            "2 * (5 - 3) + 1.5",
            "(3.25 - 1.75) * 4 / 2",
            "2 + 3 * 4 - 5",
            "7.5 / (2.5 + 1.5) - 1.25",
            "2.5^3 - (4.5 - 3.25)"
];

let pers2 = ["3 + 4.5 * 2 - 1.25",
            "5.25 / 0.75 + 2.5 * 3",
            "(4.25 - 1) * 3.5",
            "2^3 + 4 * 1.5",
            "7.5 - 2.25 / 0.75",
            "8 / (2 + 2) * 2.5",
            "(3.5 - 1) * 5 / 2",
            "1.5 + 2.5^2",
            "6.25 / 2.5 - 2.25",
            "2.5^2 - 3 * 1.5"
];

let pers3 = ["3 + 4 / 0",
            "5.5 / (2.25 - 2.25)",
            "4 * 5.5 ( 2.25 )",
            "2.5 ^ (3.5-5.5)",
            "3.75 + 2 * 5",
            "2.5 + (3 * 4 - 10)",
            "4+(5 * 2.25)",
            "$2.5 - 1.25",
            "7 / (2.5 - 2.5)",
            "2.5 ^ -2"
];

for (let i = 0; i < pers3.length; i++){
    try {
      const result = calculator.evaluate(pers3[i]);
      console.log(`Result: ${result}`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
    // console.log()
}

module.exports = {
  Calculator
};