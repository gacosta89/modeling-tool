import React, { Component } from 'react';
import { connect } from 'react-redux';

import { drawNode } from 'shared/model/reducer';
import {
    getActiveNodeCoords,
    getActiveBoxStyle } from 'shared/model/selectors';

import styled from 'styled-components';

const SelectionBox = styled.div`
    border: 1px solid #f0f0f0;
    background-color: rgba(0, 162, 255, 0.4);
    position: fixed;
`;

const getBoxSize = ({ absX, absY, currX, currY }) => ({ // compute the selection box size
    width: Math.abs(currX - absX), // TODO: compute width height, right and bottom when inversing the selection box
    height: Math.abs(currY - absY),
    top: absY,
    left: absX,
});

// Draw the selection box

@connect(
    state => ({
        coords: getActiveNodeCoords(state),
        /* size: getActiveNodeSize(state),*/
        boxStyle: getActiveBoxStyle(state),
    }),
    dispatch => ({
        onMouseUp: params => dispatch(drawNode(params)), // draw the node in the rendering area
    })
)
class SelectionBoxContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            ...props.coords,
            currX: props.coords.absX,
            currY: props.coords.absY,
        };
    }

    onMouseMove = e => {
        e.preventDefault(); // prevent the page to scroll
        this.setState({
            currX: e.pageX,
            currY: e.pageY,
        });
    }

    onMouseUp = () => {
        const { absX, absY, currX, currY } = this.state;
        this.props.onMouseUp({ // compute the final width and height of the box
            width: currX - absX,
            height: currY - absY,
        });
    }

    componentDidMount () { // listen to mousemove events when the selection is active
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);
    }

    componentWillUnmount () { // clean listeners when unmounting
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);
    }


    render () {
        const style = getBoxSize(this.state);
        const { boxStyle } = this.props;
        return <SelectionBox style={{ ...boxStyle, ...style }} />;
    }
}

export default SelectionBoxContainer;
