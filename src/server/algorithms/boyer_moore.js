function BMSearch(text, pattern) {
    const n = text.length;
    const m = pattern.length;
    if (m === 0) {
        return [0];
    }
    if (n < m) {
        return [];
    }
  
    const last = LastOccurence(pattern);
    let i = m - 1;
    let j = m - 1;
    const matches = [];
  
    while (i < n) {
        if (text[i] === pattern[j]) {
            if (j === 0) {
                matches.push(i);
                i += m;
                j = m - 1;
            } else {
                i--;
                j--;
            }
        } else {
            const k = last[text[i]] ?? -1;
            i += m - Math.min(j, k + 1);
            j = m - 1;
        }
    }

    return matches;
}
  
function LastOccurence(pattern) {
    const last = {};
    for (let i = 0; i < pattern.length; i++) {
        last[pattern[i]] = i;
    }
    return last;
}

console.log(BMSearch('dynasties and distopia', 'd'));