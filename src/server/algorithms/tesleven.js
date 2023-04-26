function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(null));
  
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
  
    return dp[m][n];
  }

// ===================================================

// function levenshteinDistance(str1, str2) {
//     const m = str1.length;
//     const n = str2.length;
//     const dp = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(null));
//     const changes = [];
  
//     for (let i = 0; i <= m; i++) {
//       dp[i][0] = i;
//     }
  
//     for (let j = 0; j <= n; j++) {
//       dp[0][j] = j;
//     }
  
//     for (let i = 1; i <= m; i++) {
//       for (let j = 1; j <= n; j++) {
//         const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
//         const deleteCost = dp[i - 1][j] + 1;
//         const insertCost = dp[i][j - 1] + 1;
//         const replaceCost = dp[i - 1][j - 1] + cost;
//         dp[i][j] = Math.min(deleteCost, insertCost, replaceCost);
  
//         if (deleteCost === dp[i][j]) {
//           changes.push(`delete ${str1[i - 1]} from ${str1} at position ${i - 1}`);
//         } else if (insertCost === dp[i][j]) {
//           changes.push(`insert ${str2[j - 1]} into ${str1} at position ${i}`);
//         } else if (replaceCost === dp[i][j] && cost === 1) {
//           changes.push(`replace ${str1[i - 1]} in ${str1} with ${str2[j - 1]} at position ${i - 1}`);
//         }
//       }
//     }
  
//     console.log(changes.join('\n'));
  
//     return dp[m][n];
//   }

function compareString(str1, str2) {
    const list1 = str1.split(" ");
    const list2 = str2.split(" ");
    let miss = 0;
    const ret = [];
    const val = [];
    
    const biggerList = list1.length >= list2.length ? list1 : list2;
    const smallerList = list1.length < list2.length ? list1 : list2;
  
    for (let i = 0; i < smallerList.length; i++) {
      if (!biggerList.includes(smallerList[i])) {
        miss += 1;
        for (let j = 0; j < biggerList.length; j++) {
            if (levenshteinDistance(biggerList[j], smallerList[i]) === 1) {
                val.push(1);
            }
        }
      }
    }
  
    if (miss === 0) {
        ret.push(true);
    } else {
        ret.push(false);
    } 
    ret.push(miss);
    ret.push(val);
    return ret;
  }

const str1 = 'Apa nama ibu kota dari Indonesia?';
const str2 = 'nama ibu kota Indonesia?';

console.log(compareString(str1,str2))
console.log()
console.log(levenshteinDistance(str1, str2))