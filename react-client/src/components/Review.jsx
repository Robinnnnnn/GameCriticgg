import React from "react";
import styled from "styled-components";
import axios from "axios";
import CircleRating from "./CircleRating.jsx";

const CircleRatingBox = styled.div`
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
  align-items: center;
  min-width: 400px;
  margin-right: 10px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-right: auto;
  max-width: 800px;
  overflow: scroll;
`;

const ReviewMain = styled.div`
  display: flex;
  width: 90%;
  justify-content: flex-end;
  align-items: center !important;
  margin-bottom: 8px;
`;

const VoteContainer = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 100%;
  margin-right: 5px;
`;

const H4 = styled.h4`
  margin: 0 0 0 0;
`;

const ArrowContainer = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  margin-right: 7px;
`;

const UpArrowCounter = styled.p`
  color: ${(props) => (props.color ? "green" : "white")};
`;

const DownArrowCounter = styled.p`
  color: ${(props) => (props.color ? "red" : "white")};
`;

const Arrows = styled.div`
  &:hover {
    transform: scale(1.2);
  }
`;

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votePressed: false,
      supvotes: 0,
      sdownvotes: 0,
    };

    this.handleVote = this.handleVote.bind(this);
    this.changeColorUp = this.changeColorUp.bind(this);
    this.changeColorDown = this.changeColorDown.bind(this);
  }

  handleVote(event, voteType) {
    //increment the upvote counter on the review
    //axios request to update the record
    //toggle the state to votePressed
    const reviewId = this.props.oneReview.unique;
    const gameId = this.props.gameid;
    const author = this.props.oneReview.author;

    //checks if user alredy voted
    // if they refresh the page, they will be able to vote again
    // keep a log of all the reviews the user voted on and crosscheck to see if they already voted on this review
    if (this.state.votePressed) {
      window.alert("You already voted. n3wb.");
      return;
    }

    if (voteType === "upvote") {
      this.changeColorUp(event);
    } else {
      this.changeColorDown(event);
    }

    axios({
      method: "put",
      url: `/${voteType}/${reviewId}/${gameId}/${author}`,
    })
      .then(() => {
        this.setState({
          votePressed: !this.state.votePressed,
        });
      })
      .then(() => {
        // used to update state of app so that new upvote number is displayed automatically
        this.props.updateVotes(this.props.gameid);
      });
  }

  changeColorUp(event) {
    console.log(event.target.classList);
    // event.target.classList.add("green");

    //counter
    let sibling = event.target.nextElementSibling;
    sibling.setAttribute("style", "color: green;");
  }

  changeColorDown(event) {
    console.log(event.target.classList);
    // event.target.classList.add("green");

    //counter
    let sibling = event.target.nextElementSibling;
    sibling.setAttribute("style", "color: red;");
  }

  render() {
    const { oneReview } = this.props;
    const { upvotes, downvotes } = this.props.oneReview;

    return (
      // flex - column - alignright
      <ReviewMain className="game-review">
        <TextContainer>
          <H4>{oneReview.author}</H4>
          <div>{oneReview.review}</div>
        </TextContainer>
        <CircleContainer>
          <CircleRating radius="50" stroke="6" value={oneReview.user_overall} />
          <CircleRating
            radius="50"
            stroke="6"
            value={oneReview.user_gameplay}
          />
          <CircleRating radius="50" stroke="6" value={oneReview.user_art} />
          <CircleRating radius="50" stroke="6" value={oneReview.user_sound} />
          {/* <CircleRating>{oneReview.user_overall}</CircleRating>
          <CircleRating>{oneReview.user_gameplay}</CircleRating>
          <CircleRating>{oneReview.user_art}</CircleRating>
          <CircleRating>{oneReview.user_sound}</CircleRating> */}
        </CircleContainer>
        <VoteContainer>
          <ArrowContainer className="upvote-container">
            <Arrows
              className="material-icons"
              onClick={(event) => this.handleVote(event, "upvote")}
            >
              arrow_upward
            </Arrows>
            <UpArrowCounter>{upvotes}</UpArrowCounter>
          </ArrowContainer>
          <ArrowContainer className="downvote-container">
            <Arrows
              className="material-icons"
              onClick={(event) => this.handleVote(event, "downvote")}
            >
              arrow_downward
            </Arrows>
            <DownArrowCounter>{downvotes}</DownArrowCounter>
          </ArrowContainer>
        </VoteContainer>
      </ReviewMain>
    );
  }
}

export default Review;
