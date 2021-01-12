import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./tailwind.output.css";
import { Voter, Vote, Account } from "./pages";
import { NavBar } from "./components";
import { useLocalStorage } from "./hooks/useStorage";

function App() {
  const [account, setAccount] = useLocalStorage("account");

  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/voter">
            <Voter storedAccount={account} />
          </Route>
          <Route path="/vote">
            <Vote storedAccount={account} />
          </Route>
          <Route path="/">
            <Account account={account} setAccount={setAccount} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
