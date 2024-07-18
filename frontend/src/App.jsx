import { Link } from "react-router-dom";
import "./App.scss";
import "./reset.scss";
import ConnectForm from "./components/ConnectForm";
import { useState } from "react";

function App() {
  const [isConnected, setIsConnected] = useState(sessionStorage.connected);

  return (
    <div className="home-container">
      <h1>Bienvenue</h1>
      <ConnectForm setIsConnected={setIsConnected} />
      {!isConnected && (
        <Link to="/register">
          <button className="button-sm-indigo-fullfilled">Créer un nouveau compte</button>
        </Link>
      )}
    </div>
  );
}

export default App;
