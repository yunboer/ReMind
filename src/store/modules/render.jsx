import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

/*
    the tree node structure is like this:
    {
        "root": {
            id: "root",
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

function deleteNodeById(tree, Id) {
  const node = tree[Id];
  if (node.children.length !== 0) {
    node.children.forEach((childId) => {
      deleteNodeById(tree, childId);
    });
  }
  delete tree[Id];
}

function getNodesByTreeInfo(tree, nodes = [], id) {
  if (id === "root") {
    nodes = [[["root"]]];
    tree[id].children.forEach((childId) => {
      getNodesByTreeInfo(tree, nodes, childId);
    });
  } else {
    const layerKey = tree[id].layerKey;
    const siblingKey = tree[tree[id].parent].nodeKey;
    if (nodes[layerKey] === undefined) {
      nodes[layerKey] = [];
    }
    if (nodes[layerKey][siblingKey] === undefined) {
      nodes[layerKey][siblingKey] = [];
    }
    nodes[layerKey][siblingKey].push(id);
  }
}

const renderStore = createSlice({
  name: "render",
  initialState: {
    nodes: [
      [["root"]],
      [["b"]],
    ],
    layers: [100, 200],
    x: 100,
    y: 100,
    treeInfo: {
      root: {
        id: "root",
        layerKey: 0, // siblingKey = parent->nodeKey
        nodeKey: 0,
        children: ["b"],
        parent: null,
        text: "",
        height: null, // update by component
      },
      b: {
        id: "b",
        layerKey: 1, // siblingKey = parent->nodeKey
        nodeKey: 0,
        children: [],
        parent: null,
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
      const { id } = action.payload;
      const new_id = uuidv4();
      state.treeInfo[new_id] = {
        id: new_id,
        layerKey: state.treeInfo[id].layerKey + 1,
        nodeKey: state.treeInfo[id].children.length,
        children: [],
        parent: id,
        text: "",
        height: null,
      };
      state.treeInfo[id].children.push(new_id);
      updateTreeInfoById(state.treeInfo, id);
      const nodes = [];
      getNodesByTreeInfo(state.treeInfo, nodes, "root");
      state.nodes = nodes;
    },
    addSiblingById: (state, action) => {
      const { id } = action.payload;
      if (state.treeInfo[id].parent === null) {
        return;
      }
      const parent = state.treeInfo[id].parent;
      const nodeKey = state.treeInfo[id].nodeKey;
      const new_id = uuidv4();
      state.treeInfo[new_id] = {
        id: new_id,
        layerKey: state.treeInfo[parent].layerKey,
        nodeKey: nodeKey + 1,
        children: [],
        parent: parent,
        text: "",
        height: null,
      };
      state.treeInfo[parent].children.splice(nodeKey + 1, 0, new_id);
      updateTreeInfoById(state.treeInfo, parent);
      const nodes = [];
      getNodesByTreeInfo(state.treeInfo, nodes, "root");
      state.nodes = nodes;
    },
    deleteNodeById: (state, action) => {
      const { id } = action.payload;
      if (state.treeInfo[id].parent === null) {
        return;
      }
      const parent = state.treeInfo[id].parent;
      const nodeKey = state.treeInfo[id].nodeKey;
      state.treeInfo[parent].children.splice(nodeKey, 1);
      deleteNodeById(state.treeInfo, id);
      updateTreeInfoById(state.treeInfo, parent);
      const nodes = [];
      getNodesByTreeInfo(state.treeInfo, nodes, "root");
      state.nodes = nodes;
    },
    setX: (state, action) => {
      state.x = action.payload;
    },
    setY: (state, action) => {
      state.y = action.payload;
    },
  },
});

export const { setLayers, setNodeHeightById, setNodes, setX, setY } =
  renderStore.actions;
export default renderStore.reducer;
