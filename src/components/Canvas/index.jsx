import { useEffect, useRef, useState } from "react";
import "./index.scss";
import RootContainer from "../RootContainer";
import throttle from "@/utils/throttle";

const Canvas = ({ backgroundColor }) => {
  const [scale, setScale] = useState(1);
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
  useEffect(() => {
    const handleWheel = (event)=>{
      event.preventDefault(); // 阻止默认的缩放行为
      throttle((event) => {
        if (event.ctrlKey) {
          const zoomFactor = 0.1;
          setScale((scale) => {
            if (event.deltaY < 0) {
              return Math.min(Math.max(0.5, scale + zoomFactor), 3);
            } else {
              return Math.min(Math.max(0.5, scale - zoomFactor), 3);
            }
          });
        }
      }, 17)(event);
    }
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  },[]);
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
      <RootContainer offsetX={offsetX} offsetY={offsetY} scale={scale} />
    </div>
  );
};

export default Canvas;
