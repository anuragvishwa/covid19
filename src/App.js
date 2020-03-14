import React from "react";
import logo from "./logo.svg";
import "./App.css";

import BasicFixedColumns from "./Table";
import TwitterHastag from "./Twitter";

function App() {
  return (
    <div className="App">
      <BasicFixedColumns></BasicFixedColumns>
      <TwitterHastag></TwitterHastag>
    </div>
  );
}

export default App;
