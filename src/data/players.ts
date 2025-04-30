import { PlayersData } from "../types/players-type";

const players: PlayersData = [
  {
    id: 1,
    name: "Lionel Messi",
    club: "Inter Miami",
    nationality: "Argentina",
    position: "Delantero",
    clues: [
      "Juega en la selección de Argentina",
      "Ha ganado 8 Balones de Oro",
      "Jugó la mayor parte de su carrera en el FC Barcelona",
      "Ganó la Copa del Mundo en 2022",
      "Su apodo es 'La Pulga'",
    ],
    image:
      "https://img.a.transfermarkt.technology/portrait/big/28003-1694590254.jpg",
  },
  {
    id: 2,
    name: "Cristiano Ronaldo",
    club: "Al-Nassr FC",
    nationality: "Portugal",
    position: "Delantero",
    clues: [
      "Juega en la selección de Portugal",
      "Ha ganado 5 Balones de Oro",
      "Jugó en el Manchester United, Real Madrid y Juventus",
      "Es conocido por su celebración 'Siuuu'",
      "Tiene el récord de más goles en la historia de la Champions League",
    ],
    image:
      "https://img.a.transfermarkt.technology/portrait/big/8198-1694609670.jpg",
  },
  {
    id: 3,
    name: "Kylian Mbappé",
    club: "Real Madrid",
    nationality: "Francia",
    position: "Delantero",
    clues: [
      "Juega en la selección de Francia",
      "Fue campeón del mundo en 2018",
      "Anteriormente jugó en el Paris Saint-Germain",
      "Es conocido por su increíble velocidad",
      "Ganó la Bota de Oro en el Mundial 2022",
    ],
    image:
      "https://img.a.transfermarkt.technology/portrait/big/342229-1682683695.jpg",
  },
  {
    id: 4,
    name: "Erling Haaland",
    club: "Manchester City",
    nationality: "Noruega",
    position: "Delantero",
    clues: [
      "Juega en la selección de Noruega",
      "Es conocido por su gran capacidad goleadora",
      "Jugó anteriormente en el Borussia Dortmund",
      "Su padre también fue futbolista profesional",
      "Ganó la Champions League en 2023",
    ],
    image:
      "https://img.a.transfermarkt.technology/portrait/header/418560-1709108116.png",
  },
  {
    id: 5,
    name: "Jude Bellingham",
    club: "Real Madrid",
    nationality: "Inglaterra",
    position: "Centrocampista",
    clues: [
      "Juega en la selección de Inglaterra",
      "Debutó profesionalmente a los 16 años",
      "Jugó en el Borussia Dortmund",
      "Usa el dorsal número 5",
      "Es conocido por su madurez y liderazgo a pesar de su juventud",
    ],
    image:
      "https://img.a.transfermarkt.technology/portrait/header/581678-1693987944.jpg",
  },
  {
    id: 6,
    name: "Vinícius Júnior",
    club: "Real Madrid",
    nationality: "Brasil",
    position: "Extremo",
    clues: [
      "Juega en la selección de Brasil",
      "Es conocido por su habilidad en el regate",
      "Marcó el gol de la victoria en la final de la Champions League 2022",
      "Llegó a Europa muy joven desde Flamengo",
      "Se le identifica con sus bailes para celebrar los goles",
    ],
    image:
      "https://img.a.transfermarkt.technology/portrait/header/371998-1664869583.jpg",
  },
  {
    id: 7,
    name: "Kevin De Bruyne",
    club: "Manchester City",
    nationality: "Bélgica",
    position: "Centrocampista",
    clues: [
      "Juega en la selección de Bélgica",
      "Es conocido por sus asistencias precisas",
      "Jugó anteriormente en el Chelsea y Wolfsburgo",
      "Tiene el pelo pelirrojo",
      "Ha ganado múltiples Premier Leagues con su club actual",
    ],
    image:
      "https://img.a.transfermarkt.technology/portrait/header/88755-1713391485.jpg",
  },
  {
    id: 8,
    name: "Rodri",
    club: "Manchester City",
    nationality: "España",
    position: "Centrocampista",
    clues: [
      "Juega en la selección de España",
      "Ganó la Eurocopa en 2024",
      "Es considerado uno de los mejores pivotes defensivos del mundo",
      "Ganó el Balón de Oro de la Eurocopa 2024",
      "Anteriormente jugó en el Atlético de Madrid",
    ],
    image:
      "https://img.a.transfermarkt.technology/portrait/big/357565-1682587890.jpg",
  },
  {
    id: 9,
    name: "Lamine Yamal",
    club: "FC Barcelona",
    nationality: "España",
    position: "Extremo",
    clues: [
      "Juega en la selección de España",
      "Es uno de los jugadores más jóvenes en debutar en La Liga",
      "Ganó la Eurocopa en 2024",
      "Es considerado una de las mayores promesas del fútbol mundial",
      "Juega habitualmente por la banda derecha",
    ],
    image:
      "https://img.a.transfermarkt.technology/portrait/header/937958-1720606123.jpg",
  },
  {
    id: 10,
    name: "Harry Kane",
    club: "Bayern Munich",
    nationality: "Inglaterra",
    position: "Delantero",
    clues: [
      "Juega en la selección de Inglaterra",
      "Fue el máximo goleador histórico del Tottenham Hotspur",
      "Es el capitán de su selección nacional",
      "Es conocido por su capacidad goleadora y visión de juego",
      "Se trasladó a la Bundesliga después de pasar toda su carrera en Inglaterra",
    ],
    image:
      "https://img.a.transfermarkt.technology/portrait/header/132098-1700211169.jpg",
  },
  {
    id: 11,
    name: "Mohamed Salah",
    club: "Liverpool",
    nationality: "Egipto",
    position: "Extremo",
    clues: [
      "Juega en la selección de Egipto",
      "Es conocido como 'El Faraón'",
      "Ha ganado la Premier League y la Champions League",
      "Anteriormente jugó en la Roma y Chelsea",
      "Es uno de los jugadores árabes más exitosos de la historia",
    ],
    image:
      "https://img.a.transfermarkt.technology/portrait/header/148455-1727337594.jpg",
  },
  {
    id: 12,
    name: "Virgil van Dijk",
    club: "Liverpool",
    nationality: "Países Bajos",
    position: "Defensa central",
    clues: [
      "Juega en la selección de Países Bajos",
      "Es considerado uno de los mejores defensas centrales del mundo",
      "Llegó a Liverpool procedente del Southampton",
      "Es el capitán de su selección nacional",
      "Quedó segundo en el Balón de Oro 2019",
    ],
    image:
      "https://img.a.transfermarkt.technology/portrait/header/139208-1702049837.jpg",
  },
  {
    id: 13,
    name: "Luka Modrić",
    club: "Real Madrid",
    nationality: "Croacia",
    position: "Centrocampista",
    clues: [
      "Juega en la selección de Croacia",
      "Ganó el Balón de Oro en 2018",
      "Llevó a su selección a la final del Mundial 2018",
      "Ha ganado múltiples Champions League",
      "Jugó anteriormente en el Tottenham Hotspur",
    ],
    image:
      "https://img.a.transfermarkt.technology/portrait/header/27992-1687776160.jpg",
  },
  {
    id: 14,
    name: "Robert Lewandowski",
    club: "FC Barcelona",
    nationality: "Polonia",
    position: "Delantero",
    clues: [
      "Juega en la selección de Polonia",
      "Es conocido por su capacidad goleadora",
      "Jugó anteriormente en el Bayern Munich",
      "Ganó el Premio The Best FIFA en 2020 y 2021",
      "Marcó 5 goles en 9 minutos en un partido de la Bundesliga",
    ],
    image:
      "https://img.a.transfermarkt.technology/portrait/big/38253-1701118759.jpg",
  },
  {
    id: 15,
    name: "Nico Williams",
    club: "Athletic Club",
    nationality: "España",
    position: "Extremo",
    clues: [
      "Juega en la selección de España",
      "Ganó la Eurocopa en 2024",
      "Su hermano también es futbolista profesional",
      "Juega en un club que solo ficha jugadores vascos",
      "Es conocido por su velocidad y habilidad en el regate por la banda izquierda",
    ],
    image:
      "https://img.a.transfermarkt.technology/portrait/header/709187-1709676169.png",
  },
];

export default players;
