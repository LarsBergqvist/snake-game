import {
    HIGHSCORE_LIST_LOADED,
    HIGHSCORE_LIST_SAVED,
    moveSnake,
    NAME_SUBMITTED
} from './actions';

export async function runGameLoop(dispatch, getState) {
    let interval = setInterval(() => {
        if (getState().gameComplete) {
            clearInterval(interval);
        } else {
            dispatch(moveSnake());
        }
    }, 100);
}

export async function fetchHighScoreList(dispatch, getState) {
    if (import.meta.env.VITE_APIURL.length === 0) {
        return;
    }
    let url = `${import.meta.env.VITE_APIURL}/highscore-lists/${getState().highScoreListId}`;
    try {
        let result = await get(url);
        dispatch({
            type: HIGHSCORE_LIST_LOADED,
            highScoreList: result
        });
    } catch (e) {
        console.error('Network request failed');
    }
}

export async function updateHighScoreList(dispatch, getState) {
    if (import.meta.env.VITE_APIURL.length === 0) {
        return;
    }

    let url = `${import.meta.env.VITE_APIURL}/highscore-lists/${getState().highScoreListId}/game-results`;

    var state = getState();

    if (!state.userName || state.userName.length === 0 || state.nameSubmitted) {
        return;
    }

    dispatch({
        type: NAME_SUBMITTED
    });

    let body = {
        userName: state.userName,
        score: state.points,
        id: state.userId
    };

    try {
        await post(url, body);
    } catch (e) {
        console.error('Network request failed3');
        return;
    }

    let getUrl = `${import.meta.env.VITE_APIURL}/highscore-lists/${getState().highScoreListId}`;
    let result = await get(getUrl);

    dispatch({
        type: HIGHSCORE_LIST_SAVED, highScoreList: result
    });
}

async function get(url) {
    try {
        let response = await fetch(url, {
            headers: {
                ApiKey: `${import.meta.env.VITE_APIKEY}`
            }
        });
        if (!response.ok) {
            throw Error('Network request failed');
        }
        return await response.json();
    } catch (e) {
        throw Error('Network request failed');
    }
}

async function post(url, body) {
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ApiKey: `${import.meta.env.VITE_APIKEY}`
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw Error('Network request failed');
        }
    } catch (e) {
        throw Error('Network request failed');
    }
}

