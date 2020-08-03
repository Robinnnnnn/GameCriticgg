import React from "react";
import styled from "styled-components";
import uniqid from "uniqid";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 500px;
  min-width: 300px;
`;

const BigBoyImg = styled.div`
  width: auto;
  background-image: url(${(props) => props.bgImage});
  background-position: center;
  background-size: cover;
  height: 600px;
`;
const HighlightInfo = styled.div`
  width: 100%;
  height: 400px;
  text-align: center;
`;

const FlexOne = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: left;
`;

function GameHighlight(props) {
  const { oneGame } = props;

  // Just getting each games overall rating based on the reviews
  let total = 0;
  oneGame.reviews.forEach((review) => (total = total + review.user_overall));
  let gcScore = total / oneGame.reviews.length;
  if (gcScore % Math.floor(gcScore) > 0) {
    gcScore = gcScore.toFixed(2);
  }

  return (
    <Container id="gameHighlight">
      <BigBoyImg id="big-image" bgImage={oneGame.image}></BigBoyImg>
      <HighlightInfo id="big-image">
        <h1>{oneGame.title}</h1>
        <FlexOne>
          <div>
            <h3>Available On:</h3>
            <ul>
              {oneGame.platforms.map((platform) => {
                return <li key={uniqid()}> {platform} </li>;
              })}
            </ul>
          </div>
          <div>
            <h3>GCrit Score: {gcScore}</h3>
          </div>
          <div>
            <h3>Tags:</h3>
            <ul>
              {oneGame.genres.map((genre) => {
                return <li key={uniqid()}> {genre} </li>;
              })}
            </ul>
          </div>
        </FlexOne>
      </HighlightInfo>
    </Container>
  );
}

export default GameHighlight;
