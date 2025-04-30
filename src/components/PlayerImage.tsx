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
    <div className="w-full h-full relative">
      {imageUrl ? (
        <div className="relative w-full h-full">
          <motion.img
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={imageUrl}
            alt={playerName}
            className="w-full h-full object-cover"
          />

          {nationality && (
            <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img
                src={getFlagUrl(nationality)}
                alt={`Bandera de ${nationality}`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-800/80">
          <div className="size-24 bg-indigo-900/80 rounded-full flex items-center justify-center border-2 border-indigo-500/30">
            <span className="text-5xl font-bold text-white">?</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerImage;
