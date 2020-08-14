import React from "react";
import styled from "styled-components";
import axios from "axios";

const HeaderMain = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0396a6;
  color: black;
  padding: 20px;
  border-radius: 0 0 10px 10px;
  margin-bottom: 8px;
`;

const NavButtonsContainer = styled.div`
  display: flex;
  font-family: "Ubuntu";
`;

const NavButtons = styled.a`
  padding: 3px;
  color: #141726;

  &:hover {
    color: #c0047d;
    text-decoration: underline;
  }
`;

const TitleName = styled.div`
  font-family: "Righteous";
  font-size: 26px;
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
        <TitleName>GameCriticgg</TitleName>
        <NavButtonsContainer>
          <NavButtons onClick={this.sendTopReviewers} href="#footer-bar">
            Top Reviewers
          </NavButtons>
          <NavButtons>Home</NavButtons>
        </NavButtonsContainer>
      </HeaderMain>
    );
  }
}

export default HeaderBar;
