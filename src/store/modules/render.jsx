import { createSlice, current } from "@reduxjs/toolkit";

/*
    the tree node structure is like this:
    {
        "root": {
            nodeId: "root",
            layerKey: 0, // siblingKey = parent->nodeKey
            nodeKey: 0,
            children: [],
            parent: null,
            text: "",
            height: null, // update by component
        }
    }
    layerKey means the layer of the node
    siblingKey means the sibling of the node
    nodeKey means the node of the sibling
    there is an example:
        Root                // layerKey = 0, siblingKey = 0, nodeKey = 0
            Child 1         // layerKey = 1, siblingKey = 0, nodeKey = 0
                Child 1.1   // layerKey = 2, siblingKey = 0, nodeKey = 0
                Child 1.2   // layerKey = 2, siblingKey = 0, nodeKey = 1
            Child 2         // layerKey = 1, siblingKey = 0, nodeKey = 1
                Child 2.1   // layerKey = 2, siblingKey = 1, nodeKey = 0
*/

function updateTreeInfoById(tree, Id) {
  const node = tree[Id];
  if (node.children.length === 0) {
    return;
  }
  const layerKey = node.layerKey + 1;
  node.children.forEach((childId, nodeKey) => {
    tree[childId].layerKey = layerKey;
    tree[childId].nodeKey = nodeKey;
    tree[childId].parent = Id;
    updateTreeInfoById(tree, childId);
  });
}

function _deleteNodeById(tree, Id) {
  const node = tree[Id];
  if (node.children.length !== 0) {
    node.children.forEach((childId) => {
      _deleteNodeById(tree, childId);
    });
  }
  delete tree[Id];
}

function getNodesByTreeInfo(tree, nodes = [], nodeId = "root") {
  // 初始化根节点的情况
  if (nodeId === "root") {
    nodes = [[["root"]]];
  }

  // 递归处理当前节点的子节点
  tree[nodeId].children.forEach((childId) => {
    const layerKey = tree[childId].layerKey;
    const siblingKey = tree[tree[childId].parent].nodeKey;

    // 初始化当前层级
    if (!nodes[layerKey]) {
      nodes[layerKey] = [];
    }

    // 确保当前层级的数组中没有稀疏位置
    for (let i = 0; i <= siblingKey; i++) {
      if (!nodes[layerKey][i]) {
        nodes[layerKey][i] = 0; // 用 0 填充所有空位
      }
    }

    // 如果兄弟节点组已经存在并且不是数组，需要转换为数组
    if (!Array.isArray(nodes[layerKey][siblingKey])) {
      nodes[layerKey][siblingKey] = [];
    }

    // 添加当前节点到对应的层级和兄弟节点组
    nodes[layerKey][siblingKey].push(childId);

    // 递归调用子节点
    getNodesByTreeInfo(tree, nodes, childId);
  });
  return nodes;  // 返回最终的节点数组
}


const renderStore = createSlice({
  name: "render",
  initialState: {
    nodes: [[["root"]], [["b"]]],
    layers: [100, 200],
    x: 100,
    y: 100,
    treeInfo: {
      root: {
        nodeId: "root",
        layerKey: 0, // siblingKey = parent->nodeKey
        nodeKey: 0,
        children: ["b"],
        parent: null,
        text: "",
        height: null, // update by component
      },
      b: {
        nodeId: "b",
        layerKey: 1, // siblingKey = parent->nodeKey
        nodeKey: 0,
        children: [],
        parent: "root",
        text: "",
        height: null, // update by component
      },
    },
  },
  reducers: {
    setLayers: (state, action) => {
      state.layers = action.payload;
    },
    setNodes: (state, action) => {
      state.nodes = action.payload;
    },
    setNodeHeightById: (state, action) => {
      const { nodeId, value } = action.payload;
      state.treeInfo[nodeId].height = value;
    },
    appendChildById: (state, action) => {
      const { nodeId, newId } = action.payload;
      console.log(nodeId)
      state.treeInfo[newId] = {
        nodeId: newId,
        layerKey: state.treeInfo[nodeId].layerKey + 1,
        nodeKey: state.treeInfo[nodeId].children.length,
        children: [],
        parent: nodeId,
        text: "",
        height: null,
      };
      state.treeInfo[nodeId].children.push(newId);
      state.nodes = getNodesByTreeInfo(current(state.treeInfo), [], "root");
      console.log(state.nodes)
      console.log(state.treeInfo)
      if (state.layers.length <= state.treeInfo[newId].layerKey) {
        state.layers.push(200);
      }
    },
    addSiblingById: (state, action) => {
      const { nodeId, newId } = action.payload;
      if (state.treeInfo[nodeId].parent === null) {
        return;
      }
      const parent = state.treeInfo[nodeId].parent;
      const nodeKey = state.treeInfo[nodeId].nodeKey;

      state.treeInfo[newId] = {
        nodeId: newId,
        layerKey: state.treeInfo[parent].layerKey,
        nodeKey: nodeKey + 1,
        children: [],
        parent: parent,
        text: "",
        height: null,
      };
      state.treeInfo[parent].children.splice(nodeKey + 1, 0, newId);
      updateTreeInfoById(state.treeInfo, parent);
      state.nodes = getNodesByTreeInfo(current(state.treeInfo), [], "root");
    },
    deleteNodeById: (state, action) => {
      const { nodeId } = action.payload;
      if (state.treeInfo[nodeId].parent === null) {
        return;
      }
      const parent = state.treeInfo[nodeId].parent;
      const nodeKey = state.treeInfo[nodeId].nodeKey;
      state.treeInfo[parent].children.splice(nodeKey, 1);
      _deleteNodeById(state.treeInfo, nodeId);
      updateTreeInfoById(state.treeInfo, parent);
      state.nodes = getNodesByTreeInfo(current(state.treeInfo), [], "root");
    },
    setX: (state, action) => {
      state.x = action.payload;
    },
    setY: (state, action) => {
      state.y = action.payload;
    },
  },
});

export const {
  setLayers,
  setNodeHeightById,
  setNodes,
  appendChildById,
  addSiblingById,
  deleteNodeById,
  setX,
  setY,
} = renderStore.actions;
export default renderStore.reducer;
