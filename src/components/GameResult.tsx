import { motion } from "framer-motion";

interface GameResultProps {
  status: "won" | "lost";
  playerName: string;
  correctAnswer: string;
  attemptsCount: number;
  cluesUsed: number;
  onPlayAgain: () => void;
  onClose: () => void;
}

const GameResult = ({
  status,
  playerName,
  correctAnswer,
  attemptsCount,
  cluesUsed,
  onPlayAgain,
  onClose,
}: GameResultProps) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="text-center mt-2"
    >
      {status === "won" ? (
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-900/30 text-green-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-green-500/30">
            🎉
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            ¡Felicidades, {playerName}!
          </h3>
          <p className="text-gray-300">
            Has adivinado correctamente al jugador:{" "}
            <strong className="text-green-400">{correctAnswer}</strong>
          </p>
        </div>
      ) : (
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-900/30 text-red-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-red-500/30">
            😢
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            ¡Lo siento, {playerName}!
          </h3>
          <p className="text-gray-300">
            El jugador correcto era:{" "}
            <strong className="text-red-400">{correctAnswer}</strong>
          </p>
        </div>
      )}

      <div className="bg-white/5 p-5 rounded-lg mb-6 border border-white/10">
        <h4 className="text-sm font-medium text-gray-300 mb-3">
          Tu desempeño:
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <p className="text-gray-400 text-xs mb-1">Intentos</p>
            <p className="text-xl font-bold text-white">{attemptsCount}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <p className="text-gray-400 text-xs mb-1">Pistas usadas</p>
            <p className="text-xl font-bold text-white">{cluesUsed}/5</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onPlayAgain}
          className="flex-1 bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:bg-indigo-700 "
        >
          Jugar de nuevo
        </button>

        <button
          onClick={onClose}
          className="flex-1 border border-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/10"
        >
          Cerrar
        </button>
      </div>
    </motion.div>
  );
};

export default GameResult;
