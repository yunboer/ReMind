import "./index.scss";

const Canvas = ({backgroundColor="#bfc", ...props}) => {
  return <div 
  className="canvas" 
  style={{"--primary-color": backgroundColor}}
  {...props} ></div>;
};

export default Canvas;
