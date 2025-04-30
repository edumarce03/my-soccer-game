import { useState, useCallback, useEffect } from "react";
import players from "../data/players";
import CluesList from "./CluesList";
import PlayerImage from "./PlayerImage";
import AnswerInput from "./AnswerInput";
import GameResult from "./GameResult";
import { motion } from "framer-motion";

const MAX_CLUES = 5;

interface GameBoardProps {
  playerName: string;
}

const GameBoard = ({ playerName }: GameBoardProps) => {
  const [currentPlayer, setCurrentPlayer] = useState(getRandomPlayer());
  const [shownClues, setShownClues] = useState<number[]>([]);
  const [cluesOrder, setCluesOrder] = useState<number[]>([]);
  const [attempts, setAttempts] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [showModal, setShowModal] = useState(true);

  function getRandomPlayer() {
    return players[Math.floor(Math.random() * players.length)];
  }

  const shuffleArray = (array: number[]): number[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const randomOrder = shuffleArray([0, 1, 2, 3, 4]);
    setCluesOrder(randomOrder);
    setShownClues([randomOrder[0]]);
  }, [currentPlayer]);

  useEffect(() => {
    if (gameStatus !== "playing") {
      setShowModal(true);
    }
  }, [gameStatus]);

  const checkAnswer = useCallback(
    (answer: string) => {
      setAttempts((prev) => [...prev, answer]);

      const normalizedAnswer = answer
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const normalizedPlayerName = currentPlayer.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      const playerNameParts = normalizedPlayerName.split(" ");

      if (normalizedAnswer === normalizedPlayerName) {
        setGameStatus("won");
        return true;
      }

      for (const part of playerNameParts) {
        if (part.length >= 4 && normalizedAnswer === part) {
          setGameStatus("won");
          return true;
        }
      }

      if (
        normalizedAnswer.length >= 5 &&
        playerNameParts.some(
          (part) =>
            part === normalizedAnswer ||
            normalizedPlayerName.includes(normalizedAnswer)
        )
      ) {
        setGameStatus("won");
        return true;
      }

      if (shownClues.length >= MAX_CLUES) {
        setGameStatus("lost");
        return false;
      }

      showNextClue();
      return false;
    },
    [currentPlayer, shownClues]
  );

  const showNextClue = () => {
    if (shownClues.length < MAX_CLUES) {
      setShownClues((prev) => [...prev, cluesOrder[prev.length]]);
    }
  };

  const resetGame = () => {
    setCurrentPlayer(getRandomPlayer());
    setAttempts([]);
    setGameStatus("playing");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const progressPercentage = (shownClues.length / MAX_CLUES) * 100;
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center p-4 min-h-[95vh] ">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-md bg-transparent  rounded-2xl shadow-2xl border border-indigo-500/20 p-6 md:p-8 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
            {/* Columna imagen */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
              <div className="relative w-full aspect-square max-w-md overflow-hidden rounded-xl border-2 border-indigo-500/30 shadow-lg shadow-indigo-500/10">
                <PlayerImage
                  imageUrl={
                    gameStatus !== "playing" ? currentPlayer.image : undefined
                  }
                  playerName={currentPlayer.name}
                  gameStatus={gameStatus}
                  nationality={currentPlayer.nationality}
                />

                {gameStatus === "playing" && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex items-center justify-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center bg-indigo-600/20 backdrop-blur-md border border-indigo-400/30 shadow-lg text-2xl md:text-4xl font-bold text-white">
                      ?
                    </div>
                  </div>
                )}
              </div>

              {gameStatus !== "playing" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 text-center"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {currentPlayer.name}
                  </h2>
                  <div className="text-indigo-400 font-medium flex items-center justify-center">
                    <span className="inline-block w-5 h-5 mr-2">
                      {/* Flag placeholder - could be replaced with actual flag */}
                      🏆
                    </span>
                    {currentPlayer.nationality}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Columna pistas */}
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white/90">
                  {gameStatus === "playing"
                    ? "¿Quién es?"
                    : gameStatus === "won"
                    ? "¡Adivinaste!"
                    : "Se acabó el tiempo"}
                </h2>

                {/* Progress indicator */}
                <div className="relative size-14 flex items-center justify-center group">
                  <svg className="w-14 h-14 absolute" viewBox="0 0 44 44">
                    <circle
                      cx="22"
                      cy="22"
                      r={radius}
                      fill="transparent"
                      stroke="#7770e4"
                      strokeWidth="4"
                    />
                  </svg>

                  <svg
                    className="w-14 h-14 absolute -rotate-90"
                    viewBox="0 0 44 44"
                  >
                    <circle
                      cx="22"
                      cy="22"
                      r={radius}
                      fill="transparent"
                      stroke={
                        shownClues.length >= MAX_CLUES ? "#e3e7fc" : "#6755d6"
                      }
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      className="transition-all duration-300 ease-in-out"
                    />
                  </svg>

                  <span className="text-white text-sm font-bold relative z-10">
                    {shownClues.length}/{MAX_CLUES}
                  </span>

                  <span className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-indigo-400 whitespace-nowrap">
                    Pistas usadas
                  </span>
                </div>
              </div>

              {/* Clues section with improved styling */}
              <div className="bg-indigo-500/10 backdrop-blur-lg rounded-xl p-4 border border-indigo-400/10 mb-6 flex-grow overflow-auto max-h-[50vh] md:max-h-[40vh]">
                <CluesList
                  clues={currentPlayer.clues}
                  shownClues={shownClues}
                  attempts={gameStatus === "playing" ? attempts : []}
                  cluesOrder={cluesOrder}
                />
              </div>

              {/* Input section */}
              <div className="mt-auto pt-4 border-t border-indigo-500/20">
                {gameStatus === "playing" ? (
                  <AnswerInput
                    onSubmitAnswer={checkAnswer}
                    onRequestClue={showNextClue}
                    cluesAvailable={shownClues.length < MAX_CLUES}
                    attempts={attempts}
                  />
                ) : (
                  !showModal && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-center"
                    >
                      <button
                        onClick={resetGame}
                        className="text-sm md:text-base bg-gradient-to-r from-indigo-700 to-violet-800 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-1 focus:ring-2 focus:ring-indigo-400/50 focus:outline-none"
                      >
                        Jugar nueva partida
                      </button>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Result modal with animation and improved design */}
        {gameStatus !== "playing" && showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-gradient-to-br from-gray-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-indigo-500/30 p-8 max-w-md w-full relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1">
                <div
                  className={`h-full ${
                    gameStatus === "won"
                      ? "bg-gradient-to-r from-indigo-500 to-blue-500"
                      : "bg-gradient-to-r from-red-500 to-orange-500"
                  }`}
                ></div>
              </div>

              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
                aria-label="Cerrar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <GameResult
                status={gameStatus}
                playerName={playerName}
                correctAnswer={currentPlayer.name}
                attemptsCount={attempts.length}
                cluesUsed={shownClues.length}
                onPlayAgain={resetGame}
                onClose={closeModal}
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
