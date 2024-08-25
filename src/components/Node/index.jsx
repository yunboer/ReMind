import React, { useState, useRef, useEffect, useContext, useLayoutEffect } from "react";
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
  // redux
  const dispatch = useDispatch();
  const treeInfo = useSelector((state) => state.render.treeInfo);
  const layers = useSelector((state) => state.render.layers);
  const nodeWidth = layers[treeInfo[nodeId].layerKey]

  // let nodeHeight = calHeightById(treeInfo, nodeId);
  const [text, setText] = useState("");
  const [focus, setFocus] = useState(false);
  const editorRef = useRef(null);
  const borderRef = useRef(null);
  const refs = useContext(RefsContext);

  const updateNodeHeight = () => {
    const border = borderRef.current;
    const value = border.clientHeight + 8;
    dispatch(setNodeHeightById({ nodeId, value }));
  };
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
    updateNodeHeight();
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
  useEffect(() => {
    updateNodeHeight();
  }, [text, focus]);

  useEffect(() => {
    refs[nodeId] = editorRef;
    return () => {
      delete refs[nodeId]; // 在组件卸载时清除 ref
    };
  }, [nodeId]);
  useEffect(() => {
    const editor = editorRef.current;
    editor.focus();
  }, []);

  return (
    <div
      className="node-container"
      style={{ "--node-container-width": nodeWidth + "px" }}
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
            onKeyDown={handleKeyDown}
          >
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}
