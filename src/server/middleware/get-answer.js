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
    // {
    //   question: "",
    //   answer: ""
    // }
    // question_db.length
    const question_list = question.split("--");
    for (let i = 0; i < question_list.length; i++) {
        question_list[i] = question_list[i].trim();
    }
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
        let similar_question = [];
        // for () {
            if (is_kmp) {
                for (let i = 0; i< question_db.length; i++) {
                    if (KMPSearch(question_db[i].question, question) != -1) {
                        similarity_question.push(100);
                    } else {
                        let [count1, count2] = CompareString(question_db[i].question, question);
                        let LD = LevenshteinDistance(question_db[i].question, question);
                        similarity_question.push(100 - LD - 2*(count1-count2));
                    }
                }
            } else {
                for (let i = 0; i< question_db.length; i++) {
                    if (BMSearch(question_db[i].question, question) != -1) {
                        similarity_question.push(100);
                    } else {
                        let [count1, count2] = CompareString(question_db[i].question, question);
                        let LD = LevenshteinDistance(question_db[i].question, question);
                        similarity_question.push(100 - LD - 2*(count1-count2));
                    }
                }
            }
        // }
    }
}