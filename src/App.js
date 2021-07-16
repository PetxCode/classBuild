import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HeaderNav from "./components/HeaderNav";
import HomeScreen from "./components/HomeScreen";
import TaskInput from "./components/TaskInput";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <HeaderNav />
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/addTask" component={TaskInput} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
