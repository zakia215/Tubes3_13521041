const {
    del_question,
    add_question
} = require('../algorithms/regex');

const contoh = 3;
let string = "This is a long string";

console.log(string.match(del_question));
