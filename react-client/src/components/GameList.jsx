import React from "react";
import styled from "styled-components";

const GameTile = styled.div`
  height: 205px;
  width: 250px;
  background-image: url(${(props) =>
    props.bgImg || "https://fakeimg.pl/205x250/"});
  background-position: center;
  background-size: cover;
  margin-bottom: 10px;
  text-align: center;
  color: #c0047d;
  overflow: wrap;
`;

const TitleText = styled.div`
  height: 100%;
  width: 100%;
  line-height: 100%;
  padding: 10%;
  visibility: hidden;

  ${GameTile}:hover & {
    font-weight: 700;
    font-size: 24px;
    visibility: visible;
  }

  &:hover {
    backdrop-filter: blur(10px) brightness(140%);
    overflow: hidden;
  }
`;

const GameListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 520px;
  height: auto;
  justify-content: space-around;
  overflow: scroll;
`;

class GameList extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  renderTiles() {
    const { allGames } = this.props;

    return allGames.map((game, index) => {
      return (
        <GameTile
          key={index}
          theGame={game}
          bgImg={game.image}
          className="gameTile"
          onClick={() => this.handleClick(game)}
        >
          <TitleText>{game.title}</TitleText>
        </GameTile>
      );
    });
  }

  handleClick(game) {
    this.props.clickToUpdate(game);
  }

  render() {
    return (
      <GameListContainer id="gameListContainer">
        {this.renderTiles()}
      </GameListContainer>
    );
  }
}

export default GameList;
