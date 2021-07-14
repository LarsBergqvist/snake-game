
function compareScores(a, b) {
    if (a.score >= b.score) {
        return -1;
    }
    if (a.score < b.score) {
        return 1;
    }
}

export function getIndexInHighScoreList(newUserId, score, highScoreList) {
    const results = [...highScoreList.results];
    const resultsCopy = results.map(r => {
        return {
            id: r.id,
            score: r.score
        }
    });
    resultsCopy.push({
        id: newUserId,
        score
    });

    resultsCopy.sort((a, b) => compareScores(a, b));

    let idxInHighScoreList = resultsCopy.findIndex(r => r.id === newUserId);
    if (idxInHighScoreList > -1 && (idxInHighScoreList + 1 <= highScoreList.maxSize)) {
        return idxInHighScoreList;
    } else {
        return -1;
    }
}