import React from "react";
import head from "./sprites/head.png";

const SnakeBody = props => {
  return (
    <div>
      {props.snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0] * 20}px`,
          top: `${dot[1] * 20}px`
        };
        return (
          <div className="snakeBody" key={i}>
            <img src={head} key={i} style={style} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default SnakeBody;
