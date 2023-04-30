// 3 * 5
const bm = require('../algorithms/boyer_moore');
const kmp = require('../algorithms/kmp');
const {
    operations,
    date,
    del_question,
    add_question,
    hasMathProperties,
    isValidDate,
    getDay
} = require('../algorithms/regex');

function get_answer_string(question, question_db) {
    const is_date = question.match(date);
    const has_math_prop = question.match(hasMathProperties);
    const is_del_question = question.match(del_question);
    const add_question = question.match(add_question);

    if (is_date) {
        
    }
}