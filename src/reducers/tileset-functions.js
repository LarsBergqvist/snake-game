import { Down, Id_Border, Id_Empty, Id_Food, Id_SnakeSegMin, Left, Right, Up } from '../constants';

//
// The TileSet is an array of length size*size representing
// a size*size matrix with unique values [0...(size*size -1)]
// A tile value/id represents a slice of an image
// When array[i] === i+1, the tile is correctly positioned in the matrix
// The value 0 represents a blank tile
// In the unshuffled TileSet, the blank tile is positioned in the lower
// right corner
//

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
    if ((newDirection === Left && oldDirection === Right) ||
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


export function getIndexInHighScoreList(newUserId, userTime, score, highScoreList) {
    const resultsCopy = highScoreList.results.map(r => {
        return {
            id: r.id,
            score: r.score,
            time: isNaN(Date.parse(r.utcDateTime)) ? 0 : Date.parse(r.utcDateTime)
        }
    });
    resultsCopy.push({
        id: newUserId,
        score,
        time: userTime
    });
    resultsCopy.sort((a, b) => (a.score - b.score) || (b.time - a.time));

    let idxInHighScoreList = resultsCopy.findIndex(r => r.id === newUserId);
    if (idxInHighScoreList > -1 && (idxInHighScoreList + 1 <= highScoreList.maxSize)) {
        return idxInHighScoreList;
    } else {
        return -1;
    }
}