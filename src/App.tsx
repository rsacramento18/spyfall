import React  from 'react';
import { Switch, BrowserRouter as Router, Redirect, Route, Link} from "react-router-dom";
import CreateGame from './pages/creategame';

function App() {

  return (
    <div className="App">
      <Router>
        <Link to="/create">Create Game</Link>
        <Switch>
          <Redirect to="/login" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
