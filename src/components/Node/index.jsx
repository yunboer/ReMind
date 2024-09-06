import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setNodeHeightById,
  addSiblingById,
  appendChildById,
  deleteNodeById,
} from "@/store/modules/render";
import calHeightById from "@/utils/calHeight";
import { RefsContext } from "@/components/RootContainer";
import { v4 as uuidv4 } from "uuid";

export default function Node({ nodeId }) {
  // redux获取信息
  const dispatch = useDispatch();
  const treeInfo = useSelector((state) => state.render.treeInfo);
  const layers = useSelector((state) => state.render.layers);
  const nodeWidth = layers[treeInfo[nodeId].layerKey];

  // let nodeHeight = calHeightById(treeInfo, nodeId);
  const [text, setText] = useState("");
  const [focus, setFocus] = useState(true);
  const editorRef = useRef(null);
  const borderRef = useRef(null);
  const nodeHeight = useRef(0);
  const refs = useContext(RefsContext);

  const updateNodeHeight = () => {
    const border = borderRef.current;
    if (nodeHeight.current !== border.clientHeight + 8) {
      nodeHeight.current = border.clientHeight + 8;
      const value = nodeHeight.current;
      dispatch(setNodeHeightById({ nodeId, value }));
    }
  };
  const handleInput = () => {
    updateNodeHeight();
  };
  const handleBlur = (event) => {
    setFocus(false);
    setText(event.target.innerText);
  };
  const handleClick = () => {
    setFocus(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const newId = uuidv4();
      dispatch(appendChildById({ nodeId, newId }));
    }
    if (e.key === "Enter") {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault(); // 阻止默认行为
        document.execCommand("insertLineBreak");
      } else {
        e.preventDefault();
        const newId = uuidv4();
        dispatch(addSiblingById({ nodeId, newId }));
      }
    }
    if ((e.key === "Backspace" || e.key === "Delete") && text === "") {
      e.preventDefault();
      // console.log(treeInfo[nodeId])
      dispatch(deleteNodeById({ nodeId }));
    }
  };

  // 使用一个focus变量动态维护
  useEffect(() => {
    if (focus) {
      const editor = editorRef.current;
      editor.focus();
    }
  }, [focus]);

  useEffect(() => {
    refs[nodeId] = editorRef;
    updateNodeHeight();
    return () => {
      delete refs[nodeId]; // 在组件卸载时清除 ref
    };
  }, [nodeId]);

  return (
    <div
      className={focus ? "node-container focus" : "node-container"} // 通过focus属性维护外层边框的样式
      style={{ "--node-container-width": nodeWidth + "px" }} // 通过nodeWidth动态维护的css变量
      ref={borderRef} // dom元素获取
    >
      <div
        className="node-box"
        ref={editorRef}
        contentEditable
        onClick={handleClick}
        onBlur={handleBlur}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning={true}
        onMouseDown={(e) => {
          if (document.activeElement === e.target) e.stopPropagation();
        }}
      >
        {text}
      </div>
    </div>
  );
}
