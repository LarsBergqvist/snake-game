import { getIndexInHighScoreList } from './tileset-functions';

test('Highscore position user should make it to leaderboard', () => {
    const highScoreList = {
        maxSize: 10,
        results: [
            { id: 'user1', score: 5 },
            { id: 'user2', score: 4 },
            { id: 'user3', score: 4 },
            { id: 'user3', score: 4 },
            { id: 'user4', score: 2 }
        ]
    }

    expect(getIndexInHighScoreList('user5', 6, highScoreList)).toBe(0);
    expect(getIndexInHighScoreList('user5', 5, highScoreList)).toBe(0);
    expect(getIndexInHighScoreList('user5', 4, highScoreList)).toBe(1);
    expect(getIndexInHighScoreList('user5', 2, highScoreList)).toBe(4);
    expect(getIndexInHighScoreList('user5', 1, highScoreList)).toBe(5);
});


test('Highscore position outside max size', () => {
    const highScoreList = {
        maxSize: 2,
        results: [
            { id: 'user1', score: 3 },
            { id: 'user2', score: 2 }
        ]
    }

    expect(getIndexInHighScoreList('user3', 1, highScoreList)).toBe(-1);
});

