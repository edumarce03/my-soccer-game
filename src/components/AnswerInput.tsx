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
      <form onSubmit={handleSubmit} className="space-y-2">
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
            className="w-full px-3 py-2 bg-white/10 backdrop-blur rounded-md border border-white/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 focus:outline-none transition-all duration-200 text-white placeholder-gray-400 text-xs md:text-sm"
            placeholder="Escribe el nombre del jugador..."
            autoComplete="off"
          />
          {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white font-medium py-2 px-3 rounded-[4px] transition-all duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300/50 focus:ring-opacity-50 text-xs md:text-sm"
          >
            Comprobar
          </button>

          <button
            type="button"
            onClick={onRequestClue}
            disabled={!cluesAvailable}
            className={`flex-1 border font-medium py-2 px-3 rounded-[4px] transition-all duration-200 focus:outline-none text-xs md:text-sm
              ${
                cluesAvailable
                  ? "border-white/20 text-white hover:bg-white/5"
                  : "border-white/10 text-white/30 cursor-not-allowed"
              }`}
          >
            {cluesAvailable ? "Otra pista" : "No más pistas"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnswerInput;
