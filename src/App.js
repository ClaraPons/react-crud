import React, { Component } from "react";
import { Switch , Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial.component.js";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component.js";


class App extends Component {
  render() {
    return (
        <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tutorials" className="navbar-brand"><img alt="logo" src={"https://uncovered-steed-83c.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0c96706b-0f12-4af5-bd00-b5ac2147e4e1%2FUntitled.png?table=block&id=6f5b8325-e9db-4ea2-bdb9-1abb195fe675&spaceId=300c3047-f879-4dae-a195-770da596c3d1&width=660&userId=&cache=v2"} />
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        
        <div className="container mt-3">
          <Switch>
            <Route exact path="/" component={TutorialsList}/>
            <Route exact path= "/tutorials" component={TutorialsList} />
            <Route path="/add" component={AddTutorial}/>
            <Route path="/tutorials/:id" component={Tutorial}/>
          </Switch>
        </div>
      </div>
    
  );
  }
}

export default App;
