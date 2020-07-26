import React from 'react';
import styled from 'styled-components';


const GameTile = styled.div`
  height: 400px;
  width: 400px;
  background-image: ${props => props.image};
`;

class GameList extends React.Component {
  constructor(props){
    super(props);
  }

  renderTiles(this.props.allGames){
    const { allGames } = this.props;

    allGames.map(game => {
      <GameTile>
        <p>game.title</p>
      </GameTile>
    })
  }

  render(){
    return(
      <div>
        {this.renderTiles()}
      </div>
    )
  }
}