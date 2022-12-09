import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

function App(props){
  return <Router>
      <Switch>
        <Route exact path="/"> {"/home"}
          <Home /> {/*ici on donne la page Ã  afficher en fonction de cette URL*/}
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
  </Router>
}

export default App;
