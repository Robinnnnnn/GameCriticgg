import React from "react";
import styled from "styled-components";

const ProgContainer = styled.div`
  height: 100%;
  width: 100%;
  min-width: 20px;
  min-height: 20px;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  position: relative;
`;

const Num = styled.div`
  /* height: 100%;
  width: 100%; */
  line-height: 100%;
  text-align: center;
  position: absolute;
  transform: rotate(90deg);
  font-size: 24px;
  top: 38.5%;
  left: 42.6%;
  font-weight: bold;
`;

class CircleRating extends React.Component {
  constructor(props) {
    super(props);

    const { radius, stroke, value } = this.props;

    this.getProgress = this.getProgress.bind(this);
    this.getStrokeColor = this.getStrokeColor.bind(this);

    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

  getProgress(val) {
    return val * 20;
  }

  getStrokeColor(val) {
    if (val == 1) {
      return "#f5424e";
    } else if (val == 2) {
      return "#f5a142";
    } else if (val == 3) {
      return "#6ff542";
    } else if (val == 4) {
      return "#42cef5";
    } else {
      return "#8142f5";
    }
  }

  render() {
    const { radius, stroke, value } = this.props;

    const strokeDashoffset =
      this.circumference - (this.getProgress(value) / 100) * this.circumference;

    return (
      <ProgContainer id="circle-prog-box">
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke={this.getStrokeColor(value)}
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
        <Num>{value}</Num>
      </ProgContainer>
    );
  }
}

export default CircleRating;
