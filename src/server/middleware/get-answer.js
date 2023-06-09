// 3 * 5
const { Calculator } = require('../algorithms/Calculator');
const { BMSearch } = require('../algorithms/boyer_moore.js');
const { KMPSearch } = require('../algorithms/kmp.js');
const {
    LevenshteinDistance,
    CompareString
} = require('../algorithms/Levenshtein.js');
const {
    date,
    del_question,
    add_question,
    hasMathProperties,
    isValidDate,
    getDay
} = require('../algorithms/regex.js');
const QnA = require('../models/qna.js');


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

const add_qna_to_database = async (newEntry) => {
    try {
        // connectDB("mongodb+srv://stimatri:oHxZfO4TSDR9KyfC@stimatri.ymw1fsj.mongodb.net/SimpleChatGPT?retryWrites=true&w=majority");
        await QnA.create(newEntry);
    } catch (error) {
        console.log(error);
    }
}

const update_qna = async (newEntry) => {
    try {
        await QnA.findOneAndUpdate({ _id: newEntry._id }, { answer: newEntry.answer }, {
            new: true,
            runValidators: true
        });

    } catch (error) {
        console.log(error);
    }
};

const delete_qna_from_database = async (questionRemoved) => {
    try {
        const found = await QnA.findOneAndDelete(questionRemoved);
        if (!found) {
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
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
        const has_math_prop = hasMathProperties(question_list[j]);
        const is_del_question = question_list[j].match(del_question);
        const is_add_question = question_list[j].match(add_question);
        if (is_date) {
            if (isValidDate(is_date[0])) {
                answer_list.push(getDay(is_date[0]));
            } else {
                answer_list.push("Format tanggal tidak sesuai");
            }
        } else if (has_math_prop.length != 0) {
            const calculator = new Calculator();
            if (has_math_prop.length === 1) {
                try {
                    const result = calculator.evaluate(has_math_prop[0]);
                    // console.log(`Result: ${result}`);
                    if (Number.isNaN(result)) {
                        answer_list.push('Persamaan tidak dapat diselesaikan karena persamaan tidak sesuai.')
                    } else {
                        answer_list.push(`Hasil dari persamaan tersebut adalah ${result}`);
                    }
                } catch (error) {
                    // console.log(`Error: ${error.message}`);
                    answer_list.push(error.message);
                }
            } else {
                let ansCalStr = `Dari pertanyaan yang diberikan, terdapat ${has_math_prop.length} persamaan. Berikut adalah hasilnya\n`
                for (let i = 0; i < has_math_prop.length; i++) {
                    if (i != 0) {
                        ansCalStr += "\n";
                    }
                    try {
                        const result = calculator.evaluate(has_math_prop[i]);
                        // console.log(`Result: ${result}`);
                        if (Number.isNaN(result)) {
                            ansCalStr += `${i + 1}. Persamaan tidak dapat diselesaikan karena persamaan tidak sesuai.`;
                        } else {
                            ansCalStr += `${i + 1}. Hasil dari persamaan tersebut adalah ${result}`;
                        }
                    } catch (error) {
                        // console.log(`Error: ${error.message}`);
                        ansCalStr += `${i + 1}. ${error.message}`;
                    }
                }
                answer_list.push(ansCalStr);
            }
        } else if (is_del_question) {
            let similarity = [];
            let found_exact = false;
            if (is_kmp) {
                for (let i = 0; i < question_db.length; i++) {
                    if (KMPSearch(question_db[i].question.trim(), is_del_question[1]) != -1) {
                        similarity.slice(0, 0, {
                            index: i,
                            value: 100
                        });
                        delete_qna_from_database({ _id: question_db[i]._id });
                        answer_list.push("Pertanyaan berhasil dihapus dari database");
                        found_exact = true;
                        break;
                    } else {
                        let [count1, count2] = CompareString(question_db[i].question, is_del_question[1]);
                        let LD = LevenshteinDistance(question_db[i].question, is_del_question[1]);
                        const lev_value = 100 - LD - 2 * ((count1 - count2) ** 2) + count2;
                        if (lev_value > 70) {
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
                    if (BMSearch(question_db[i].question, is_del_question[1]) != -1) {
                        similarity.slice(0, 0, {
                            index: i,
                            value: 100
                        });
                        delete_qna_from_database({ _id: question_db[i]._id });
                        answer_list.push("Pertanyaan berhasil dihapus dari database");
                        found_exact = true;
                        break;
                    } else {
                        let [count1, count2] = CompareString(question_db[i].question, is_del_question[1]);
                        let LD = LevenshteinDistance(question_db[i].question, is_del_question[1]);
                        const lev_value = 100 - LD - 2 * ((count1 - count2) ** 2) + count2;
                        if (lev_value > 70) {
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
                    answer_list.push("Jawaban tidak ada dalam database");
                } else {
                    const max = similarity[0].value;
                    if (max > 90) {
                        delete_qna_from_database({ _id: question_db[similarity[0].index]._id });
                        answer_list.push("Jawaban berhasil dihapus dari database");
                    } else {
                        let answer_string = "Pertanyaan tidak ditemukan di database.";
                        answer_list.push(answer_string);
                    }
                }
            }
        } else if (is_add_question) {
            const newQuestion = is_add_question[1];
            const newAnswer = is_add_question[2];
            const newEntry = {
                question: newQuestion,
                answer: newAnswer
            }

            let similarity = [];
            let found_exact = false;
            if (is_kmp) {
                for (let i = 0; i < question_db.length; i++) {
                    if (KMPSearch(question_db[i].question.trim(), is_add_question[1]) != -1) {
                        similarity.slice(0, 0, {
                            index: i,
                            value: 100
                        });
                        update_qna({ _id: question_db[i]._id, answer: newAnswer });
                        answer_list.push("Jawaban berhasil di-update");
                        found_exact = true;
                        break;
                    } else {
                        let [count1, count2] = CompareString(question_db[i].question, is_add_question[1]);
                        let LD = LevenshteinDistance(question_db[i].question, is_add_question[1]);
                        const lev_value = 100 - LD - 2 * ((count1 - count2) ** 2) + count2;
                        if (lev_value > 75) {
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
                    if (BMSearch(question_db[i].question, is_add_question[1]) != -1) {
                        similarity.slice(0, 0, {
                            index: i,
                            value: 100
                        });
                        update_qna({ _id: question_db[i]._id, answer: newAnswer });
                        answer_list.push("Jawaban berhasil di-update");
                        found_exact = true;
                        break;
                    } else {
                        let [count1, count2] = CompareString(question_db[i].question, is_add_question[1]);
                        let LD = LevenshteinDistance(question_db[i].question, is_add_question[1]);
                        const lev_value = 100 - LD - 2 * ((count1 - count2) ** 2) + count2;
                        if (lev_value > 70) {
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
                    add_qna_to_database(newEntry);
                    answer_list.push("Menambahkan jawaban ke dalam database");
                } else {
                    const max = similarity[0].value;
                    if (max > 90) {
                        update_qna({ _id: question_db[i]._id, answer: newAnswer });
                        answer_list.push("Jawaban berhasil di-update");
                    } else {
                        add_qna_to_database(newEntry);
                        let answer_string = "Menambahkan jawaban ke dalam database";
                        answer_list.push(answer_string);
                    }
                }
            }

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
                        if (lev_value > 70) {
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
                        if (lev_value > 70) {
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
                        let answer_string = "Pertanyaan tidak ditemukan di database.\nApakah maksud anda:\n";

                        const upperBound = Math.min(similarity.length, 3);
                        for (let i = 0; i < upperBound; i++) {
                            if (i != 0) {
                                answer_string += "\n";
                            }
                            answer_string += (i + 1) + ". " + question_db[similarity[i].index].question;
                        }
                        answer_list.push(answer_string);
                    }
                }
            }
        }
    }

    let answer_string = "";

    if (answer_list.length == 1) {
        answer_string += answer_list[0];
    } else {
        for (let i = 0; i < answer_list.length; i++) {
            if (i != 0) {
                answer_string += "\n\n";
            }
            answer_string += "- " + question_list[i] + "\n\n";
            answer_string += answer_list[i];
        }
    }
    return answer_string;
}

// const qna_db = [
//     {
//         question: "Apa ibukota indonesia?",
//         answer: "Jakarta"
//     },
//     {
//         question: "Why are you gay?",
//         answer: "Who says I'm gay?"
//     },
//     {
//         question: "Siapa wakil presiden indonesia?",
//         answer: "Ibumu"
//     },
//     {
//         question: "What is it all about?",
//         answer: "It's about drive it's about power"
//     },
//     {
//         question: "Aku dari mana?",
//         answer: "Tegal"
//     },
//     {
//         question: "Fee Fi fo fum?",
//         answer: "Jakarta"
//     }
// ]

// connectDB("mongodb+srv://stimatri:oHxZfO4TSDR9KyfC@stimatri.ymw1fsj.mongodb.net/SimpleChatGPT?retryWrites=true&w=majority");
// const answer_list = get_answer_string("tambah pertanyaan fiesta dengan jawaban chicken nugget", qna_db, true);
// console.log(answer_list);
// const to_add = {
//     question: "Apa ibukota indonesia?",
//     answer: "Jakarta"
// }

module.exports = {
    get_answer_string
}
