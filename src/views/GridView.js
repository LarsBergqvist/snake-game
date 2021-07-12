import React from 'react';
import { connect } from 'react-redux'
import { GridWidth } from '../constants';
import TileView from './TileView'
import PropTypes from 'prop-types';

const Grid = (props) => {
    const tileWidth = GridWidth / props.size;
    const tileWrapperStyle = {
        width: `${props.size * tileWidth}px`
    }
    const tileContainerStyle = {
        gridTemplateColumns: `repeat(${props.size},${tileWidth}px)`
    }

    return (
        <div className='tile-wrapper' style={tileWrapperStyle}>
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
    imageNumber: PropTypes.number
};

const mapStateToProps = state => {
    return {
        imageNumber: state.imageNumber,
        tiles: state.tiles,
        size: state.size,
    }
}

const GridView = connect(
    mapStateToProps
)(Grid)

export default GridView;
