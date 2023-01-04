import React, { Component } from "react";
import PlayerDataService from '../services/player.service';

export default class AddPlayer extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangePosA = this.onChangePosA.bind(this);
    this.onChangePosB = this.onChangePosB.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.savePlayer = this.savePlayer.bind(this);
    this.newPlayer = this.newPlayer.bind(this);

    this.state = {
      p_id: "test-id-1",
      p_name: "",
      p_age: 0,
      position_a: "",
      position_b: "",
      p_location: ""
    };
  }

  onChangeName(e) {
    this.setState({
      p_name: e.target.value
    });
  }
  onChangeAge(e) {
    this.setState({
      p_age: e.target.value
    });
  }
  onChangePosA(e) {
    this.setState({
      position_a: e.target.value
    });
  }
  onChangePosB(e) {
    this.setState({
      position_b: e.target.value
    });
  }
  onChangeLocation(e) {
    this.setState({
      p_location: e.target.value
    });
  }
  
  savePlayer() {
    var data = {
      p_id: this.state.p_id,
      p_name: this.state.p_name,
      p_age: this.state.p_age,
      position_a: this.state.position_a,
      position_b: this.state.position_b,
      p_location: this.state.p_location,
    };

    PlayerDataService.create(data)
      .then(response => {
        this.setState({
          p_id: response.data.id,
          p_name: response.data.p_name,
          p_age: response.data.p_age,
          position_a: response.data.position_a,
          position_b: response.data.position_b,
          p_location: response.data.p_location
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newPlayer() {
    this.setState({
      p_id: "test-id-1",
      p_name: "",
      p_age: 0,
      position_a: "",
      position_b: "",
      p_location: ""
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newPlayer}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.p_name}
                onChange={this.onChangeName}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Age</label>
              <input
                type="number"
                className="form-control"
                id="age"
                required
                value={this.state.p_age}
                onChange={this.onChangeAge}
                name="age"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Position A</label>
              <input
                type="text"
                className="form-control"
                id="posA"
                required
                value={this.state.position_a}
                onChange={this.onChangePosA}
                name="posA"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Position B</label>
              <input
                type="text"
                className="form-control"
                id="posB"
                required
                value={this.state.position_b}
                onChange={this.onChangePosB}
                name="posB"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                required
                value={this.state.p_location}
                onChange={this.onChangeLocation}
                name="location"
              />
            </div>

            <button onClick={this.savePlayer} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}