function levenshteinDistanceWithScore(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(null));
    const score = [];
  
    for (let i = 0; i <= m; i++) {
      dp[i][0] = i;
    }
  
    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }
  
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // delete
          dp[i][j - 1] + 1, // insert
          dp[i - 1][j - 1] + cost // replace
        );
      }
    }
  
    const levenshteinDistance = dp[m][n];
    score.push(levenshteinDistance);
  
    // calculate luck score
    let maxMatchLength = 0;
    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        let k = 0;
        while (i + k < m && j + k < n && str1[i + k] === str2[j + k]) {
          k++;
        }
        if (k > maxMatchLength) {
          maxMatchLength = k;
        }
      }
    }
    const luckScore = m + n - (2 * maxMatchLength);
    score.push(luckScore);
  
    return score;
  }

const str1 = 'Apa nama ibu kota dari Indonesia?';
const str2 = 'nama ibu kota Indonesia';
const [distance, score] = levenshteinDistanceWithScore(str1, str2);
console.log(`Jarak Levenshtein antara ${str1} dan ${str2} adalah ${distance}`);
console.log(`Nilai keberuntungan string antara ${str1} dan ${str2} adalah ${score}`);