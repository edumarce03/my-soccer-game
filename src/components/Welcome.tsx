import { useState } from "react";

interface WelcomeProps {
  onStartGame: (playerName: string) => void;
}

const Welcome = ({ onStartGame }: WelcomeProps) => {
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (playerName.trim().length < 2) {
      setError("Por favor, introduce un nombre válido (mínimo 2 caracteres)");
      return;
    }

    setIsSubmitting(true);

    // Pequeña animación antes de pasar al juego
    setTimeout(() => {
      onStartGame(playerName.trim());
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] font-inter">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <span className="text-5xl">⚽</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Adivina el Jugador
          </h1>
          <p className="text-gray-500">
            Pon a prueba tus conocimientos futbolísticos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="playerName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ¿Cómo te llamas?
            </label>
            <div className="relative">
              <input
                type="text"
                id="playerName"
                autoComplete="off"
                value={playerName}
                onChange={(e) => {
                  setPlayerName(e.target.value);
                  if (error) setError("");
                }}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 text-gray-800 placeholder-gray-400"
                placeholder="Escribe tu nombre aquí"
              />
              {playerName.length > 0 && (
                <button
                  type="button"
                  onClick={() => setPlayerName("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Limpiar input"
                >
                  ✕
                </button>
              )}
            </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Iniciando..." : "Comenzar"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Adivina jugadores con el mínimo de pistas posible
          </p>
          <p className="text-gray-400 text-xs mt-1">
            ¿Serás capaz de demostrar tu conocimiento?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
