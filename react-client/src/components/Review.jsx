import React from 'react';
import styled from 'styled-components';

const CircleRating = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 2px solid black;
  text-align: center;
  line-height: 50px;
`;

const CircleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  min-width: 40%;
  margin-right: 10px;
`;

const TextContainer = styled.div`
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  justify-content:center;
  margin-right: auto;
  max-width: 400px;
`;

const ReviewMain = styled.div`
  display:flex;
  width: 75%;
  justify-content: flex-end;
  align-content: center !important;
  margin-bottom: 8px;
`;

const VoteContainer = styled.div`
  width: 6%;
  height: 100%
  display: flex;
  justify-content: space-between;
  line-height: 100%;
`;

const H4 = styled.h4`
  margin: 0 0 0 0;
`;

function Review(props){
  const { oneReview, gameTitle } = props;
  return(
    // flex - column - alignright
    <ReviewMain className="game-review">
      <TextContainer>
        <H4>{ oneReview.author }</H4>
        <div>{ oneReview.review }</div>
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