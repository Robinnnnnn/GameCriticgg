import React from "react";
import styled from "styled-components";
import axios from "axios";

const HeaderMain = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(68, 244, 184);
  background: radial-gradient(
    circle,
    rgba(68, 244, 184, 1) 0%,
    rgba(60, 122, 194, 1) 100%
  );
  color: black;
  padding: 20px;
  border-radius: 0 0 10px 10px;
  margin-bottom: 8px;
`;

const SearchBar = styled.div`
  width: 400px;
  background-color: white;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border: 2px solid darkblue;
`;

const NavButtonsContainer = styled.div`
  display: flex;
`;

const NavButtons = styled.div`
  padding: 3px;
`;

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);

    this.sendTopReviewers = this.sendTopReviewers.bind(this);
  }

  sendTopReviewers() {
    const { getTopReviewers } = this.props;
    //axios request
    axios
      .get("/reviewers")
      .then((reviewerList) => getTopReviewers(reviewerList.data))
      .catch(() => []);
  }

  render() {
    return (
      <HeaderMain>
        <div>GameCriticgg</div>
        <SearchBar>Search Bar Temp</SearchBar>
        <NavButtonsContainer>
          <NavButtons onClick={this.sendTopReviewers}>Top Reviewers</NavButtons>
          <NavButtons>Home</NavButtons>
        </NavButtonsContainer>
      </HeaderMain>
    );
  }
}

export default HeaderBar;
