export interface SpawnPoint {
  spawnPointId?: string;
  mapId: string;
  mapName: string;
  mapImageUrl?: string;
  blueImageUrls: string[];
  redImageUrls: string[];

  //Fe use only
  isLoading?: boolean;
}