import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { setRootRel } from 'shared/model/reducer';

import { getIsInteractiveMode } from 'shared/app/selectors';

import Paper from 'material-ui/Paper';

import DrawingArea from 'shared/model/view/drawingArea';
import RenderingArea from 'shared/model/view/renderingArea';
import ToolBar from 'shared/model/view/toolbar';
import Description from 'shared/model/view/description';
import RightPanel from 'shared/model/view/rightPanel';

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

const Wrapper = styled.div`
    flex: 1;
    display: flex;
    align-items: stretch;
    padding: 10px;
    position: relative;
`;

@connect(
    state => ({
        interactive: getIsInteractiveMode(state),
    }),
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
            <Wrapper>
                <Editor>
                    { !this.props.interactive && <ToolBar/> }
                    <PaperContainer>
                        <DrawingArea />
                        <RenderingArea
                            ref={ renderingArea => { this.renderingArea = renderingArea; }}
                            id="root"
                        />
                    </PaperContainer>
                    <Description />
                </Editor>
                <RightPanel />
            </Wrapper>
        );
    }
}

export default EditorContainer;
