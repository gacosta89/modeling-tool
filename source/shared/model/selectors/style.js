import { createSelector } from 'reselect';

import {
    getNode,
    getActiveNodeId,
    getNodeLevel,
    getHoveredNodeId } from 'shared/model/selectors';
import { ROOT_TYPE, BACKGROUND_TYPE, COLORS } from 'shared/model/constants';

import { getImageSrc } from 'shared/pics/selectors';

/*
Selectors: (reselect) abstraction layer between the data model and the presentational layer.

Rationale: they are a thin layer of abstracion that allows to derive data from the
   state and hide its implementation details. reselect does this in a very efficient way
   by immutable checks. It allows to create memoized selectors, so the component can detect
   if there was a change in the derived data by immutable checks and only then re-render.

   They are pure functions, so super easy to test.

   In this case getDimentions is returning an object of dimentions and position if
   the node is not ROOT_TYPE or BACKGROUND_TYPE.

   The selector will be recomputed only if a property of the particular node changes.
   Its "observing" the node through immutability
*/


const getDimentions = createSelector( // generates node dimensions
    getNode,
    node => [ROOT_TYPE, BACKGROUND_TYPE].includes(node.type) ? {} : {
        width: node.width,
        height: node.height,
        top: node.relY,
        left: node.relX,
    }
);

const getOpacity = createSelector(
    getNode,
    getActiveNodeId,
    getHoveredNodeId,
    (node, activeNodeId, hoveredId) => node.id === activeNodeId ? 0.8 :
        node.id === hoveredId ? 0.6 : 0.4
);

export const getColor = createSelector(
    getOpacity,
    getNodeLevel,
    (opacity, level) => COLORS[level % 6](opacity),
);

export const getBoxStyle = createSelector(
    getNode,
    getColor,
    state => state.model.boxTypes,
    (node, color, types) => node.type === ROOT_TYPE ?
        types[node.type].style : {
            ...types[node.type].style,
            backgroundColor: color,
        }
);

export const getActiveBoxStyle = state => getBoxStyle(state, state.model.activeNodeId);

const getNodeBackgroundId = createSelector(
    getNode,
    node => node.backgroundImgId,
);

const getNodeBackgroundSrc = (state, id) =>
      getImageSrc(state, getNodeBackgroundId(state, id));


const getNodeStyle = createSelector( // generates the style out of a node
    getNode,
    getBoxStyle,
    getNodeBackgroundSrc,
    (node, style, src) => Object.assign({
        display: node.show ? 'inline' : 'none',
        ...style,
    }, node.backgroundImgId && {
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top left',
    })
);

export const getStyle = createSelector(
    getDimentions,
    getNodeStyle,
    (dimentions, style) => ({
        ...dimentions,
        ...style,
    })
);

export const getActiveNodeDimentions = state => getDimentions(state, state.model.activeNodeId);
