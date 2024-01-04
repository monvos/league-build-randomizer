export interface ChampionData {
  id: string;
  name: string;
  title: string;
  blurb: string;
}

export interface RunesData {
  id: number;
  name: string;
  icon: string;
}

export interface ItemsData {
  name: string;
  image: {
    full: string;
  }
}

export interface SummonersData {
  name: string;
  image: {
    full: string;
  }
}

export interface AllData {
  [key: string]: any;
}