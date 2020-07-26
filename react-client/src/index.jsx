import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
    //query the DB and return all 40 games
    axios.get('/gameslist')
      .then(games => {
        this.setState({gameList: games.data});
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