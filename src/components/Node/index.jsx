import React, { useState, useRef, useEffect } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { setNodeHeightById } from "@/store/modules/render";
import calHeightById from "@/utils/calHeight";

export default function Node({ layerKey, siblingKey, nodeKey, nodeId }) {
  const treeInfo = useSelector((state) => state.render.treeInfo);
  let nodeHeight = calHeightById(treeInfo, nodeId);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [focus, setFocus] = useState(false);
  const editorRef = useRef(null);
  const borderRef = useRef(null);

  const updateNodeHeight = () => {
    const border = borderRef.current;
    const value = border.clientHeight + 8;
    dispatch(setNodeHeightById({ nodeId, value }));
  }
  const handleBlur = () => {
    const editor = editorRef.current;
    setFocus(false);
    setText(editor.innerText);
    editor.style.cursor = "default";
  };
  const handleClick = () => {
    const editor = editorRef.current;
    editor.focus();
  };
  const handleFocus = () => {
    const editor = editorRef.current;
    setFocus(true);
    editor.style.cursor = "text";
  };
  const handleInput = () => {
    updateNodeHeight()
  };
  useEffect(() => {
    updateNodeHeight()
  }, [text, focus]);

  return (
    <div
      className="node-container"
      style={{ "--node-container-height": nodeHeight + "px" }}
    >
      <div
        className={focus ? "node-border focus" : "node-border"}
        ref={borderRef}
      >
        <div className="node-box" onClick={handleClick}>
          <span
            className="node-editor"
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onInput={handleInput}
          >
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}
