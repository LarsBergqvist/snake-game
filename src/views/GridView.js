import React from 'react';
import { connect } from 'react-redux'
import { Down, GridWidth, Left, Right, Up } from '../constants';
import TileView from './TileView'
import PropTypes from 'prop-types';
import { useSwipeable } from 'react-swipeable';
import { moveSnake } from '../reducers/actions';

const Grid = (props) => {
    const tileWidth = GridWidth / props.size;
    const tileWrapperStyle = {
        width: `${props.size * tileWidth}px`
    }
    const tileContainerStyle = {
        gridTemplateColumns: `repeat(${props.size},${tileWidth}px)`
    }

    let config = {
        delta: 5,                            // min distance(px) before a swipe starts
        preventDefaultTouchmoveEvent: true,  // call e.preventDefault *See Details*
        trackTouch: true,                     // track touch input
        trackMouse: false,                    // track mouse input
        rotationAngle: 0,                     // set a rotation angle
    }

    const handlers = useSwipeable({
        onSwipedRight: () => props.onChangeDirection(Right),
        onSwipedLeft: () => props.onChangeDirection(Left),
        onSwipedUp: () => props.onChangeDirection(Up),
        onSwipedDown: () => props.onChangeDirection(Down),
        ...config
    });

    return (
        <div {...handlers} className='tile-wrapper' style={tileWrapperStyle}>
            <div className='tile-container' style={tileContainerStyle}>
                {
                    props.tiles.map((t, idx) => {
                        return <TileView key={idx}
                            id={t}
                        />
                    })
                }
            </div>
        </div>
    );
}

Grid.propTypes = {
    onTileClicked: PropTypes.func,
    size: PropTypes.number,
    tiles: PropTypes.array,
    imageNumber: PropTypes.number,
    onChangeDirection: PropTypes.func
};

const mapStateToProps = state => {
    return {
        imageNumber: state.imageNumber,
        tiles: state.tiles,
        size: state.size,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeDirection: (direction) => {
            dispatch(moveSnake(direction));
        },
    }
}

const GridView = connect(
    mapStateToProps,
    mapDispatchToProps
)(Grid)

export default GridView;
