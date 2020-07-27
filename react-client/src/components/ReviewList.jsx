import React from 'react';
import Review from './Review.jsx';
import styled from 'styled-components';

const ReviewListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  margin-left: 15px;
  overflow: scroll;
  height: 88%;
`;

class ReviewList extends React.Component {
  constructor(props){
    super(props);

  }

  render(){
    return(
      <ReviewListContainer id="review-container">
        {this.props.oneGame.reviews.map((review, index) => {
          return <Review oneReview={review} key={index} gameid={this.props.oneGame['_id']}/>
        })}
      </ReviewListContainer>
    )
  }

}

export default ReviewList;