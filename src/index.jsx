import React from 'react';
import './index.css';
import snakeGame from './reducers/snake-game-reducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import {thunk} from 'redux-thunk'
import GameView from './views/GameView';
import { createRoot } from 'react-dom/client';

// For integration with Redux DevTools in browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(snakeGame, composeEnhancers(
    applyMiddleware(thunk)
));

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <GameView />
    </Provider>
);
