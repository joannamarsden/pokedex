import React from "react";
import {
  Routes as Switch,
  Route,
} from "react-router-dom";
import Pokedex from '../pages/pokedex';
import Species from '../pages/species';

function Routes() {
  return(
    <Switch>
      <Route
        exact
        path="/"
        element={<Pokedex />}
      />
      <Route
        exact
        path="/species/:name"
        element={<Species />}
      />
    </Switch>
  );
}

export default Routes;
