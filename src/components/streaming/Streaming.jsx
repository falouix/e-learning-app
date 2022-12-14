import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "../../routes/CreateRoom";
import Room from "../../routes/Room";
function Streaming() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/app" exact component={CreateRoom} />
          <Route path="/app/room/:roomID/" component={Room} />
          <Route path="/app/userid/:roomID/" component={Room} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Streaming;