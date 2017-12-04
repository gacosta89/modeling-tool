import React from 'react';
import { connect } from 'react-redux';
import { generate } from 'shortid';
import styled from 'styled-components';

import { tapNode } from 'shared/model/reducer';

import { getChildrens, getStyle } from 'shared/model/selectors';

const Box = styled.div`
    position: absolute;
    border: solid 1px black;

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
        ids: getChildrens(state, ownProps.id), // childrens of the parentNode to recursively render the structure
        style: getStyle(state, ownProps.id), // compute the style of the node
    }),
    (dispatch, ownProps) => ({
        handler: e => {
            e.stopPropagation();  // stop the propagation to prevent the creation of nodes in parents other than the inmediate
            if (e.button === 2) { // dont create the node if mouse down was with secondary button
                return;
            } else {
                dispatch(tapNode({ // create a new node with absX and absY as left top coordinates
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
            onMouseDown={handler}
        >
            {
                ids.map(                                     // recursively render child nodes
                    id => <ParentFactory key={id} id={id} />
                )
            }
        </Box>
    );

export default ParentFactory;
