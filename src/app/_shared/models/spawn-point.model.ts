export interface SpawnPoint {
  spawnPointId?: string;
  mapName: string;
  mapImageUrl?: string;
  blueImageUrls: string[];
  redImageUrls: string[];

  //Fe use only
  isLoading?: boolean;
}