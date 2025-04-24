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

    setTimeout(() => {
      onStartGame(playerName.trim());
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[95vh] font-inter">
      <div className="w-full max-w-sm p-4 md:max-w-md md:p-8 bg-cyan-50/5 backdrop-blur-md rounded-xl shadow-2xl border border-white/10">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-5">
            <div className="relative">
              <span className="text-5xl filter drop-shadow-lg">⚽</span>
              <div className="absolute -right-1 -top-1 w-4 h-4 bg-cyan-400 rounded-full animate-pulse opacity-75"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 text-shadow-sm">
            Adivina el Jugador
          </h1>
          <p className="text-gray-200">
            Pon a prueba tus conocimientos futbolísticos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="playerName"
              className="block text-sm font-medium text-gray-200 mb-3"
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
                className="w-full px-4 py-3 bg-white/10 backdrop-blur rounded-lg border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-200 text-white placeholder-gray-400"
                placeholder="Escribe tu nombre aquí"
              />
              {playerName.length > 0 && (
                <button
                  type="button"
                  onClick={() => setPlayerName("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  aria-label="Limpiar input"
                >
                  ✕
                </button>
              )}
            </div>
            {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-cyan-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:bg-cyan-700  ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Iniciando..." : "Comenzar el Juego"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-300 text-sm">
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
