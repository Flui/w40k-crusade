interface IForce {
  id: TID;
  name: string;
  notes: string;
  faction: string;
  playerName: string;
  battleTally: number;
  battlesWon: number;
  requisitionPoints: number;
  supplyLimit: number;
  units: IUnit[];
}

interface IUnit {
  agenda1: number;
  agenda2: number;
  agenda3: number;
  active: boolean;
  battlefieldRole: string;
  battleHonours: string;
  battleScars: string;
  battlesPlayed: number;
  battlesSurvived: number;
  equipment: string;
  experiencePoints: number;
  faction: string;
  keywords: string[];
  id: TID;
  image: null | string; // file?
  name: string;
  otherUpgradesAndAbilities: string;
  rank: string; // enum
  points: number;
  power: number;
  psychhicPowers: string;
  relics: string;
  unitType: string; // enum
  warlordTraits: string;
}
