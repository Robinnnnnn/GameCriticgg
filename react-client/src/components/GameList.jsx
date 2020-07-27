import React from 'react';
import styled from 'styled-components';


const GameTile = styled.div`
  height: 205px;
  width: 250px;
  background-image: url(${props => props.bgImg || "https://fakeimg.pl/205x250/" }) ;
  background-position: center;
  background-size: cover;
  margin-top: 10px;
`;

const GameListContainer = styled.div`
  display:flex;
  flex-wrap:wrap;
  max-width: 600px;
  height: auto;
  justify-content: space-around;
  overflow:scroll;
`;

class GameList extends React.Component {
  constructor(props){
    super(props);
  }

  renderTiles(){
    const { allGames } = this.props;

    return allGames.map((game, index) => {
      return(
        <GameTile key={index} theGame={game} bgImg={game.image} className='gameTile'>
          <p>{game.title}</p>
        </GameTile>
      )
    })
  }

  render(){
    return(
      <GameListContainer id="gameListContainer">
        {this.renderTiles()}
      </GameListContainer>
    )
  }
}

export default GameList;