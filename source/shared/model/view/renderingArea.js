import React from 'react';
import { connect } from 'react-redux';
import { generate } from 'shortid';
import { createSelector } from 'reselect';
import styled from 'styled-components';

import { createNode } from 'shared/model/reducer';

import { getNode, getBoxStyle, getChildrens } from 'shared/model/selectors';

const getStyle = createSelector( // generates the style out of a node
    getNode,
    getBoxStyle,
    (node, style) => node.id === 'root' ? {
        flex: 1,
        border: 'none',
        position: 'relative',
    } : {
        ...style,
        width: node.width,
        height: node.height,
        display: node.show ? 'inline' : 'none',
        top: node.relY,
        left: node.relX,
    }
);

const Box = styled.div`
    position: absolute;
    border: 1px solid black;
`;

/*
This is the component that renders the nodes nested structure
*/

const ParentFactory = connect(
    (state, ownProps) => ({
        ids: getChildrens(state, ownProps.id), // childrens of the parentNode to recursively render the structure
        style: getStyle(state, ownProps.id), // compute the style of the node
    }),
    (dispatch, ownProps) => ({
        handler: e => {
            e.stopPropagation();  // stop the propagation to prevent the creation of nodes in parents other than the inmediate
            if (e.button === 2) { // dont create the node if mouse down was with secondary button
                return;
            } else {
                dispatch(createNode({ // create a new node with absX and absY as left top coordinates
                    absX: e.pageX,
                    absY: e.pageY,
                    id: generate(),
                    parentId: ownProps.id, // link the new child to the parent
                }));
            }
        },
    })
)(
    ({ style, handler, ids }) =>
        <Box
            style={style}
            onMouseDown={ handler }
        >
            {
                ids.map(                                     // recursively render child nodes
                    id => <ParentFactory key={id} id={id} />
                )
            }
        </Box>
    );

export default ParentFactory;
