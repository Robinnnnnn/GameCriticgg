import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';
import GameList from './components/GameList.jsx';
import GameHighlight from './components/GameHighlight.jsx';
import ReviewList from './components/ReviewList.jsx';
import ReviewForm from './components/ReviewForm.jsx'

const Main = styled.div`
  display:flex;
  flex-direction:column;
  max-width: 100vw;
  max-height: 98vh;
`;

const MainTop = styled.div`
  border: 1px solid red;
  display:flex;
  justify-content: space-around;
  height: 50vh;
`;

const MainBottom = styled.div`
  border: 1px solid blue;
  display:flex;
  flex-direction:column;
  justify-content: space-between;
  height: 50vh;
`;

const CreateReview = styled.div`
  height: 25px;
  width: 100px;
  background-color: red;
  line-height 25px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bottomDisplay: true,
    }

    this.display = this.display.bind(this);
    this.updateHighlight = this.updateHighlight.bind(this);
    this.changeBottomDisplay = this.changeBottomDisplay.bind(this);

  }

  componentDidMount(){
    //query the DB and return all 40 games
    axios.get('/gameslist')
      .then(games => {
        this.setState({
          gameList: games.data,
          currentGame: games.data[0],
        });
      })
  }

  updateHighlight(game){
    this.setState({currentGame: game})
  }

  changeBottomDisplay(){
    const { currentGame } = this.state;

    axios.get('/gameslist')
    .then((gamelist) => {
      let updatedCurrentGame;

      //find the updated game data for the game we just reviewed
      gamelist.data.forEach(game => {
        if (game.title === currentGame.title){
          updatedCurrentGame = game;
        }
      })

      const stuffToReturn = {
        updatedCurrentGame: updatedCurrentGame,
        allGames: gamelist
      }
      return stuffToReturn;

    })
      .then(games => {

        this.setState({
          bottomDisplay: !this.state.bottomDisplay,
          gameList: games.allGames.data,
          currentGame: games.updatedCurrentGame,

        });
      })
  }

  display(){
    const { gameList, currentGame, bottomDisplay } = this.state;
    if ( gameList && bottomDisplay ) {
      return (
        <Main>
          <MainTop id="mainTop">
            <GameList allGames={ gameList } clickToUpdate={this.updateHighlight} />
            <GameHighlight oneGame={currentGame} />
          </MainTop>
          <MainBottom>
            <ReviewList oneGame={currentGame} />
            <CreateReview onClick={this.changeBottomDisplay}> Create Review </CreateReview>
          </MainBottom>
        </Main>

      )
    } else if (gameList && !bottomDisplay){
      return(
        <Main>
          <MainTop id="mainTop">
            <GameList allGames={ gameList } clickToUpdate={this.updateHighlight} />
            <GameHighlight oneGame={currentGame} />
          </MainTop>
          <ReviewForm changeDisplay={this.changeBottomDisplay} oneGame={currentGame} />
        </Main>
      )
    } else {
      return <h1>Sec, fixing loadout...</h1>
    }
  }


  render () {
    return (
      <div>
        { this.display() }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));