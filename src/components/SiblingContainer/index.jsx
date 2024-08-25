import "./index.scss";
import Node from "../Node";
import { useSelector } from "react-redux";
import getParentId from "@/utils/getParentId";


const SiblingContainer = ({ layerKey, siblingKey }) => {
  const render = useSelector((state) => state.render);
  const node_cnt = render.nodes[layerKey][siblingKey].length;
  const parentId = getParentId(render.nodes, layerKey, siblingKey);
  console.log(render.nodes, layerKey, siblingKey, parentId)
  return (
    <div className="sibling-container" style={{"--sibling-container-min-height": parentId ? render.treeInfo[parentId]?.height + "px" : "auto" }}>
      {Array(node_cnt)
        .fill()
        .map((_, i) => (
          <Node key={render.nodes[layerKey][siblingKey][i]} nodeId={render.nodes[layerKey][siblingKey][i]}/>
        ))}
    </div>
  );
};

export default SiblingContainer;
