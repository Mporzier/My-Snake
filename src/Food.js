import React from "react";
import food from "./sprites/apple.png";
import "./SnakeElements.css";

const Food = props => {
  const style = {
    left: `${props.dot[0] * 20}px`,
    top: `${props.dot[1] * 20}px`
  };
  return (
    <div className="snakeFood" style={style}>
      <img src={food} alt="" />
    </div>
  );
};

export default Food;
