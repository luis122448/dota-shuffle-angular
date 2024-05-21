export interface DotaPlayerModel {
  id: number;
  label?: string;
  name: string;
  mmr: number;
  team: number;
  medal: string;
}

export interface BasicPlayerModel {
  id: number;
  mmr: number;
}

export interface TotalCombination {
  total: number;
  diffMrr: number[];
  combination: BasicPlayerModel[][];
}

export interface BestShuffleResult {
  best1: BasicPlayerModel[];
  best2: BasicPlayerModel[];
  best3: BasicPlayerModel[];
}
