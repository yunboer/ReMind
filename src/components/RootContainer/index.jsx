import "./index.scss";
import LayerContainer from "../LayerContainer";
import { useSelector } from "react-redux";
import React, { createContext, useRef } from "react";

export const RefsContext = createContext(null);

const RootContainer = () => {
  const refs = useRef({});
  const render = useSelector((state) => state.render);
  const layer_cnt = render.nodes.length;
  return (
    <RefsContext.Provider value={refs.current}>
      <div className="root-container">
        {Array(layer_cnt)
          .fill()
          .map((_, i) => (
            <LayerContainer key={i} layerKey={i} />
          ))}
      </div>
    </RefsContext.Provider>
  );
};

export default RootContainer;
