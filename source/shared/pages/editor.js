import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { setRootRel } from 'shared/model/reducer';

import Paper from 'material-ui/Paper';

import DrawingArea from 'shared/model/view/drawingArea';
import RenderingArea from 'shared/model/view/renderingArea';
import ToolBar from 'shared/model/view/toolbar';

const PaperContainer = styled(Paper)`
    display: flex;
    flexDirection: column;
    flex: 3;
    padding: 10px;
    position: relative;
`;

@connect(
    null,
    dispatch => ({
        onMount: params => dispatch(setRootRel(params))
    })
)
class Editor extends Component {
    componentDidMount () {
        const node = ReactDOM.findDOMNode(this.renderingArea);
        this.props.onMount({ absX: node.offsetLeft, absY: node.offsetTop });
    }

    render () {
        return (
            <PaperContainer>
                <ToolBar />
                <DrawingArea />
                <RenderingArea
                    ref={ renderingArea => { this.renderingArea = renderingArea; }}
                    id="root"
                />
            </PaperContainer>
        );
    }
}

export default Editor;
