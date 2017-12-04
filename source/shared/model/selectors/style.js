import { createSelector } from 'reselect';

import { getNode, getBoxStyle } from 'shared/model/selectors';
import { ROOT_TYPE, BACKGROUND_TYPE } from 'shared/model/constants';

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

const getNodeStyle = createSelector( // generates the style out of a node
    getNode,
    getBoxStyle,
    (node, style) => Object.assign({
        display: node.show ? 'inline' : 'none',
        ...style,
    }, node.backgroundImgSrc && {
        backgroundImage: `url(${node.backgroundImgSrc})`,
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
