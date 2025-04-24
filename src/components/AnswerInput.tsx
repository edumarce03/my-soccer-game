import { useState, useEffect, useRef } from "react";

interface AnswerInputProps {
  onSubmitAnswer: (answer: string) => boolean;
  onRequestClue: () => void;
  cluesAvailable: boolean;
  attempts: string[];
}

const AnswerInput = ({
  onSubmitAnswer,
  onRequestClue,
  cluesAvailable,
  attempts,
}: AnswerInputProps) => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!answer.trim()) {
      setError("Por favor, introduce un nombre");
      return;
    }

    if (attempts.some((a) => a.toLowerCase() === answer.toLowerCase())) {
      setError("Ya has intentado con este nombre");
      return;
    }

    setError("");
    onSubmitAnswer(answer.trim());
    setAnswer("");
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-white mb-4 text-center">
        ¿Quién es este jugador?
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="answer" className="sr-only">
            Tu respuesta
          </label>
          <input
            ref={inputRef}
            type="text"
            id="answer"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              if (error) setError("");
            }}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur rounded-lg border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-200 text-white placeholder-gray-400"
            placeholder="Escribe el nombre del jugador..."
            autoComplete="off"
          />
          {error && <p className="mt-1 text-sm text-red-300">{error}</p>}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="flex-1 bg-cyan-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-300/50 focus:ring-opacity-50"
          >
            Comprobar
          </button>

          <button
            type="button"
            onClick={onRequestClue}
            disabled={!cluesAvailable}
            className={`flex-1 border font-medium py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none
              ${
                cluesAvailable
                  ? "border-white/20 text-white hover:bg-white/5"
                  : "border-white/10 text-white/30 cursor-not-allowed"
              }`}
          >
            {cluesAvailable ? "Otra pista" : "No hay más pistas"}
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-300 text-sm">
          Intenta adivinar con el menor número de pistas posible.
        </p>
      </div>
    </div>
  );
};

export default AnswerInput;
