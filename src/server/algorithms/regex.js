// tinggal .match() kalo mau coockin
const operations = /^(\s*\d+(\.\d+)?\s*([-+*/]\s*\d+(\.\d+)?\s*)*\s*)+&/ig
const date = /(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/\d{4}/g
const delQuestion = /^hapus pertanyaan .*$/i;
const add_question = /^tambah pertanyaan . dengan jawaban .$/i;

function hasMathProperties(string) {
    const mathProperties = /([\s\d-.+/*()])+/ig
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

function isValidDate(string) {
    // string is in the format of dd//mm//yyyy and is to be checked
}
