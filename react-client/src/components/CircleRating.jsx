import React from "react";
import styled from "styled-components";

const ProgContainer = styled.div`
  height: 100%;
  width: 100%;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`;

class CircleRating extends React.Component {
  constructor(props) {
    super(props);

    const { radius, stroke, value } = this.props;

    this.getProgress = this.getProgress.bind(this);

    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

  getProgress(val) {
    return val * 20;
  }

  render() {
    const { radius, stroke, value } = this.props;

    const strokeDashoffset =
      this.circumference - (this.getProgress(value) / 100) * this.circumference;

    return (
      <ProgContainer>
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="black"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={this.circumference + " " + this.circumference}
            style={{ strokeDashoffset }}
            r={this.normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
          />
        </svg>
      </ProgContainer>
    );
  }
}

export default CircleRating;
