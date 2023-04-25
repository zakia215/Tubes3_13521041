function KMPSearch(text, pattern) {
    let prefixTable = getPrefixTable(pattern);
    let textIndex = 0;
    let patternIndex = 0;

    while (textIndex < text.length) {
        if (pattern[patternIndex] === text[textIndex]) {
            textIndex++;
            patternIndex++;
        }

        if (patternIndex === pattern.length) {
            return textIndex - patternIndex;
        } else if (textIndex < text.length && pattern[patternIndex] !== text[textIndex]) {
            if (patternIndex !== 0) {
                patternIndex = prefixTable[patternIndex - 1];
            } else {
                textIndex++;
            }
        }
    }

    return -1;
}

function getPrefixTable(pattern) {
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