import { motion } from "framer-motion";

interface PlayerImageProps {
  imageUrl?: string;
  playerName: string;
  gameStatus: "playing" | "won" | "lost";
  nationality?: string;
}

const PlayerImage = ({
  imageUrl,
  playerName,
  nationality,
}: PlayerImageProps) => {
  const getFlagUrl = (country: string) => {
    const countryCodes: Record<string, string> = {
      Argentina: "ar",
      Portugal: "pt",
      Francia: "fr",
      Noruega: "no",
      Inglaterra: "gb-eng",
      Brasil: "br",
      Bélgica: "be",
      España: "es",
      Egipto: "eg",
      "Países Bajos": "nl",
      Croacia: "hr",
      Polonia: "pl",
      Alemania: "de",
      Italia: "it",
    };

    const countryCode = countryCodes[country] || "";
    if (countryCode) {
      return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
    }
    return "";
  };

  return (
    <div className="aspect-square w-full max-w-[140px] md:max-w-[200px] mx-auto rounded-xl overflow-hidden shadow-lg bg-white/5 border border-white/10 relative">
      {imageUrl ? (
        <div className="relative w-full h-full">
          <motion.img
            initial={{ filter: "blur(10px)", opacity: 0.8 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 0.7 }}
            src={imageUrl}
            alt={playerName}
            className="w-full h-full object-cover"
          />

          {nationality && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="absolute bottom-2 right-2 w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg"
            >
              <img
                src={getFlagUrl(nationality)}
                alt={`Bandera de ${nationality}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
          <div className="size-20 md:size-40 bg-white/10 rounded-full flex items-center justify-center mb-3">
            <svg
              className="w-12 h-12 text-white/30"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerImage;
