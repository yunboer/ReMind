import "./index.scss";
import Node from "../Node";
import { useSelector } from "react-redux";

const SiblingContainer = ({ layerKey, siblingKey }) => {
  const render = useSelector((state) => state.render);
  const node_cnt = render.nodes[layerKey][siblingKey].length;
//   console.log(state.render.nodes)
//   console.log(siblingKey, layerKey, node_cnt)
  return (
    <div className="sibling-container">
      {Array(node_cnt)
        .fill()
        .map((_, i) => (
          <Node key={render.nodes[layerKey][siblingKey][i]} nodeId={render.nodes[layerKey][siblingKey][i]}/>
        ))}
    </div>
  );
};

export default SiblingContainer;
