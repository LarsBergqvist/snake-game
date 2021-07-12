import React from 'react';
import './Game.css';
import PropTypes from 'prop-types';
import { Down, Left, Right, Up } from '../constants';

const DirectionButtonsView = (props) =>
    <>
        <table className='tile-wrapper'>
            <tbody>
                <tr>
                    <td>

                    </td>
                    <td>
                        <button className='game-button' onClick={() => props.onChangeDirection(Up)}>Up</button>

                    </td>
                    <td>

                    </td>
                </tr>
                <tr>
                    <td>
                        <button className='game-button' onClick={() => props.onChangeDirection(Left)}>Left</button>

                    </td>
                    <td>

                    </td>
                    <td>
                        <button className='game-button' onClick={() => props.onChangeDirection(Right)}>Right</button>

                    </td>

                </tr>
                <tr>
                    <td>

                    </td>
                    <td>
                        <button className='game-button' onClick={() => props.onChangeDirection(Down)}>Down</button>

                    </td>
                    <td>

                    </td>

                </tr>

            </tbody>
        </table>
    </>;

DirectionButtonsView.propTypes = {
    onChangeDirection: PropTypes.func
};

export default DirectionButtonsView;
