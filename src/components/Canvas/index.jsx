import { useRef, useState } from "react";
import "./index.scss";
import RootContainer from "../RootContainer";

// 背景组件，主要用于设定背景样式
const Canvas = ({ backgroundColor = "#bfc" }) => {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [mouseStyle, setMouseStyle] = useState("grab");
  const isDragging = useRef(null);
  const startX = useRef(null);
  const startY = useRef(null);
  const handleMouseDown = (e) => {
      isDragging.current = true; // 开始拖动
      startX.current = e.clientX; // 鼠标的位置
      startY.current = e.clientY;
      setMouseStyle("grabbing");
  };
  const handleMouseMove = (e) => {
    if (isDragging.current) {
      const deltaX = e.clientX - startX.current;
      const deltaY = e.clientY - startY.current;
      startX.current = e.clientX;
      startY.current = e.clientY;
      setOffsetX((offsetX) => offsetX + deltaX);
      setOffsetY((offsetY) => offsetY + deltaY);
    }
  };
  const handleMouseUp = (e) => {
    if (isDragging.current) {
      isDragging.current = false;
      setMouseStyle("grab");
    }
  };
  return (
    <div
      className="canvas"
      style={{
        "--primary-color": backgroundColor,
        "--mouse-style": mouseStyle,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <RootContainer offsetX={offsetX} offsetY={offsetY} />
    </div>
  );
};

export default Canvas;
