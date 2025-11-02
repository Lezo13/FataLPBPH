export interface Player {
  playerId?: string;
  playerName: string;
  imageUrl?: string;
  isActive: boolean;
  isLineup: boolean;
  description?: string;

  // Fe use only
  isLoading?: boolean;
}