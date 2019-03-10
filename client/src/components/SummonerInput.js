import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import Results from "./Results";
class SummonerInput extends Component {
  state = {
    summonerName: "",
    inputError: false,
    summonerGameDetails: undefined
  };

  onInputChange = (e, { value }) => {
    this.setState({ summonerName: value });
  };

  handleSubmit = async () => {
    try {
      await fetch(`/summoner?summonerName=${this.state.summonerName}`)
        .then(res => res.json())
        .then(result => {
          this.setState({ summonerGameDetails: result });
        });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <>
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

        {this.state.summonerGameDetails && (
          <Results
            summonerGameDetails={this.state.summonerGameDetails.mydetails}
            matchDetails={this.state.summonerGameDetails.match}
            summonerName={this.state.summonerName}
          />
        )}
      </>
    );
  }
}

export default SummonerInput;
