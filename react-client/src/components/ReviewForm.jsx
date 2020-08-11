import React from "react";
import styled from "styled-components";
import axios from "axios";
import uniqid from "uniqid";

const Holder = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  height: 230px;
  width: 600px;
  margin-top: 15px;
  color: whitesmoke;
`;

const FormMain = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
`;

const UsernameInput = styled.input`
  width: 230px;
  height: 20px;
  line-height: 20px;
  background-color: transparent;
  color: white;
  border-radius: 4px;
`;

const RadioChoice = styled.div`
  display: flex;
  justify-content: space-around;
`;

const SubmitButton = styled.button`
  max-width: 250px;
  height: 30px;
  background-color: teal;
`;

class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      text: "",
      art: null,
      sound: null,
      gameplay: null,
    };

    this.handleUNChange = this.handleUNChange.bind(this);
    this.handleArtChange = this.handleArtChange.bind(this);
    this.handleSoundChange = this.handleSoundChange.bind(this);
    this.handleGameplayChange = this.handleGameplayChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.getOverall = this.getOverall.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUNChange(event) {
    this.setState({ username: event.target.value });
  }

  handleGameplayChange(event) {
    this.setState({ gameplay: parseInt(event.target.value) });
  }

  handleArtChange(event) {
    this.setState({ art: parseInt(event.target.value) });
  }

  handleSoundChange(event) {
    this.setState({ sound: parseInt(event.target.value) });
  }

  handleTextChange(event) {
    this.setState({ text: event.target.value });
  }

  getOverall() {
    const { art, sound, gameplay } = this.state;
    let avg = (art + sound + gameplay) / 3;
    return avg.toFixed(1);
  }

  handleSubmit(event) {
    // send as post request to the db and then trigger and refresh of review list component
    event.preventDefault();
    const { changeDisplay } = this.props;

    // gameId is how we find the specific game in the DB
    const gameId = this.props.oneGame["_id"];
    const { username, gameplay, art, sound, text } = this.state;

    // stored because we want to use the same unique id twice for each table
    const getUnique = uniqid();

    const reviewObj = {
      author: username,
      user_overall: this.getOverall(),
      user_gameplay: gameplay,
      user_art: art,
      user_sound: sound,
      review: text,
      unique: getUnique,
    };

    axios({
      method: "post",
      url: `/newreview/${gameId}`,
      data: reviewObj,
    })
      .then(() => {
        axios({
          method: "post",
          url: `/userreview/${username}`,
          data: reviewObj,
        });
      })
      .then((response) => {
        changeDisplay();
      });
  }

  render() {
    return (
      <FormMain action="#">
        <UsernameInput
          type="text"
          value={this.state.username}
          onChange={this.handleUNChange}
          placeholder="Username"
        />
        <br></br>
        <h6>Game Mechanics</h6>
        <RadioChoice>
          <p>
            <label>
              <input
                type="radio"
                value="1"
                id="g1"
                name="gameplay"
                onChange={this.handleGameplayChange}
              />
              <span>1</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="radio"
                value="2"
                id="g2"
                name="gameplay"
                onChange={this.handleGameplayChange}
              />
              <span>2</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="radio"
                value="3"
                id="g3"
                name="gameplay"
                onChange={this.handleGameplayChange}
              />
              <span>3</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="radio"
                value="4"
                id="g4"
                name="gameplay"
                onChange={this.handleGameplayChange}
              />
              <span>4</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="radio"
                value="5"
                id="g5"
                name="gameplay"
                // className="with-gap"
                onChange={this.handleGameplayChange}
              />
              <span>5</span>
            </label>
          </p>
        </RadioChoice>
        <h6>Game Art</h6>
        <RadioChoice>
          <p>
            <label>
              <input
                type="radio"
                value="1"
                id="a1"
                name="art"
                onChange={this.handleArtChange}
              />
              <span>1</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="radio"
                value="2"
                id="a2"
                name="art"
                onChange={this.handleArtChange}
              />
              <span>2</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="radio"
                value="3"
                id="a3"
                name="art"
                onChange={this.handleArtChange}
              />
              <span>3</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="radio"
                value="4"
                id="a4"
                name="art"
                onChange={this.handleArtChange}
              />
              <span>4</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="radio"
                value="5"
                id="a5"
                name="art"
                onChange={this.handleArtChange}
              />
              <span>5</span>
            </label>
          </p>
        </RadioChoice>
        <h6>Game Sound</h6>
        <RadioChoice>
          <p>
            <label>
              <input
                type="radio"
                value="1"
                id="s1"
                name="sound"
                onChange={this.handleSoundChange}
              />
              <span>1</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="radio"
                value="2"
                id="s2"
                name="sound"
                onChange={this.handleSoundChange}
              />
              <span>2</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="radio"
                value="3"
                id="s3"
                name="sound"
                onChange={this.handleSoundChange}
              />
              <span>3</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="radio"
                value="4"
                id="s4"
                name="sound"
                onChange={this.handleSoundChange}
              />
              <span>4</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="radio"
                value="5"
                id="s5"
                name="sound"
                onChange={this.handleSoundChange}
              />
              <span>5</span>
            </label>
          </p>
        </RadioChoice>
        <div className="input-field">
          <TextArea
            type="text"
            value={this.state.text}
            onChange={this.handleTextChange}
            placeholder="Begin writing review here..."
            id="textArea"
          />
        </div>

        <SubmitButton onClick={this.handleSubmit}> Submit Review </SubmitButton>
      </FormMain>
    );
  }
}

export default Review;
