import React from "react";
import styled from "styled-components";
import uniqid from "uniqid";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  min-width: 300px;
  font-family: "Oxygen";
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
  border: 3px solid #03658c;
  padding-bottom: 9px;
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
        <h4>{oneGame.title}</h4>
        <FlexOne>
          <div>
            <h6>Available On:</h6>
            <ul>
              {oneGame.platforms.map((platform) => {
                return <li key={uniqid()}> {platform} </li>;
              })}
            </ul>
          </div>
          <div>
            <h6>GCrit Score: {gcScore || 0}</h6>
          </div>
          <div>
            <h6>Tags:</h6>
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
