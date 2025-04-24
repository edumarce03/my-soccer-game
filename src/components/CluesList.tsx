import { motion } from "framer-motion";

interface CluesListProps {
  clues: string[];
  shownClues: number[];
  attempts: string[];
  cluesOrder: number[];
}

const CluesList = ({ clues, shownClues, attempts }: CluesListProps) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-white mb-3">Pistas:</h3>

      <div className="space-y-2 h-[60px] md:h-[150px] overflow-y-auto pr-2 custom-scrollbar">
        {shownClues.map((index, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="p-2.5 bg-white/5 backdrop-blur-sm rounded-lg border-l-4 border-cyan-600"
          >
            <p className="text-gray-200 text-xs">📌 {clues[index]}</p>
          </motion.div>
        ))}
      </div>

      {attempts.length > 0 && (
        <div className="mt-4">
          <h4 className="text-xs font-medium text-gray-200 mb-2">
            Tus intentos:
          </h4>
          <div className="flex flex-wrap gap-1.5 max-h-[60px] overflow-y-auto custom-scrollbar">
            {attempts.map((attempt, idx) => (
              <span
                key={idx}
                className="inline-block px-2 py-0.5 bg-red-900/30 text-red-100 text-xs rounded-full border border-red-500/20"
              >
                {attempt}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CluesList;
