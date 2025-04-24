import { useState, useEffect } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import GameBoard from "./components/GameBoard";

function App() {
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("playerName");
    if (savedName) {
      setPlayerName(savedName);
    }
  }, []);

  const handleStartGame = (name: string) => {
    setPlayerName(name);
    setGameStarted(true);

    localStorage.setItem("playerName", name);
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-inter">
      <div className="absolute inset-0 z-0 bg-black backdrop-blur-3xl" />

      <div className="relative container mx-auto p-4 z-10">
        {!gameStarted ? (
          <Welcome onStartGame={handleStartGame} />
        ) : (
          <GameBoard playerName={playerName || "Jugador"} />
        )}
      </div>
    </div>
  );
}

export default App;
