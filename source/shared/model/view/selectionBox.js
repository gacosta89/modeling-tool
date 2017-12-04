import React, { Component } from 'react';
import { connect } from 'react-redux';

import { drawNode } from 'shared/model/reducer';
import {
    getActiveNodeCoords,
    getActiveNodeDimentions,
    getIniTap,
    getActiveTool } from 'shared/model/selectors';

import { MOVE_TOOL } from 'shared/model/constants';

import styled from 'styled-components';

const SelectionBox = styled.div`
    border: 1px solid #f0f0f0;
    background-color: rgba(0, 162, 255, 0.4);
    position: fixed;
`;

const getBoxSize = ({ ini, currX, currY, deltaX, deltaY }) => ({ // compute the selection box size
    width: Math.abs(currX - ini.absX), // TODO: compute width height, right and bottom when inversing the selection box
    height: Math.abs(currY - ini.absY),
    top: ini.absY + deltaY,
    left: ini.absX + deltaX,
});

// Draw the selection box

@connect(
    state => ({
        coords: getActiveNodeCoords(state),
        dimentions: getActiveNodeDimentions(state),
        translate: getActiveTool(state) === MOVE_TOOL,
        iniTap: getIniTap(state),
    }),
    dispatch => ({
        onMouseUp: params => dispatch(drawNode(params)), // draw the node in the rendering area
    })
)
class SelectionBoxContainer extends Component {
    constructor (props) {
        super(props);

        const { absX, absY } = props.coords;
        const { width, height } = props.dimentions;

        const currX = absX + width;
        const currY = absY + height;

        this.state = {
            ini: {
                absX,
                absY,
                currX,
                currY,
            },
            currX,
            currY,
            deltaX: 0,
            deltaY: 0,
        };
    }

    onMouseMove = e => {
        e.preventDefault(); // prevent the page to scroll

        const { translate, iniTap } = this.props;

        if (translate) {
            this.setState({
                deltaX: e.pageX - iniTap.absX,
                deltaY: e.pageY - iniTap.absY,
            });
        } else {
            this.setState({
                currX: e.pageX,
                currY: e.pageY,
            });
        }
    }

    onMouseUp = () => {
        const { ini, currX, currY, deltaX, deltaY } = this.state;
        this.props.onMouseUp({ // compute the final position  and dimentions of the box
            deltaX,
            deltaY,
            width: currX - ini.absX,
            height: currY - ini.absY,
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
        return <SelectionBox style={style} />;
    }
}

export default SelectionBoxContainer;
