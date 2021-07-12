import React from "react";
import { Switch, Route } from "react-router-dom";
//Pages
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Artist from "../pages/Artist";
import Artists from "../pages/Artists";
import Albums from "../pages/Albums";
import Album from "../pages/Album";
export default function routes({ user, setReloadApp, playerSoung }) {
  return (
    <Switch>
      <Route exact path="/settings">
        <Settings setReloadApp={setReloadApp} user={user} />
      </Route>

      <Route exact path="/artists">
        <Artists />
      </Route>
      <Route exact path="/artist/:id">
        <Artist playerSoung={playerSoung} />
      </Route>
      <Route exact path="/albums">
        <Albums />
      </Route>
      <Route exact path="/album/:id">
        <Album playerSoung={playerSoung} />
      </Route>
      <Route exact path="/">
        <Home playerSoung={playerSoung} />
      </Route>
    </Switch>
  );
}
