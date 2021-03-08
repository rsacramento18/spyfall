import React  from 'react';
import { Switch, BrowserRouter as Router, Redirect, Route, Link} from "react-router-dom";
import CreateJoin from './pages/createjoin';
import CreateGame from './pages/creategame';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={CreateJoin}/>
          <Route path="/creategame" exact component={CreateGame}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
