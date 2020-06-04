import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import CardStock from './components/CardStock';
import CreateCard from './components/CreateCard';

import './style.css'


const App = props => {
  return (
    <div className="router">
      <main>
        {/*
            NOTE: The syntax below is for React-Router
              - A helpful library for routing with a React app.
              You can learn more about this at:
              https://reacttraining.com/react-router/web/guides/quick-start
        */}
        <Switch>
          <Route
            exact
            path="/"
            component={CardStock}
          />
          <Route
            exact
            path="/add"
            component={CreateCard}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
