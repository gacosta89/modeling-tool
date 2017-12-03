import React, { Component } from 'react';
import { connect } from 'react-redux';

import { drawNode } from 'shared/model/reducer';
import { getSelectionActive, getActiveNodeCoords } from 'shared/model/selectors';

import styled from 'styled-components';

const DrawingArea = styled.div`
    width: 1px;
    height: 1px;
    position: absolute;
    z-index: 100;
    overflow: visible;
`;

const SelectionBox = styled.div`
    border: 1px dashed black;
    position: fixed;
`;

const getBoxSize = ({ absX, absY, currX, currY }) => ({
    width: Math.abs(currX - absX),
    height: Math.abs(currY - absY),
    [ Math.sign(currY - absY) > 0 ? 'top' : 'bottom']: absY,
    [ Math.sign(currX - absX) > 0 ? 'left' : 'right']: absX,
});

@connect(
    state => ({
        coords: getActiveNodeCoords(state),
    }),
    dispatch => ({
        onMouseUp: params => dispatch(drawNode(params)),
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
        e.preventDefault();
        this.setState({
            currX: e.pageX,
            currY: e.pageY,
        });
    }

    onMouseUp = () => {
        const { absX, absY, currX, currY } = this.state;
        this.props.onMouseUp({
            width: currX - absX,
            height: currY - absY,
        });
    }

    componentDidMount () {
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);
    }

    componentWillUnmount () {
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);
    }


    render () {
        const style = getBoxSize(this.state);
        return <SelectionBox style={style} />;
    }
}

const DrawingAreaContainer = ({ selectionActive }) =>
    <DrawingArea>
        {
            selectionActive &&
                <SelectionBoxContainer />
        }
   </DrawingArea>;

export default connect(
    state => ({
        selectionActive: getSelectionActive(state),
    }),
    dispatch => ({
        onMouseDown: params => dispatch(drawNode(params))
    })
)(DrawingAreaContainer);

