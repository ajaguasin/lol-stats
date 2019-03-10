import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import axios from "axios";

class SummonerInput extends Component {
  state = {
    summonerName: "",
    inputError: false
  };

  onInputChange = (e, { value }) => {
    this.setState({ summonerName: value });
  };

  handleSubmit = () => {
    try {
      fetch(`/summoner?summonerName=${this.state.summonerName}`)
        .then(res => res.text())
        .then(result => console.log(result));
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <Form
        onSubmit={e => {
          this.handleSubmit(e);
        }}
      >
        <Form.Field>
          <label>League Stats</label>
          <Form.Input
            label="Summoner Name"
            placeholder="Enter Summoner Name"
            value={this.state.summonerName}
            onChange={this.onInputChange}
            error={this.state.inputError}
          />
        </Form.Field>
      </Form>
    );
  }
}

export default SummonerInput;
