import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  width: 10%;
  height: 100%
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 100%;
`;

const H4 = styled.h4`
  margin: 0 0 0 0;
`;

const ArrowContainer = styled.div`
  width:auto;
  display:flex;
  align-items:center;
`;


class Review extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      votePressed: false,
      supvotes: 0,
      sdownvotes: 0,
    }

    this.handleDownvote = this.handleDownvote.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
  }

  handleUpvote(e) {
    //increment the upvote counter on the review
      //axios request to update the record
      //toggle the state to votePressed

    const reviewId = this.props.oneReview.unique;
    const gameId = this.props.gameid;
    const author = this.props.oneReview.author;

    //checks if user alredy voted
    // if they refresh the page, they will be able to vote again
      // keep a log of all the reviews the user voted on and crosscheck to see if they already voted on this review
    if(this.state.votePressed){
      return;
    } else {
      axios({
        method:'put',
        url: `/upvote/${reviewId}/${gameId}/${author}`,
      })
      .then(() => {
        this.setState({
          votePressed : !this.state.votePressed,
        })
      })

    }

  }

  handleDownvote(e) {
    const reviewId = this.props.oneReview['_id'];
    const gameId = this.props.gameid;
    const downvoteValue = document.getElementById('downvoteCounter').textContent;
    if (this.state.votePressed){
      return;
    }else{
      axios({
        method: 'put',
        url: `/downvote/${reviewId}/${gameId}`,
      })
        .then(() => {
          this.setState({
            votePressed : !this.state.votePressed,

          })
          // sdownvotes: this.state.sdownvotes++,
        })
    }
  }

  render(){
    const { oneReview } = this.props;
    const { upvotes, downvotes } = this.props.oneReview;
    const { supvotes, sdownvotes } = this.state;

    return (
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
          <ArrowContainer id="upvote-container">
            <div className='material-icons' onClick={this.handleUpvote}>arrow_upward</div>
            <p id="upvoteCounter">{upvotes || 0}</p>
          </ArrowContainer>
          <ArrowContainer id="downvote-container">
            <div className='material-icons' onClick={this.handleDownvote}>arrow_downward</div>
            <p id="downvoteCounter">{downvotes || sdownvotes || 0}</p>
          </ArrowContainer>
        </VoteContainer>
      </ReviewMain>
    )
  }

}

export default Review;