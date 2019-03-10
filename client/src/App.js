import React, { Component } from "react";
import Layout from "./components/Layout";
import SummonerInput from "./components/SummonerInput";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <SummonerInput />
        </Layout>
      </div>
    );
  }
}

export default App;
