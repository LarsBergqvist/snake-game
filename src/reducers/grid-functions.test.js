import { Id_Border, Id_Food, Id_SnakeSegMin } from '../constants';
import { generateGrid, getNewFoodPos } from './grid-functions'

test('Should generate grid with snake and borders', () => {
    const size = 4;
    const snake = [{ x: 1, y: 2 }, { x: 2, y: 2 }];
    const grid = generateGrid(size, snake);
    expect(grid[size * 2 + 1]).toBe(Id_SnakeSegMin);
    expect(grid[size * 2 + 2]).toBe(Id_SnakeSegMin + 1);

    for (let i = 0; i < size * size; i++) {
        const row = Math.floor(i / size);
        const col = i % size;
        if (row === 0 || row === (size - 1) || col === 0 || col === (size - 1)) {
            expect(grid[i]).toBe(Id_Border);
        }
    }
});

test('Should generate 1 food item', () => {
    const size = 4;
    const snake = [{ x: 1, y: 2 }, { x: 2, y: 2 }];
    const foodPos = getNewFoodPos(size, snake, 0);
    const grid = generateGrid(size, snake, foodPos);

    let numFoodFound = 0;
    for (let i = 0; i < size * size; i++) {
        if (grid[i] === Id_Food) {
            numFoodFound++;
        }
    }
    expect(numFoodFound).toBe(1);
});
