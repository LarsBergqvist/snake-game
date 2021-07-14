import { Down, Id_Border, Id_Empty, Id_Food, Id_SnakeSegMin, Left, Right, Up } from '../constants';

export function generateTileSet(size, snake, food) {
    let newTilesArray = [];
    for (let i = 0; i < size * size; i++) {
        if (i === 0) {
            newTilesArray[i] = Id_Border;
        } else {
            newTilesArray[i] = Id_Empty;
        }
    }
    return applySnakeAndFoodOnTiles(size, newTilesArray, snake, food);
}

export function getNewFoodPos(size, snake) {
    let validPosFound = false;
    let newPos = undefined;
    while (!validPosFound) {
        const x = Math.floor(Math.random() * (size - 2) + 1);
        const y = Math.floor(Math.random() * (size - 2) + 1);
        let idx = snake.findIndex(pos => pos.x === x && pos.y === y);
        if (idx === -1) {
            validPosFound = true;
            newPos = { x, y };
        }
    }

    return newPos;
}


export function isValidMove(oldDirection, newDirection) {
    if ((newDirection === oldDirection) ||
        (newDirection === Left && oldDirection === Right) ||
        (newDirection === Right && oldDirection === Left) ||
        (newDirection === Up && oldDirection === Down) ||
        (newDirection === Down && oldDirection === Up)) {
        return false;
    }

    return true;
}

export function getNextHeadPosition(direction, oldPosition) {
    let x = oldPosition.x;
    let y = oldPosition.y;
    if (direction === Up) {
        y--;
    } else if (direction === Down) {
        y++;
    } else if (direction === Left) {
        x--;
    } else {
        x++;
    }

    return { x, y };
}

export function applySnakeAndFoodOnTiles(size, tiles, snake, food) {
    let newTilesArray = [...tiles];
    for (let i = 0; i < size * size; i++) {
        const row = Math.floor(i / size);
        const col = i % size;
        if (col === 0 || col === (size - 1) || row === 0 || row === (size - 1)) {
            newTilesArray[i] = Id_Border;
        } else {
            newTilesArray[i] = Id_Empty;
        }
    }

    //    newTilesArray = newTilesArray.map(t => Id_Empty);


    if (food) {
        const idx = food.y * size + food.x;
        newTilesArray[idx] = Id_Food;
    }

    for (let i = 0; i < snake.length; i++) {
        let x = snake[i].x;
        let y = snake[i].y;
        const idx = y * size + x;
        if (idx < size * size) {
            newTilesArray[idx] = Id_SnakeSegMin + i;
        }
    }
    return newTilesArray;

}


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