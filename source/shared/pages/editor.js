import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { setRootRel } from 'shared/model/reducer';

import Paper from 'material-ui/Paper';

import DrawingArea from 'shared/model/view/drawingArea';
import RenderingArea from 'shared/model/view/renderingArea';
import ToolBar from 'shared/model/view/toolbar';
import Description from 'shared/model/view/description';

const PaperContainer = styled(Paper)`
    display: flex;
    flex: 1;
    flexDirection: column;
    padding: 10px;
`;

const Editor = styled.div`
    display: flex;
    flex: 1;
    flexDirection: column;
`;

@connect(
    null,
    dispatch => ({
        onMount: params => dispatch(setRootRel(params))
    })
)
class EditorContainer extends Component {
    componentDidMount () {
        const node = ReactDOM.findDOMNode(this.renderingArea);
        this.props.onMount({ absX: node.offsetLeft, absY: node.offsetTop });
    }

    render () {
        return (
            <Editor>
                <ToolBar />
                <PaperContainer>
                    <DrawingArea />
                    <RenderingArea
                        ref={ renderingArea => { this.renderingArea = renderingArea; }}
                        id="root"
                    />
                </PaperContainer>
                <Description name="Super osiloscope"/>
            </Editor>
        );
    }
}

export default EditorContainer;
