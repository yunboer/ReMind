import "./index.scss"
import LayerContainer from "../LayerContainer";
import { useSelector } from "react-redux";
const RootContainer = () => {
    const render = useSelector((state) => state.render);
    const layer_cnt = render.nodes.length;
    return (
    <div className="root-container">
        {Array(layer_cnt).fill().map((_, i) => (<LayerContainer key={i} layerKey={i} />))}
    </div>
    );
}

export default RootContainer;