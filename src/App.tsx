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
      {/* Fondo base */}
      <div className="absolute inset-0 z-0 bg-[#0a1128]" />

      {/* Luces animadas */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Luz grande animada */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[100px]"
          style={{
            top: "30%",
            left: "60%",
            animation: "floating 1s ease-in-out infinite alternate",
          }}
        />

        {/* Luz secundaria */}
        <div
          className="absolute w-[300px] h-[300px] rounded-full bg-violet-500/50 blur-[80px]"
          style={{
            top: "10%",
            left: "20%",
            animation: "floating-reverse 2s ease-in-out infinite alternate",
          }}
        />

        {/* Luz pequeña */}
        <div
          className="absolute w-[200px] h-[200px] rounded-full bg-indigo-300/80 blur-[80px]"
          style={{
            bottom: "15%",
            left: "10%",
            animation: "pulse-light 2s ease-in-out infinite alternate",
          }}
        />

        {/* Luz adicional */}
        <div
          className="absolute w-[250px] h-[250px] rounded-full bg-blue-700/20 blur-[70px]"
          style={{
            bottom: "20%",
            right: "15%",
            animation: "floating-delayed 2s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Contenido principal */}
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
