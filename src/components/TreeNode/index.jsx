import Node from "../Node";
import { useSelector } from "react-redux";
import "./index.scss";
import { useState, useEffect, useRef } from "react";

const TreeNode = ({ nodeId }) => {
  const render = useSelector((state) => state.render);
  const children = render.treeInfo[nodeId].children;
  const childrenRef = useRef(null);
  const [childrenHeight, setChildrenHeight] = useState(0);

  useEffect(() => {
    setChildrenHeight(childrenRef.current?.offsetHeight);
    console.log(nodeId, childrenRef.current?.offsetHeight);
  }, [childrenRef.current?.offsetHeight]);

  return (
    <div className="tree-container">
      <Node nodeId={nodeId} />
      <div className="children-decorator">
        {children.length ? (
          <svg width="20px" height={childrenHeight + "px"}>
            <path
              d="M 9 10 C 9 5, 9 5, 18 5"
              stroke="black"
              strokeWidth="2px"
              fill="none"
            />
            <line
              x1="9"
              y1="10"
              x2="9"
              y2={childrenHeight - 10}
              stroke="black"
              strokeWidth="2px"
            />
            <path
              d={
                "M 9 " +
                (childrenHeight - 10) +
                " C 9 " +
                (childrenHeight - 5) +
                ", 9 " +
                (childrenHeight - 5) +
                ", 18 " +
                (childrenHeight - 5)
              }
              stroke="black"
              strokeWidth="2px"
              fill="none"
            />
          </svg>
        ) : null}
        <div className="child-container" ref={childrenRef}>
          {children.map((childId) => (
            <TreeNode key={childId} nodeId={childId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreeNode;
