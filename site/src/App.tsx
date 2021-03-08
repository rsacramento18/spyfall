import React  from 'react';
import { Switch, BrowserRouter as Router, Route} from "react-router-dom";
import CreateJoin from './pages/createjoin';
import CreateGame from './pages/creategame';
import WaitPlayers from './pages/waitplayers';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={CreateJoin}/>
          <Route path="/creategame" exact component={CreateGame}/>
          <Route path="/waitplayers" exact component={WaitPlayers}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
