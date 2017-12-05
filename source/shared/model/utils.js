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
