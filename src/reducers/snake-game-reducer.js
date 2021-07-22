import {
    INIT_GAME,
    HIGHSCORE_LIST_LOADED,
    NAME_CHANGED,
    HIGHSCORE_LIST_SAVED,
    MOVE_SNAKE,
    CHANGE_DIRECTION
} from './actions';
import { getIndexInHighScoreList } from './highscore-functions';
import { generateGrid, isValidMove, getNextHeadPosition, getNewFoodPos } from './grid-functions';
import { gameConfigs } from '../game-configs';
import { Id_Border, Id_Food, Id_SnakeSegMin, Right } from '../constants';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    points: 0,
    gameStarted: false,
    gameComplete: false,
    gridViewModel: [],
    size: undefined,
    gameId: undefined,
    gameName: undefined,
    direction: Right,
    snake: undefined,
    food: undefined,
    highScoreList: undefined,
    highScorePosition: -1,
    userName: undefined,
    userId: undefined,
    highScoreListSaved: false,
    directionsQueue: []
};


//
// The reducer for the game
//
function snakeGame(state = initialState, action) {
    switch (action.type) {
        case INIT_GAME: {
            const size = gameConfigs[action.gameId].size;
            const snakeTemplate = [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 5 }];
            const snake = snakeTemplate.map(t => ({ x: t.x + 1, y: size / 2 }));
            const newFoodPos = getNewFoodPos(size, snake, 0);
            return Object.assign({}, initialState, {
                gameId: action.gameId,
                size,
                gameName: gameConfigs[action.gameId].name,
                imageNumber: action.imageNumber,
                highScoreListId: gameConfigs[action.gameId].highscorelistid,
                food: newFoodPos,
                gridViewModel: generateGrid(gameConfigs[action.gameId].size, snake, newFoodPos),
                gameStarted: true,
                snake
            });
        }

        case CHANGE_DIRECTION: {
            if (action.direction === state.directionsQueue[0]) {
                // Ignore multiple identical directions
                return state;
            }

            // Keep the last 3 direction actions
            let directionsQueue = [...state.directionsQueue];
            if (directionsQueue.length >= 3) {
                directionsQueue.pop();
            }
            directionsQueue.push(action.direction);

            return Object.assign({}, state, { directionsQueue });
        }

        case MOVE_SNAKE: {
            if (state.gameComplete || !state.gameStarted) {
                return state;
            }

            let directionsQueue = [...state.directionsQueue];
            let newDirection = directionsQueue.shift();
            let direction = state.direction;
            if (newDirection) {
                if (isValidMove(direction, newDirection)) {
                    direction = newDirection;
                } else {
                    return Object.assign({}, state, { directionsQueue });
                }
            }
            const snake = [...state.snake];
            const nextPos = getNextHeadPosition(direction, snake[0]);

            const typeOnNextPos = state.gridViewModel[nextPos.y * state.size + nextPos.x];

            if ((typeOnNextPos === Id_Border) || (typeOnNextPos >= Id_SnakeSegMin)) {
                //
                // Snake moved into border or into itself
                //

                if (state.highScoreList) {
                    const newUserId = uuidv4();
                    const idxInHighScoreList = getIndexInHighScoreList(newUserId, state.points, state.highScoreList);
                    if (idxInHighScoreList > -1) {
                        // User made it into the leaderboard
                        return Object.assign({}, state, {
                            highScorePosition: idxInHighScoreList + 1,
                            gameComplete: true,
                            userId: newUserId,
                            directionsQueue
                        });
                    } else {
                        // User dit not make it into the leaderboard
                        return Object.assign({}, state, {
                            highScorePosition: idxInHighScoreList + 1,
                            gameComplete: true,
                            directionsQueue
                        });
                    }
                }

                return Object.assign({}, state, { gameComplete: true, directionsQueue });
            }

            let gameLoopInterval = state.gameLoopInterval;
            let points = state.points;
            const foodWasTaken = typeOnNextPos === Id_Food;
            if (!foodWasTaken) {
                // Remove the first segment of the snake
                snake.pop();
            } else {
                points++;
            }

            // Insert the new pos as the first segment
            snake.unshift(nextPos);

            let food = foodWasTaken ? getNewFoodPos(state.size, snake, state.points) : Object.assign({}, state.food);

            const newTiles = generateGrid(state.size, snake, food);
            return Object.assign({}, state, { snake, gridViewModel: newTiles, food, points, direction, directionsQueue, gameLoopInterval });
        }
        case HIGHSCORE_LIST_LOADED: {
            return Object.assign({}, state, {
                highScoreList: action.highScoreList
            });
        }
        case NAME_CHANGED: {
            return Object.assign({}, state, {
                userName: action.name
            });
        }
        case HIGHSCORE_LIST_SAVED: {
            return Object.assign({}, state, {
                highScoreListSaved: true,
                highScoreList: action.highScoreList
            });
        }
        default:
            return state;
    }
}

export default snakeGame;