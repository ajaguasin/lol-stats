import React, { Component } from "react";
import Layout from "./components/Layout";
import SummonerInput from "./components/SummonerForm";
import Results from "./components/Results";

class App extends Component {
  state = {
    summonerGameDetails: null
  };

  getSummonerMatches = async data => {
    console.log(data);
    try {
      await fetch(`/summoner?summonerName=${data}`)
        .then(res => res.json())
        .then(result => {
          console.log(result);
          this.setState({ summonerGameDetails: result });
        });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div className="App">
        <Layout>
          <SummonerInput
            getSummonerMatches={this.getSummonerMatches}
            summonerGameDetails={this.state.summonerGameDetails}
          />

          {this.state.summonerGameDetails && (
            <Results
              mydetails={this.state.summonerGameDetails.mydetails}
              match={this.state.summonerGameDetails.match}
            />
          )}
        </Layout>
      </div>
    );
  }
}

export default App;
