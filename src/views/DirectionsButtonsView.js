import React from 'react';
import './Game.css';
import PropTypes from 'prop-types';
import { Down, Left, Right, Up } from '../constants';

const DirectionButtonsView = (props) => {
    if (!props.gameStarted) {
        return <></>;
    }
    return <>
        <table className='tile-wrapper'>
            <tbody>
                <tr>
                    <td>

                    </td>
                    <td>
                        <button className='control-button' onClick={() => props.onChangeDirection(Up)}>U</button>

                    </td>
                    <td>

                    </td>
                </tr>
                <tr>
                    <td>
                        <button className='control-button' onClick={() => props.onChangeDirection(Left)}>L</button>

                    </td>
                    <td>

                    </td>
                    <td>
                        <button className='control-button' onClick={() => props.onChangeDirection(Right)}>R</button>

                    </td>

                </tr>
                <tr>
                    <td>

                    </td>
                    <td>
                        <button className='control-button' onClick={() => props.onChangeDirection(Down)}>D</button>

                    </td>
                    <td>

                    </td>

                </tr>

            </tbody>
        </table>
    </>;

}

DirectionButtonsView.propTypes = {
    onChangeDirection: PropTypes.func,
    gameStarted: PropTypes.bool
};

export default DirectionButtonsView;
