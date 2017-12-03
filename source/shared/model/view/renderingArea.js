import React from 'react';
import { connect } from 'react-redux';
import { generate } from 'shortid';
import { createSelector } from 'reselect';
import styled from 'styled-components';

import { createNode } from 'shared/model/reducer';

import { getNode, getChildrens } from 'shared/model/selectors';

const getStyle = createSelector(
    getNode,
    node => node.id === 'root' ? {
        flex: 1,
        border: 'none',
        position: 'relative',
    } : {
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

const ParentFactory = connect(
    (state, ownProps) => ({
        ids: getChildrens(state, ownProps.id),
        style: getStyle(state, ownProps.id),
    }),
    (dispatch, ownProps) => ({
        handler: e => {
            e.stopPropagation();
            if (e.button === 2) {
                return;
            } else {
                dispatch(createNode({
                    absX: e.pageX,
                    absY: e.pageY,
                    id: generate(),
                    parentId: ownProps.id,
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
                ids.map(
                    id => <ParentFactory key={id} id={id} />
                )
            }
        </Box>
    );

export default ParentFactory;
