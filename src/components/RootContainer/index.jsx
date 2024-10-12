import "./index.scss";
import React, { createContext, useRef, memo } from "react";
import TreeNode from "../TreeNode";

export const RefsContext = createContext(null);

const RootContainer = memo(({offsetX, offsetY, scale}) => {
  const refs = useRef({});
  return (
    <RefsContext.Provider value={refs.current}>
      <div className="root-container" style={{"--offset-x": offsetX + 'px', "--offset-y": offsetY + 'px', "--scale": scale}}>
        <TreeNode nodeId={"root"}></TreeNode>
      </div>
    </RefsContext.Provider>
  );
});

export default RootContainer;
