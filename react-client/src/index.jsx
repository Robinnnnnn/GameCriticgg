import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount(){
    //query the DB and return all 40 games
    axios.get('/gamesList')
      .then(games => {
        const gamelist = game.data;
        this.setState(gameList: gameList);
      })
  }


  render () {
    return (
    <div>
      <div></div>
      <h1>Item List</h1>

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));