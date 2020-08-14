import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #c0047d;
  color: #141726;
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  line-height: 45px;
  padding: 5px 25px 5px 25px;
  border-radius: 10px 10px 0 0;
`;

const FooterButtons = styled.div`
  /* color: #141726; */\
  padding: 0 11px 0 0;

  color: #141726;

  &:hover {
    color: #74024A;
    text-decoration: underline;
    font-weight:700;
  }
`;

const FooterButtonContainer = styled.div`
  display: flex;
`;

const CodedBy = styled.h6`
  padding-right: auto;
`;

function Footer() {
  return (
    <FooterContainer id="footer-bar">
      <h6> &lt;/&gt; by Iluvatar </h6>
      <FooterButtonContainer>
        <FooterButtons href="#"> Home </FooterButtons>
        <FooterButtons href="#"> Top Reviewers </FooterButtons>
        <FooterButtons href="#"> Github </FooterButtons>
      </FooterButtonContainer>
    </FooterContainer>
  );
}

export default Footer;
