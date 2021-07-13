import React from 'react';
import './Game.css';
import { connect } from 'react-redux'
import { initGame, moveSnake } from '../reducers/actions';
import GameStatusView from './GameStatusView';
import { Down, Left, Right, Up } from '../constants';
import { fetchHighScoreList } from '../reducers/thunks';
import GridView from './GridView';
import PropTypes from 'prop-types';
import LeaderBoardView from './LeaderBoardView';
import GameHeaderView from './GameHeaderView';
import DirectionButtonsView from './DirectionsButtonsView';

class Game extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const handleOnKeyPress = (event) => {
            switch (event.keyCode) {
                case 38: {
                    this.props.onChangeDirection(Up);
                    break;
                }
                case 40: {
                    this.props.onChangeDirection(Down);
                    break;
                }
                case 37: {
                    this.props.onChangeDirection(Left);
                    break;
                }
                case 39: {
                    this.props.onChangeDirection(Right);
                    break;
                }
            }
            if (!this.props.gameComplete && this.props.gameStarted) {
                event.preventDefault();
            }
        }
        document.addEventListener('keydown', handleOnKeyPress, false);

        this.interval = setInterval(() => {
            this.props.onMoveSnake();
        }, 100);

    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }


    render() {
        return (
            <div className='game'>
                <GameHeaderView gameName={this.props.gameName} />
                <GameStatusView />
                <GridView />
                <DirectionButtonsView gameStarted={this.props.gameStarted} onChangeDirection={this.props.onChangeDirection} />
                <LeaderBoardView highScoreList={this.props.highScoreList} />
            </div>
        );

    }
}

Game.defaultProps = {
    gameStarted: false,
    gameComplete: false
}

Game.propTypes = {
    gameName: PropTypes.string,
    highScoreList: PropTypes.object,
    onInitGame: PropTypes.func,
    onMoveSnake: PropTypes.func,
    onChangeDirection: PropTypes.func,
    gameComplete: PropTypes.bool,
    gameStarted: PropTypes.bool
};


const mapStateToProps = state => {
    return {
        gameName: state.gameName,
        highScoreList: state.highScoreList,
        gameComplete: state.gameComplete,
        gameStarted: state.gameStarted
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeDirection: (direction) => {
            dispatch(moveSnake(direction));
        },
        onMoveSnake: () => {
            dispatch(moveSnake());
        },
        onInitGame: (gameId) => {
            dispatch(initGame(gameId));
            dispatch(fetchHighScoreList);
        }
    }
}

const GameView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)

export default GameView;
