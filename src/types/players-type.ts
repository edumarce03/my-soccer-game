export interface Player {
  id: number;
  name: string;
  club: string;
  nationality: string;
  position: string;
  clues: string[];
  image?: string;
}

export type PlayersData = Player[];
