const updateAbsCoordinates = (ids, deltaX, deltaY, nodes) =>
      ids.reduce((newNodes, nodeId) => ({
          ...newNodes,
          [nodeId]: {
              ...newNodes[nodeId],
              absX: newNodes[nodeId].absX + deltaX,
              absY: newNodes[nodeId].absY + deltaY,
          },
      }), nodes);

export const getFamily = (nodes, partial = [], ids = []) => {
    const children = ids.map(id => nodes[id].childrenIds).reduce((acc, next) => [...acc, ...next], []);
    if (children.length === 0) {
        return partial;
    }
    return getFamily(nodes, [...partial, ...children], children); // Tail recursion wooho!!
};

export const fixAbsCoordinates = (ids, deltaX, deltaY, nodes) =>
      updateAbsCoordinates(getFamily(nodes, ids, ids), deltaX, deltaY, nodes);

export const removeNodes = (nodes, ids) => ids.reduce(
    (newNodes, id) => {
        const {[id]: remove, ...rest} = newNodes; // eslint-disable-line
        return rest;
    }, nodes);

export const removeChildrensAndParent = (nodes, parentId) =>
    removeNodes(nodes, getFamily(nodes, [parentId], [parentId]));

export const getFirstChilds = (nodes, partial = [], h1, ...rest) => {
    if (!h1) {
        return partial;
    }
    const childrenIds = nodes[h1].childrenIds;
    const newRest = childrenIds[0] ? [...childrenIds, ...rest] : rest;
    return getFirstChilds(nodes, [...partial, h1], ...newRest); // tail recursion yay!
};
