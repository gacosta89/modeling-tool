export const BOX_TYPE = 'box';
export const ROOT_TYPE = 'root';

export const EMPTY_NODE = {
    parentId: '',
    id: '@@EMPTY_NODE',
    childrenIds: [],
    relX: 0,
    relY: 0,
    absX: 0,
    absY: 0,
    width: 0,
    height: 0,
    type: BOX_TYPE,
    show: false,
};
