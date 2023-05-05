// tinggal .match() kalo mau coockin
const operations = /^(\s*\d+(\.\d+)?\s*([-+*/]\s*\d+(\.\d+)?\s*)*\s*)+&/ig
const date = /(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/\d{4}/g
const del_question = /^hapus pertanyaan (.+) dari.* database$/i;
const add_question = /^tambah pertanyaan (.+) jawaban (.+)$/i;

function hasMathProperties(string) {
    const mathProperties = /((\d+(\.\d+)?)||[\s-+/*^()])+/ig
    const matches = string.match(mathProperties);
    const result = []
    for (let match of matches) {
        const trimmed = match.trim();
        if (trimmed !== '') {
            result.push(trimmed);
        }
    }
    return result;
}

function checkLeapYear(year) {
    return ((0 == year % 4) && (0 != year % 100) || (0 == year % 400))
}

function isValidDate(string) {
    // string is in the format of dd//mm//yyyy and is to be checked
    const dateMatch = string.slice(0, 2);
    const monthMatch = string.slice(3, 5);
    const yearMatch = string.slice(6, 10);
    if (monthMatch === '04' || monthMatch === '06' || monthMatch === '09' || monthMatch === '11') {
        if (dateMatch === '31') {
            return false;
        }
    } else if (monthMatch === '02') {
        let bottomBound = 28;
        if (checkLeapYear(Number(yearMatch))) {
            bottomBound++;
        }
        if (Number(dateMatch) > bottomBound) {
            return false;
        }
    }
    return true;
}

function getDay(validDate) {
    const dateMatch = validDate.slice(0, 2);
    const monthMatch = validDate.slice(3, 5);
    const yearMatch = validDate.slice(6, 10);
    const date1 = new Date(monthMatch + '/' + dateMatch + '/' + yearMatch);
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekday[date1.getDay()];
}

// console.log(isValidDate('31/04/2003'));
// console.log(isValidDate('29/02/2003'));
// console.log(isValidDate('29/02/2004'));
// console.log(isValidDate('31/01/2004'));

// const question_string = "Apa ibukota indonesia?"
// const question_list = question_string.split("--");
// for (let i = 0; i < question_list.length; i++) {
//     console.log(question_list[i].trim());
// }

// const str = "Hapus pertanyaan in the biningging dari dalam database";
// const match = str.match(del_question);

// if (match) {
//     console.log(match);
//     const pertanyaan = match[1];
//     console.log("Pertanyaan: ", pertanyaan);
// } else {
//     console.log("String tidak cocok dengan regex.");
// }

// const string = "hasil dari 2.5 ^ (3.5-5.5) dan hasil dari 5 + 7";
// const noMatch = "Ini harusnya gak match.";
// const mathResult = hasMathProperties(noMatch);
// console.log(mathResult);
// console.log(eval('5 * 8 - 10 + - + / 3'));

module.exports = {
    operations,
    date,
    del_question,
    add_question,
    hasMathProperties,
    isValidDate,
    getDay,
}
