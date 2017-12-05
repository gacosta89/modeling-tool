// boxes types
export const DEFAULT_TYPE_OBJ = {
    type: 'default',
    style: {
        borderWidth: 0
    },
};

export const BOX_TYPE = 'box';
export const ROOT_TYPE = 'root';
export const BACKGROUND_TYPE = 'background';

// empty node obj

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
    backgroundImgSrc: '',
    type: BOX_TYPE,
    show: false,
    name: '',
    description: '',
};

// node fields
export const NODE_NAME = 'name';
export const NODE_DESCRIPTION = 'description';

// tools

export const BOX_TOOL = 'box';
export const SELECT_TOOL = 'select';
export const RESIZE_TOOL = 'resize';
export const MOVE_TOOL = 'move';
export const DELETE_TOOL = 'delete';
