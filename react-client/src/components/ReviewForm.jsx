import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Holder = styled.div`
  display:flex;
  justify-content: space-around;
  width: 60%;
`;

class Review extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      username: "",
      text: "Write Review Here",
      art: null,
      sound: null,
      gameplay: null,
    }

    this.handleUNChange = this.handleUNChange.bind(this);
    this.handleArtChange = this.handleArtChange.bind(this);
    this.handleSoundChange = this.handleSoundChange.bind(this);
    this.handleGameplayChange = this.handleGameplayChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.getOverall = this.getOverall.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUNChange(event){
    this.setState({ username: event.target.value})
  }

  handleGameplayChange(event){
    this.setState({ gameplay: parseInt(event.target.value)})
  }

  handleArtChange(event){
    this.setState({ art: parseInt(event.target.value)})
  }

  handleSoundChange(event){
    this.setState({ sound: parseInt(event.target.value)})
  }

  handleTextChange(event){
    this.setState({ text: event.target.value})
  }

  getOverall(){
    const { art, sound, gameplay } = this.state;
    let avg = (art + sound + gameplay ) / 3;
    return avg.toFixed(1);
  }

  handleSubmit(event){
    // send as post request to the db and then trigger and refresh of review list component
    event.preventDefault();
    const { changeDisplay } = this.props;
    const gameId = this.props.oneGame['_id'];
    const { username, gameplay, art, sound, text } = this.state;

    const reviewObj = {
      author: username,
      user_overall: this.getOverall(),
      user_gameplay: gameplay,
      user_art: art,
      user_sound: sound,
      review: text,
    }

    axios({
      method: 'post',
      url: `/newreview/${gameId}`,
      data: reviewObj,
    })
      .then(() => {
        axios({
          method: 'post',
          url: `/userreview/${username}`,
          data: reviewObj
        })
      })
      .then((response) => {
        changeDisplay();
      })

  }

  render(){
    return(
       <form>

        <label>
          Username:
          <input type="text" value={this.state.username} onChange={this.handleUNChange} />
        </label> <br></br>

        <Holder>
          <label>
            Gameplay Score : <br></br>
            <input type="radio" value='1' id="g1" name='gameplay' onChange={this.handleGameplayChange} />
            <label htmlFor='g1'>1</label> <br></br>
            <input type="radio" value='2' id="g1" name='gameplay' onChange={this.handleGameplayChange} />
            <label htmlFor='g1'>2</label> <br></br>
            <input type="radio" value='3' id="g1" name='gameplay' onChange={this.handleGameplayChange} />
            <label htmlFor='g1'>3</label> <br></br>
            <input type="radio" value='4' id="g1" name='gameplay' onChange={this.handleGameplayChange} />
            <label htmlFor='g1'>4</label> <br></br>
            <input type="radio" value='5' id="g1" name='gameplay' onChange={this.handleGameplayChange} />
            <label htmlFor='g1'>5</label> <br></br>
          </label> <br></br>

          <label>
            Game Art Score :<br></br>
            <input type="radio" value='1' id="a1" name='art' onChange={this.handleArtChange} />
            <label htmlFor='a1'>1</label> <br></br>
            <input type="radio" value='2' id="a1" name='art' onChange={this.handleArtChange} />
            <label htmlFor='a1'>2</label> <br></br>
            <input type="radio" value='3' id="a1" name='art' onChange={this.handleArtChange} />
            <label htmlFor='a1'>3</label> <br></br>
            <input type="radio" value='4' id="a1" name='art' onChange={this.handleArtChange} />
            <label htmlFor='a1'>4</label> <br></br>
            <input type="radio" value='5' id="a1" name='art' onChange={this.handleArtChange} />
            <label htmlFor='a1'>5</label> <br></br>
          </label> <br></br>

          <label>
            Game Sound Score :<br></br>
            <input type="radio" value='1' id="s1" name='sound' onChange={this.handleSoundChange} />
            <label htmlFor='s1'>1</label> <br></br>
            <input type="radio" value='2' id="s1" name='sound' onChange={this.handleSoundChange} />
            <label htmlFor='s1'>2</label> <br></br>
            <input type="radio" value='3' id="s1" name='sound' onChange={this.handleSoundChange} />
            <label htmlFor='s1'>3</label> <br></br>
            <input type="radio" value='4' id="s1" name='sound' onChange={this.handleSoundChange} />
            <label htmlFor='s1'>4</label> <br></br>
            <input type="radio" value='5' id="s1" name='sound' onChange={this.handleSoundChange} />
            <label htmlFor='s1'>5</label> <br></br>
          </label> <br></br>
        </Holder>

        <label>
          Add a comment:<br></br>
          <input type="text" value={this.state.text} onChange={this.handleTextChange} />
        </label>


        <button onClick={this.handleSubmit}> Submit Review </button>

      </form>
    )
  }
}

export default Review;

