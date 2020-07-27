import React from 'react';
import styled from 'styled-components';

const CircleRating = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  border: 2px solid black;
  text-align: center;
  line-height: 80px;
`;

const CircleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 40%;
`;

const TextContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content: left;
`;

const ReviewMain = styled.div`
  display:flex;
  width: 75%;
  justify-content: space-between;
  align-content: center;
`;

const VoteContainer = styled.div`
  width: 6%;
  height: 100%
  display: flex;
  justify-content: space-between;
  line-height: 100%;
`;

function Review(props){
  const { oneReview, gameTitle } = props;
  return(
    // flex - column - alignright
    <ReviewMain className="game-review">
      <TextContainer>
        <h4>{ oneReview.author }</h4>
        <div>{gameTitle}: { oneReview.review }</div>
      </TextContainer>
      <CircleContainer>
        <CircleRating>{ oneReview.user_overall }</CircleRating>
        <CircleRating>{ oneReview.user_gameplay }</CircleRating>
        <CircleRating>{ oneReview.user_art }</CircleRating>
        <CircleRating>{ oneReview.user_sound }</CircleRating>
      </CircleContainer>
      <VoteContainer>
        <div className='material-icons'>arrow_upward</div>
        <div className='material-icons'>arrow_downward</div>
      </VoteContainer>
    </ReviewMain>

  )
}

export default Review;