
import React from 'react';
import { connect } from 'react-redux'
import LeaderBoardView from './LeaderBoardView';
import EnterNameView from './EnterNameView';
import PropTypes from 'prop-types';
import { GameId_3x3 } from '../constants';
import { initGame } from '../reducers/actions';
import { fetchHighScoreList } from '../reducers/thunks';

const GameStatus = (props) => {
    if (props.gameComplete) {
        return <div className='game-status'>
            <div><b>GAME OVER!</b></div>
            <div>You got {props.points} points</div>
            {(props.highScorePosition > 0) && !props.highScoreListSaved &&
                <EnterNameView />
            }
            {(props.highScorePosition > 0) && props.highScoreListSaved &&
                <LeaderBoardView
                    highScoreList={props.highScoreList}
                    userId={props.userId}
                />
            }
            <button className='game-button' onClick={() => props.onInitGame(GameId_3x3)}>Restart</button>
        </div>;
    } else {
        return <div className='game-status'>
            Score: <b>{props.points}</b>
            <div className='game-instructions'>
                <div>
                    Use arrow keys or buttons to change direction
                </div>
            </div>
        </div>
    }
}

GameStatus.propTypes = {
    points: PropTypes.number,
    gameComplete: PropTypes.bool,
    highScorePosition: PropTypes.number,
    highScoreListSaved: PropTypes.bool,
    highScoreList: PropTypes.object,
    userId: PropTypes.string,
    onInitGame: PropTypes.func
};

const mapStateToProps = state => {
    return {
        points: state.points,
        gameComplete: state.gameComplete,
        highScorePosition: state.highScorePosition,
        highScoreListSaved: state.highScoreListSaved,
        highScoreList: state.highScoreList,
        userId: state.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitGame: (gameId) => {
            dispatch(initGame(gameId));
            dispatch(fetchHighScoreList);
        }
    }
}

const GameStatusView = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameStatus)

export default GameStatusView;
