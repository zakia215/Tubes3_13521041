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

function get_answer_string(question, question_db, is_kmp) {
    const is_date = question.match(date);
    const has_math_prop = question.match(hasMathProperties);
    const is_del_question = question.match(del_question);
    const is_add_question = question.match(add_question);

    if (is_date) {
        if (isValidDate(is_date[0])) {
            return getDay(is_date[0]);
        } else {
            return "Tanggal pada pertanyaan tidak valid";
        }
    } else if (has_math_prop) {
        
    } else if (is_del_question) {

    } else if (is_add_question) {

    } else {
        let found = false;
        if (is_kmp) {

        } else {

        }
        if (!found) {
            
        }
    }
}