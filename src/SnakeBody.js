import React from "react";
import head from "./sprites/head.png";
import tail from "./sprites/tail.png";
import belly from "./sprites/belly.png";

const SnakeBody = props => {
  return (
    <div>
      {props.snakeDots.map((dot, i) => {
        let element = belly;
        let rot = "rotate(0deg)";

        if (i === 0) {
          element = tail;
        }
        if (i === props.snakeDots.length - 1) {
          element = head;
        }
        if (props.direction === "DOWN") {
          rot = "rotate(90deg)";
        }
        if (props.direction === "UP") {
          rot = "rotate(270deg)";
        }
        if (props.direction === "LEFT") {
          rot = "scaleX(-1)";
        }
        const style = {
          left: `${dot[0] * 10}px`,
          top: `${dot[1] * 10}px`,
          transform: `${rot}`
        };
        return (
          <div className="snakeBody" key={i} style={style}>
            <img src={element} key={i} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default SnakeBody;
