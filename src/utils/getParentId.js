export default function getParentId(nodes, layerKey, siblingKey) {
  if (layerKey === 0) {
    return null;
  }
  let idx = siblingKey;
  for (let sibling of nodes[layerKey - 1]) {
    if (sibling.length <= idx) {
      idx -= sibling.length;
    } else {
      return sibling[idx];
    }
  }
}