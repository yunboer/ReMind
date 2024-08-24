import React, { useState, useRef, useEffect } from "react";
import "./index.scss";

export default function Node() {
  const [text, setText] = useState("");
  const [focus, setFocus] = useState(false);
  const editorRef = useRef();
  const containerRef = useRef();
  const handleBlur = () => {
    setText(editorRef.current.innerText);
    setFocus(false);
  };

  const updateContainer = () => {
    const editor = editorRef.current;
    const container = containerRef.current;
    container.style.width = "300px";
    container.style.width = Math.min(editor.offsetWidth + 1, 300) + "px";
    container.style.height = "auto";
  };

  const handleFocus = () => {
    const editor = editorRef.current;
    setFocus(true);
    editor.focus();
  };
  const handleMouseDown = (e) => {
    const editor = editorRef.current;
    if (document.activeElement !== editor) e.preventDefault();
  };

  useEffect(() => {
    updateContainer();
  }, [text]);
  return (
    <div className={focus ? "rootnode focus" : "rootnode"}>
      <div
        className="container"
        ref={containerRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onDoubleClick={handleFocus}
      >
        <span
          className="editor"
          contentEditable
          suppressContentEditableWarning={true}
          ref={editorRef}
          onBlur={handleBlur}
          onInput={updateContainer}
          onFocus={handleFocus}
          onMouseDown={handleMouseDown}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
