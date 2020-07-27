import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';
import GameList from './components/GameList.jsx';
import GameHighlight from './components/GameHighlight.jsx';

const MainTop = styled.div`
  border: 1px solid red;
  display:flex;
  justify-content: space-between;
  height: 50vh;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    this.display = this.display.bind(this);
    this.updateHighlight = this.updateHighlight.bind(this);
  }

  componentDidMount(){
    //query the DB and return all 40 games
    axios.get('/gameslist')
      .then(games => {
        this.setState({
          gameList: games.data,
          oneGame: games.data[0],
        });
      })
  }

  updateHighlight(game){
    this.setState({oneGame: game})
  }

  display(){
    const { gameList, oneGame } = this.state;
    if(gameList){
      return (
        <MainTop id="mainTop">
          <GameList allGames={ gameList } clickToUpdate={this.updateHighlight} />
          <GameHighlight oneGame={oneGame} />
        </MainTop>
      )
    } else{
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