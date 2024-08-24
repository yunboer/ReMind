export default function calHeightById(tree, nodeId) {
    console.log(tree)
    if (tree[nodeId].children.length === 0) {
        return tree[nodeId].height;
    } else {
        let childHeight = 0;
        tree[nodeId].children.forEach((childId) => {
            childHeight += calHeightById(tree, childId);
        });
        return Math.max(tree[nodeId].height, childHeight);
    }
}