function KMPSearch(text, pattern) {
    let prefixTable = borderFunction(pattern);
    let i = 0;  // text index
    let j = 0;  // pattern index

    while (i < text.length) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }

        if (j === pattern.length) {
            return i - j;
        } else if (i < text.length && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = prefixTable[j - 1];
            } else {
                i++;
            }
        }
    }

    return -1;
}

function borderFunction(pattern) {
    let prefixTable = [0];
    let i = 0;
    let j = 1;

    while (j < pattern.length) {
        if (pattern[i] === pattern[j]) {
            prefixTable[j] = i + 1;
            i++;
            j++;
        } else if (i === 0) {
            prefixTable[j] = 0;
            j++;
        } else {
            i = prefixTable[i - 1];
        }
    }

    return prefixTable;
}

console.log(KMPSearch('dynasties and distopia', 'd'));

module.exports = { KMPSearch };