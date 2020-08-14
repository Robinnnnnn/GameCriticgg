import React from "react";
import Review from "./Review.jsx";
import styled from "styled-components";
import M from "materialize-css";

const ReviewListContainer = styled.ul`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  /* margin-left: 15px; */
  /* overflow: scroll;
  max-height: 425px;
  min-width: 800px; */
`;

const ReviewListHeader = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 14px 60px 14px 0px;
  margin-left: 5px;
  border-bottom: 4px solid #c0047d;
`;

const RLHeaderRight = styled.div`
  align-self: flex-end;
  display: flex;
  justify-content: space-around;
  width: 400px;
`;

const EmptyReviews = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 400px;
  color: #039686;
  font-size: 38px;
`;

class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.display = this.display.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
  }

  display() {
    const { reviews } = this.props.oneGame;

    if (reviews.length > 0) {
      return (
        <ReviewListContainer id="review-container" className="collapsible">
          <ReviewListHeader>
            <div>player</div>
            <RLHeaderRight>
              <div>overall</div>
              <div>mechanics</div>
              <div>art</div>
              <div>sound</div>
            </RLHeaderRight>
          </ReviewListHeader>
          {this.props.oneGame.reviews.map((review, index) => {
            return (
              <Review
                oneReview={review}
                key={index}
                gameid={this.props.oneGame["_id"]}
                updateVotes={this.props.updateVotes}
              />
            );
          })}
        </ReviewListContainer>
      );
    } else {
      return (
        <EmptyReviews>
          <div>Be the first one to Review this Game!</div>
        </EmptyReviews>
      );
    }
  }

  render() {
    return <div>{this.display()}</div>;
  }
}

export default ReviewList;
