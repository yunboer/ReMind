import "./index.scss";
import Node from "../Node";
import SiblingContainer from "../SiblingContainer";
import { useSelector } from "react-redux";

const LayerContainer = ({layerKey}) => {
  const render = useSelector((state) => state.render);
  const sibling_cnt = render.nodes[layerKey].length;
  const layerWidth = render.layers[layerKey];
  return (
    <div className="layer-container" style={{"--layer-container-width": layerWidth + "px"}}>
        {Array(sibling_cnt).fill().map((_, i) => (<SiblingContainer key={i} layerKey={layerKey} siblingKey={i} />))}
    </div>
  );
};

export default LayerContainer;
