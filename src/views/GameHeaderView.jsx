import React from 'react';
import './Game.css';
import PropTypes from 'prop-types';

const GameHeaderView = (props) =>
    <>
        <div><h2>{props.gameName}</h2></div>
    </>;

GameHeaderView.propTypes = {
    gameName: PropTypes.string,
};

export default GameHeaderView;
