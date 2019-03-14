import React, { Component } from "react";
import { Form } from "semantic-ui-react";
class SummonerForm extends Component {
  state = {
    summonerName: "",
    inputError: false
  };

  onInputChange = (e, { value }) => {
    this.setState({ summonerName: value });
  };

  render() {
    return (
      <Form
        onSubmit={async () => {
          await this.props.getSummonerMatches(this.state.summonerName);
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

export default SummonerForm;
