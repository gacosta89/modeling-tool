import React from 'react';
import { connect } from 'react-redux';
import { generate } from 'shortid';
import styled from 'styled-components';

import { tapNode, toggleHoverNode } from 'shared/model/reducer';

import { getChildrens, getStyle } from 'shared/model/selectors';

const Box = styled.div`
    position: absolute;
    transition: background-color 0.5s ease;
`;

/*
Description: ParentFactory (react and react-redux). Presentational layer.
   This is the component that renders the nodes nested structure.

Rationale: with react is supper easy to render a complex nested structure out of a data model.
   Its declarative, meaning it takes some props (style, handler, ids)
   and returns a HTML description of those props.

 */

const ParentFactory = connect(
    (state, ownProps) => ({
        ids: getChildrens(state, ownProps.id),
        style: getStyle(state, ownProps.id),
    }),
    (dispatch, ownProps) => ({
        handler: e => {
            e.stopPropagation();
            if (e.button === 2) { // dont create the node if mouse down was with secondary button
                return;
            } else {
                dispatch(tapNode({
                    absX: e.pageX,
                    absY: e.pageY,
                    id: generate(),
                    parentId: ownProps.id,
                }));
            }
        },
        onEnter: () => dispatch(toggleHoverNode({ parentId: ownProps.id, enter: true })),
        onLeave: () => dispatch(toggleHoverNode({ parentId: ownProps.id, enter: false })),
    })
)(
    ({ style, handler, onEnter, onLeave, ids }) =>
        <Box
            style={style}
            onMouseDown={handler}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            {
                ids.map(                                     // recursively render child nodes
                    id => <ParentFactory key={id} id={id} />
                )
            }
        </Box>
    );

export default ParentFactory;
