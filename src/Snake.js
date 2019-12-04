import React, { Component } from "react";
import "./SnakeElements.css";
import Food from "./Food";
import SnakeBody from "./SnakeBody";

const getRandomCoordinates = () => {
  let x = Math.floor(Math.random() * 40);
  let y = Math.floor(Math.random() * 40);
  return [x, y];
};

const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  direction: "RIGHT",
  snakeDots: [
    [0, 0],
    [0, 2]
  ]
};

document.addEventListener("keydown", function(e) {
  if (e.key === 38) {
    this.setState({ direction: "UP" });
  }
  if (e.key === 40) {
    this.setState({ direction: "DOWN" });
  }
  if (e.key === 37) {
    this.setState({ direction: "LEFT" });
  }
  if (e.key === 39) {
    this.setState({ direction: "RIGHT" });
  }
  console.log();
});

class Snake extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  onKeyDown = e => {
    e = e || window.event;
    if (e.key === "ArrowUp") {
      this.setState({ direction: "UP" });
    }
    if (e.key === "ArrowDown") {
      this.setState({ direction: "DOWN" });
    }
    if (e.key === "ArrowLeft") {
      this.setState({ direction: "LEFT" });
    }
    if (e.key === "ArrowRight") {
      this.setState({ direction: "RIGHT" });
    }
  };

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    if (this.state.direction === "RIGHT") {
      head = [head[0] + 2, head[1]];
    }
    if (this.state.direction === "LEFT") {
      head = [head[0] - 2, head[1]];
    }
    if (this.state.direction === "DOWN") {
      head = [head[0], head[1] + 2];
    }
    if (this.state.direction === "UP") {
      head = [head[0], head[1] - 2];
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    });
  };

  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    });
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates()
      });
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake
    });
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      });
    }
  }

  onGameOver() {
    //   alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState);
  }

  render() {
    return (
      <div className="gameCanvas">
        <SnakeBody snakeDots={this.state.snakeDots} />
        <Food dot={this.state.food} />
      </div>
    );
  }
}

export default Snake;
