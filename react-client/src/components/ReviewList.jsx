import React from 'react';
import Review from './Review.jsx';
import styled from 'styled-components';

const ReviewListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 15px;
  margin-left: 15px;
`;

class ReviewList extends React.Component {
  constructor(props){
    super(props);

  }

  render(){
    return(
      <ReviewListContainer>
        {this.props.oneGame.reviews.map((review, index) => {
          return <Review oneReview={review} key={index} gameTitle={this.props.oneGame.title}/>
        })}
      </ReviewListContainer>
    )
  }

}

export default ReviewList;