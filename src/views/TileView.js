import React from 'react';
import './Game.css';
import PropTypes from 'prop-types';
import { Id_Border, Id_Empty, Id_Food, Id_SnakeSegMin } from '../constants';

const TileView = ({ id }) =>
    <div className='tile'
        style={getStyleForTile(id)}
    ></div>;

TileView.propTypes = {
    id: PropTypes.number
};

const getStyleForTile = (id) => {
    if (id === Id_Empty) {
        return {
            backgroundColor: 'white',
            outline: '1px solid lightgray',
            outlineOffset: '-1px'
        };
    } else if (id >= Id_SnakeSegMin) {
        let a = Math.max(0.2, 1.0 / ((id - 2) * 0.6))
        return {
            backgroundColor: `rgba(0,0,0, ${a})`
        };
    } else if (id === Id_Food) {
        return {
            backgroundColor: 'green'
        };
    } else if (id === Id_Border) {
        return {
            backgroundColor: 'red'
        };
    }
}

export default TileView;
