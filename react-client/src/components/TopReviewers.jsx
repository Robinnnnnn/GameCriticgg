import React from "react";
import styled from "styled-components";

const TopReviewersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  min-width: 300px;
  margin-top: 30px;
`;

const TRMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

function TopReviewers(props) {
  const { listOfTopReviewers } = props;
  const newListOfReviewers = listOfTopReviewers.reverse();
  return (
    <TRMain>
      <TopReviewersContainer>
        <div>Rank</div>
        <div>Critic</div>
        <div>Points</div>
        <div># of reviews</div>
      </TopReviewersContainer>
      {newListOfReviewers.map((user, index) => {
        return (
          <TopReviewersContainer key={index}>
            <h2>{`${index + 1}. `}</h2>
            <h1>{user.author}</h1>
            <h3>{user.intPoints}</h3>
            <h3>{user.numberOfReviews}</h3>
          </TopReviewersContainer>
        );
      })}
    </TRMain>
  );
}

export default TopReviewers;
