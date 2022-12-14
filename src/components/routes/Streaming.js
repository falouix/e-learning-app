import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./CreateRoom";
import Room from "./Room";

function Streaming() {
  return (
    <div className="App">
      <h1>Streaming</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/app" exact component={CreateRoom} />
          <Route path="/room/:roomID" component={Room} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Streaming;
