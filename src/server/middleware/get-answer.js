// 3 * 5
const { BMSearch } = require('../algorithms/boyer_moore.js');
const { KMPSearch } = require('../algorithms/kmp.js');
const {
    LevenshteinDistance,
    CompareString
} = require('../algorithms/Levenshtein.js');
const {
    operations,
    date,
    del_question,
    add_question,
    hasMathProperties,
    isValidDate,
    getDay
} = require('../algorithms/regex.js');

function insert_descending(arr, obj) {
    let inserted = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].value < obj.value) {
            inserted = true;
            arr.splice(i, 0, obj);
            break;
        }
    }
    if (!inserted) {
        arr.push(obj);
    }
}

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
    
    let answer_list = [];
    
    for (let j = 0; j < question_list.length; j++) {
        const is_date = question_list[j].match(date);
        const has_math_prop = question_list[j].match(hasMathProperties);
        const is_del_question = question_list[j].match(del_question);
        const is_add_question = question_list[j].match(add_question);
        if (is_date) {
            if (isValidDate(is_date[0])) {
                answer_list.push(getDay(is_date[0]));
            } else {
                answer_list.push("Format tanggal tidak sesuai");
            }
        } else if (has_math_prop) {
            
        } else if (is_del_question) {

        } else if (is_add_question) {

        } else {
            /**
             * {
             *    index: integer,
             *    value: double
             */
            let similarity = [];
            let found_exact = false;
            if (is_kmp) {
                for (let i = 0; i < question_db.length; i++) {
                    if (KMPSearch(question_db[i].question, question_list[j]) != -1) {
                        similarity.slice(0, 0, {
                            index: i,
                            value: 100
                        });
                        answer_list.push(question_db[i].answer);
                        found_exact = true;
                        break;
                    } else {
                        let [count1, count2] = CompareString(question_db[i].question, question_list[j]);
                        let LD = LevenshteinDistance(question_db[i].question, question_list[j]);
                        const lev_value = 100 - LD - 2 * ((count1 - count2) ** 2) + count2;
                        if (lev_value > 60) {
                            const obj = {
                                index: i,
                                value: lev_value
                            }
                            insert_descending(similarity, obj);
                        }
                    }
                }
            } else {
                for (let i = 0; i < question_db.length; i++) {
                    if (BMSearch(question_db[i].question, question_list[j]) != -1) {
                        similarity.slice(0, 0, {
                            index: i,
                            value: 100
                        });
                        answer_list.push(question_db[i].answer);
                        found_exact = true;
                        break;
                    } else {
                        let [count1, count2] = CompareString(question_db[i].question, question_list[j]);
                        let LD = LevenshteinDistance(question_db[i].question, question_list[j]);
                        const lev_value = 100 - LD - 2 * ((count1 - count2) ** 2) + count2;
                        if (lev_value > 60) {
                            const obj = {
                                index: i,
                                value: lev_value
                            }
                            insert_descending(similarity, obj);
                        }
                    }
                }
            }

            if (!found_exact) {
                if (similarity.length == 0) {
                    answer_list.push("Tidak ada jawaban di database");
                } else {
                    const max = similarity[0].value;
                    if (max > 90) {
                        answer_list.push(question_db[similarity[0].index].answer);
                    } else {
                        let answer_string = "Pertanyaan tidak ditemukan di database.\nApakah maksud anda:\n"
                        const upperBound = Math.min(similarity.length, 3);
                        for (let i = 0; i < upperBound; i++) {
                            answer_string += (i + 1) + ". " + question_db[similarity[i].index].question + "\n";
                        }
                        answer_list.push(answer_string);
                    }
                }
            }
        }
    }

    return answer_list;
}

const qna_db = [
    {
        question: "Apa ibukota indonesia?",
        answer: "Jakarta"
    },
    {
        question: "Why are you gay?",
        answer: "Who says I'm gay?"
    },
    {
        question: "Siapa wakil presiden indonesia?",
        answer: "Ibumu"
    },
    {
        question: "What is it all about?",
        answer: "It's about drive it's about power"
    },
    {
        question: "Aku dari mana?",
        answer: "Tegal"
    },
    {
        question: "Fee Fi fo fum?",
        answer: "Jakarta"
    }
]

const answer_list = get_answer_string("Fiesta yang dimaksud apa si?--28/02/2003", qna_db, true);
console.log(answer_list);
