import "./index.scss";
import LayerContainer from "../LayerContainer";
import { useSelector } from "react-redux";
import React, { createContext, useRef, memo } from "react";
import TreeNode from "../TreeNode";

export const RefsContext = createContext(null);

const RootContainer = memo(({offsetX, offsetY}) => {
  console.log(offsetX)
  const refs = useRef({});
  return (
    <RefsContext.Provider value={refs.current}>
      <div className="root-container" style={{"--offset-x": offsetX + 'px', "--offset-y": offsetY + 'px'}}>
        <TreeNode nodeId={"root"}></TreeNode>
      </div>
    </RefsContext.Provider>
  );
});

export default RootContainer;
