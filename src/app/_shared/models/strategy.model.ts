import { Map } from "./map.model";

export interface Strategy {
  strategyId?: string;
  title: string;
  description?: string;
  mapId?: string;
  mapName?: string;
  thumbnailUrl?: string;
  vodUrl?: string;

  // Fe use only
  isLoading?: boolean;
}

export interface MapStrategies extends Map {
  strategies?: Strategy[];
}

