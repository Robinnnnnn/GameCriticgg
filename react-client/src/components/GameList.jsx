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
  color: whitesmoke;
  overflow: wrap;
  display: flex;
  /* justify-content: center;
  align-items: center; */
`;

const TitleText = styled.div`
  height: 100%;
  width: 100%;
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  ${GameTile}:hover & {
    font-weight: 700;
    font-size: 24px;
    visibility: visible;
  }

  &:hover {
    backdrop-filter: blur(7px) brightness(40%);
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
  margin-right: 8px;
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
          <TitleText>
            <p>{game.title}</p>
          </TitleText>
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
