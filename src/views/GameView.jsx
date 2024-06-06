import React from 'react';
import './Game.css';
import { connect } from 'react-redux'
import { changeDirection } from '../reducers/actions';
import GameStatusView from './GameStatusView';
import { Down, Left, Right, Up } from '../constants';
import GridView from './GridView';
import PropTypes from 'prop-types';
import GameHeaderView from './GameHeaderView';

class Game extends React.Component {

    componentDidMount() {
        const handleOnKeyDown = (event) => {
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
                default:
                    break;
            }
            if (!this.props.gameComplete && this.props.gameStarted) {
                event.preventDefault();
            }
        }
        document.addEventListener('keydown', handleOnKeyDown, false);
    }

    render() {
        return (
            <div className='game'>
                <GameHeaderView gameName={this.props.gameName} />
                <GameStatusView />
                <GridView />
            </div>
        );
    }
}

Game.propTypes = {
    gameName: PropTypes.string,
    onChangeDirection: PropTypes.func,
    gameComplete: PropTypes.bool,
    gameStarted: PropTypes.bool
};


const mapStateToProps = state => {
    return {
        gameName: state.gameName,
        gameComplete: state.gameComplete,
        gameStarted: state.gameStarted
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeDirection: (direction) => {
            dispatch(changeDirection(direction));
        }
    }
}

const GameView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)

export default GameView;
