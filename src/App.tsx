import { useState } from "react";
import "./App.css";
import Welcome from "./components/Welcome";

function App() {
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = (name: string) => {
    setPlayerName(name);
    setGameStarted(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-inter">
      {/* Fondo con gradiente y efecto de luz */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100 z-0" />

      {/* Efectos de luz */}
      <div className="absolute top-[-50%] left-[-20%] w-[70%] h-[70%] bg-blue-400 opacity-[0.15] rounded-full blur-[120px] z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-indigo-400 opacity-[0.1] rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-[-30%] left-[20%] w-[50%] h-[50%] bg-cyan-400 opacity-[0.15] rounded-full blur-[100px] z-0" />

      {/* Contenido principal */}
      <div className="relative container mx-auto p-4 z-10">
        {!gameStarted ? (
          <Welcome onStartGame={handleStartGame} />
        ) : (
          <div className="p-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ¡Hola, <span className="text-blue-600">{playerName}</span>!
            </h2>
            <p className="text-gray-600">Pronto comenzará el juego...</p>
            {/* Aquí irá el componente principal del juego cuando lo creemos */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
