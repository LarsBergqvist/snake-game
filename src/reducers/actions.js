export const INIT_GAME = 'INIT_GAME';
export const HIGHSCORE_LIST_LOADED = 'HIGHSCORE_LIST_LOADED';
export const NAME_CHANGED = 'NAME_CHANGED';
export const HIGHSCORE_LIST_SAVED = 'HIGHSCORE_LIST_SAVED';
export const MOVE_SNAKE = 'MOVE_SNAKE';

export function initGame(gameId) {
    return { type: INIT_GAME, gameId };
}

export function moveSnake(direction) {
    return { type: MOVE_SNAKE, direction };
}

export function highScoreListLoaded(highScoreList) {
    return { type: HIGHSCORE_LIST_LOADED, highScoreList };
}

export function nameChanged(name) {
    return { type: NAME_CHANGED, name };
}

export function highScoreListSaved(highScoreList) {
    return { type: HIGHSCORE_LIST_SAVED, highScoreList };
}

