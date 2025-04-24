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
    setShownClues([0]);
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
    <div className=" flex items-center justify-center p-4 min-h-[95vh]">
      <div className="max-w-2xl w-full md:p-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/10 p-6">
          <div className="flex flex-col space-y-6">
            <div className="mx-auto w-full max-w-xs">
              <PlayerImage
                imageUrl={
                  gameStatus !== "playing" ? currentPlayer.image : undefined
                }
                playerName={currentPlayer.name}
                gameStatus={gameStatus}
                nationality={currentPlayer.nationality}
              />
            </div>

            <div className="w-full">
              <div className="flex justify-end items-center mb-4">
                <div className="relative size-12 flex items-center justify-center">
                  <svg className="w-12 h-12 absolute" viewBox="0 0 44 44">
                    <circle
                      cx="22"
                      cy="22"
                      r={radius}
                      fill="transparent"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="4"
                    />
                  </svg>

                  <svg
                    className="w-12 h-12 absolute -rotate-90"
                    viewBox="0 0 44 44"
                  >
                    <circle
                      cx="22"
                      cy="22"
                      r={radius}
                      fill="transparent"
                      stroke="#0092b8"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      className="transition-all duration-300 ease-in-out"
                    />
                  </svg>

                  <span className="text-white text-sm font-medium relative z-10">
                    {shownClues.length}
                  </span>
                </div>
              </div>

              <CluesList
                clues={currentPlayer.clues}
                shownClues={shownClues}
                attempts={attempts}
                cluesOrder={cluesOrder}
              />
            </div>

            <div className="pt-6 border-t border-white/10">
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
                      className="bg-cyan-600 text-white font-medium py-3 px-10 rounded-lg transition-all duration-200 hover:bg-cyan-700"
                    >
                      Jugar nueva partida
                    </button>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>

        {gameStatus !== "playing" && showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 p-6 max-w-xs md:max-w-md w-full relative">
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
