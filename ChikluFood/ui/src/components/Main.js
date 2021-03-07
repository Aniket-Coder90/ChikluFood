import React, { Fragment } from "react";
import { render } from "react-dom";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import checkout from "./Checkout/checkout";
const Main = () => {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/menu/:Restname" component={Home} />
          <Route exact  path="/menu/:Restname/checkout" component={checkout} />
        </Switch>
      </Router>
    </Fragment>
  );
};

const appDiv = document.getElementById("app");
render(<Main />, appDiv);

export default Main;
