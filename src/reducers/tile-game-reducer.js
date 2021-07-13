import {
    INIT_GAME,
    HIGHSCORE_LIST_LOADED,
    NAME_CHANGED,
    HIGHSCORE_LIST_SAVED,
    MOVE_SNAKE
} from './actions';
import {
    generateTileSet,
    applySnakeAndFoodOnTiles,
    isValidMove,
    getNextHeadPosition,
    getNewFoodPos,
    getIndexInHighScoreList
} from './tileset-functions';
import { gameConfigs } from '../game-configs';
import { Id_Border, Id_Food, Id_SnakeSegMin, Right } from '../constants';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    points: 0,
    gameStarted: false,
    gameComplete: false,
    tiles: [],
    size: undefined,
    gameId: undefined,
    gameName: undefined,
    highScoreList: undefined,
    highScorePosition: -1,
    userName: undefined,
    userId: undefined,
    highScoreListSaved: false,
    direction: Right,
    snake: [{ x: 13, y: 15 }, { x: 12, y: 15 }, { x: 11, y: 15 }, { x: 10, y: 15 }],
    food: {
        x: 18, y: 16
    }
};


// The reducer for the game
function tileGame(state = initialState, action) {
    switch (action.type) {
        case INIT_GAME: {
            const snake = [...state.snake];
            const newFoodPos = getNewFoodPos(state.size, snake);
            return Object.assign({}, initialState, {
                gameId: action.gameId,
                size: gameConfigs[action.gameId].size,
                gameName: gameConfigs[action.gameId].name,
                imageNumber: action.imageNumber,
                highScoreListId: gameConfigs[action.gameId].highscorelistid,
                tiles: generateTileSet(gameConfigs[action.gameId].size, snake, newFoodPos),
                gameStarted: true
            });
        }

        case MOVE_SNAKE: {
            if (state.gameComplete || !state.gameStarted) {
                return state;
            }

            let direction = state.direction;
            if (action.direction) {
                if (isValidMove(state.direction, action.direction)) {
                    direction = action.direction;
                }
            }
            const snake = [...state.snake];
            const nextPos = getNextHeadPosition(direction, snake[0]);

            const typeOnNextPos = state.tiles[nextPos.y * state.size + nextPos.x];

            if ((typeOnNextPos === Id_Border) || (typeOnNextPos >= Id_SnakeSegMin)) {
                if (state.highScoreList) {
                    const newUserId = uuidv4();
                    const idxInHighScoreList = getIndexInHighScoreList(newUserId, state.points, state.highScoreList);
                    if (idxInHighScoreList > -1) {
                        // User made it into the leaderboard
                        return Object.assign({}, state, {
                            highScorePosition: idxInHighScoreList + 1,
                            gameComplete: true,
                            userId: newUserId
                        });
                    } else {
                        // User dit not make it into the leaderboard
                        return Object.assign({}, state, {
                            highScorePosition: idxInHighScoreList + 1,
                            gameComplete: true,
                        });
                    }
                }

                return Object.assign({}, state, { gameComplete: true });
            }

            let points = state.points;
            const foodWasTaken = typeOnNextPos === Id_Food;
            if (!foodWasTaken) {
                snake.pop();
            } else {
                points++;
            }

            snake.unshift(nextPos);

            let food = foodWasTaken ? getNewFoodPos(state.size, snake) : Object.assign({}, state.food);

            const newTiles = applySnakeAndFoodOnTiles(state.size, [...state.tiles], snake, food);
            return Object.assign({}, state, { snake, tiles: newTiles, food, points, direction });
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

export default tileGame;