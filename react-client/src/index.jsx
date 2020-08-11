import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import axios from "axios";
import styled from "styled-components";
import GameList from "./components/GameList.jsx";
import GameHighlight from "./components/GameHighlight.jsx";
import ReviewList from "./components/ReviewList.jsx";
import ReviewForm from "./components/ReviewForm.jsx";
import HeaderBar from "./components/HeaderBar.jsx";
import TopReviewers from "./components/TopReviewers.jsx";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 76vw;
`;

const MainTop = styled.div`
  display: flex;
  justify-content: space-around;
  height: 50vh;
  /* flex-wrap: wrap-reverse; */
`;

const MainBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50vh;
  align-items: center;
`;

const CreateReview = styled.div`
  height: 40px;
  width: 300px;
  background: rgb(68, 244, 184);
  background: radial-gradient(
    circle,
    rgba(68, 244, 184, 1) 0%,
    rgba(60, 122, 194, 1) 100%
  );
  line-height: 40px;
  text-align: center;
  border-radius: 5px;
  color: black;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  align-self: center;
  margin-top: 20px;
  margin-bottom: 20px;

  &:active {
    background: rgb(60, 122, 194);
    background: radial-gradient(
      circle,
      rgba(60, 122, 194, 1) 0%,
      rgba(68, 244, 184, 1) 100%
    );
  }

  &:hover {
    transform: scale(1.1);
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bottomDisplay: true,
    };

    this.display = this.display.bind(this);
    this.updateHighlight = this.updateHighlight.bind(this);
    this.changeBottomDisplay = this.changeBottomDisplay.bind(this);
    this.updateReviewVotes = this.updateReviewVotes.bind(this);
    this.displayTopReviewers = this.displayTopReviewers.bind(this);
    this.checkTopReviewers = this.checkTopReviewers.bind(this);
  }

  componentDidMount() {
    //query the DB and return all 40 games
    axios.get("/gameslist").then((games) => {
      this.setState({
        gameList: games.data,
        currentGame: games.data[0],
      });
    });
  }

  updateHighlight(game) {
    this.setState({ currentGame: game });
  }

  changeBottomDisplay() {
    const { currentGame } = this.state;

    axios
      .get("/gameslist")
      .then((gamelist) => {
        let updatedCurrentGame;

        //find the updated game data for the game we just reviewed
        gamelist.data.forEach((game) => {
          if (game.title === currentGame.title) {
            updatedCurrentGame = game;
          }
        });

        const stuffToReturn = {
          updatedCurrentGame: updatedCurrentGame,
          allGames: gamelist,
        };
        return stuffToReturn;
      })
      .then((games) => {
        this.setState({
          bottomDisplay: !this.state.bottomDisplay,
          gameList: games.allGames.data,
          currentGame: games.updatedCurrentGame,
        });
      });
  }

  display() {
    const { gameList, currentGame, bottomDisplay } = this.state;

    //if the games are loaded from db, bottomList toggles whether to show form or reviews
    if (gameList && bottomDisplay) {
      return (
        <Main>
          <MainTop id="mainTop">
            <GameList
              allGames={gameList}
              clickToUpdate={this.updateHighlight}
            />
            <GameHighlight oneGame={currentGame} />
          </MainTop>
          <MainBottom>
            <ReviewList
              oneGame={currentGame}
              updateVotes={this.updateReviewVotes}
            />
            <CreateReview onClick={this.changeBottomDisplay}>
              Create Review
            </CreateReview>
          </MainBottom>
        </Main>
      );
    } else if (gameList && !bottomDisplay) {
      //if bottomDisplay is false, show the Form View
      return (
        <Main>
          <MainTop id="mainTop">
            <GameList
              allGames={gameList}
              clickToUpdate={this.updateHighlight}
            />
            <GameHighlight oneGame={currentGame} />
          </MainTop>
          <MainBottom>
            <ReviewForm
              changeDisplay={this.changeBottomDisplay}
              oneGame={currentGame}
            />
          </MainBottom>
        </Main>
      );
    } else {
      return <h1>Sec, fixing loadout...</h1>;
    }
  }

  updateReviewVotes(gameId) {
    axios.get(`/updatereview/${gameId}`).then((updatedGame) => {
      this.setState({
        currentGame: updatedGame.data,
      });
    });
  }

  checkTopReviewers(listOfUsers) {
    this.setState({ topReviewers: listOfUsers });
  }

  displayTopReviewers() {
    if (this.state.topReviewers) {
      const { topReviewers } = this.state;
      return <TopReviewers listOfTopReviewers={topReviewers} />;
    }
  }

  render() {
    return (
      <div>
        <HeaderBar getTopReviewers={this.checkTopReviewers} />
        {this.display()}
        {this.displayTopReviewers()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
