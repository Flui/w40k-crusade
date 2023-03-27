interface IForce {
  agenda1Name: string;
  agenda2Name: string;
  agenda3Name: string;
  agenda4Name: string;
  agenda1XP: number;
  agenda2XP: number;
  agenda3XP: number;
  agenda4XP: number;
  id: TID;
  name: string;
  notes: string;
  faction: string;
  playerName: string;
  supplyLimit: number;
  units: IUnit[];
  battles: IBattle[];
}

interface IUnit {
  agenda1: number;
  agenda2: number;
  agenda3: number;
  agenda4: number;
  active: boolean;
  battlefieldRole: string;
  battleHonours: string;
  battleScars: string;
  battlesPlayed: number;
  battlesSurvived: number;
  crusadePoints: number;
  equipment: string;
  experiencePoints: number;
  faction: string;
  keywords: string[];
  id: TID;
  image: null | string; // file?
  name: string;
  notes: string;
  otherUpgradesAndAbilities: string;
  points: number;
  power: number;
  psychhicPowers: string;
  relics: string;
  unitType: string; // enum
  warlordTraits: string;
}

interface IBattle {
  name: string;
  description?: string;
  enemiesDestroyedWithPsychicPower?: number;
  enemiesDestroyedWithRangedWeapons?: number;
  enemiesDestroyedWithMeleeWeapons?: number;
  agenda1TallyByUnit?: Record<TID, number>;
  agenda2TallyByUnit?: Record<TID, number>;
  agenda3TallyByUnit?: Record<TID, number>;
  agenda4TallyByUnit?: Record<TID, number>;
  unitMarkedForGreatness?: TID; // id of a unit
  spendRequisitionPoints: { label: string; count: number }[];
  won?: boolean;
}
