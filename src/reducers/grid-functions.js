import { Down, Id_Border, Id_Empty, Id_Food, Id_SnakeSegMin, Left, Right, Up } from '../constants';

export function generateGrid(size, snake, food) {
    const newGrid = [];
    for (let i = 0; i < size * size; i++) {
        const row = Math.floor(i / size);
        const col = i % size;
        if (col === 0 || col === (size - 1) || row === 0 || row === (size - 1)) {
            newGrid.push(Id_Border);
        } else {
            newGrid.push(Id_Empty);
        }
    }

    if (food) {
        const idx = food.y * size + food.x;
        newGrid[idx] = Id_Food;
    }

    for (let i = 0; i < snake.length; i++) {
        let x = snake[i].x;
        let y = snake[i].y;
        const idx = y * size + x;
        if (idx < size * size) {
            newGrid[idx] = Id_SnakeSegMin + i;
        }
    }
    return newGrid;
}

export function getNewFoodPos(size, snake, currentPoints) {
    let fromBorder = 3;
    if (currentPoints > 30) {
        fromBorder = 1;
    } else if (currentPoints > 20) {
        fromBorder = 2
    }
    let validPosFound = false;
    let newPos = undefined;
    while (!validPosFound) {
        const x = Math.floor(Math.random() * (size - fromBorder * 2) + fromBorder);
        const y = Math.floor(Math.random() * (size - fromBorder * 2) + fromBorder);
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
