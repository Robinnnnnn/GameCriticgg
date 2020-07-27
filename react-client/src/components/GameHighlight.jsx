import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display:flex;
  border: 1px solid black;
`;

function GameHighlight(props){

  return(
    <Container id="gameHighlight">
      <div id="big-image">Image Here</div>
    </Container>
  )
}

export default GameHighlight;