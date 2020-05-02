import React from "react";
import "./App.css";

const {
  REACT_APP_GITHUB_OAUTH_CLIENT_ID,
  REACT_APP_REDIRECT_URI,
} = process.env;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${REACT_APP_GITHUB_OAUTH_CLIENT_ID}&scope=user&redirect_uri=${REACT_APP_REDIRECT_URI}`}
        >
          Login
        </a>
      </header>
    </div>
  );
}

export default App;
