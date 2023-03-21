import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useForcesStore = create(
  persist<{
    forces: Record<TID, IForce>;
    addNewForce: () => TID;
    updateForce: (force: IForce) => void;
    updateForceField: (
      forceId: TID,
      fieldName: keyof IForce,
      value: string | number
    ) => void;
    addUnitToForce: (forceId: TID) => TID;
    updateUnit: (forceId: TID, unit: IUnit) => void;
  }>(
    (set) => ({
      forces: {},
      addNewForce: () => {
        const newId = Date.now();

        set((state) => ({
          forces: {
            ...state.forces,
            [newId]: {
              id: newId,
              name: "",
              battlesWon: 0,
              battleTally: 0,
              faction: "",
              notes: "",
              playerName: "",
              requisitionPoints: 5,
              supplyLimit: 50,
              units: [],
            },
          },
        }));
        return newId;
      },
      addUnitToForce: (forceId: TID) => {
        const newId = Date.now();

        set((state) => {
          const force = state.forces[forceId];
          return {
            forces: {
              ...state.forces,
              [forceId]: {
                ...force,
                units: [
                  ...force.units,
                  {
                    id: newId,
                    active: true,
                    name: "Unit",
                    points: 0,
                    power: 0,
                    agenda1: 0,
                    agenda2: 0,
                    agenda3: 0,
                    battlefieldRole: "",
                    battleHonours: "",
                    battleScars: "",
                    battlesPlayed: 0,
                    battlesSurvived: 0,
                    equipment: "",
                    experiencePoints: 0,
                    faction: "",
                    image: null,
                    keywords: [],
                    otherUpgradesAndAbilities: "",
                    psychhicPowers: "",
                    rank: "",
                    relics: "",
                    unitType: "",
                    warlordTraits: "",
                  },
                ],
              },
            },
          };
        });
        return newId;
      },
      updateUnit: (forceId: TID, unit: IUnit) =>
        set((state) => {
          const unitIndex = state.forces[forceId].units.findIndex(
            (currUnit) => currUnit.id === unit.id
          );

          const updatedUnits = [...state.forces[forceId].units];

          updatedUnits.splice(unitIndex, 1, unit);

          return {
            forces: {
              ...state.forces,
              [forceId]: { ...state.forces[forceId], units: updatedUnits },
            },
          };
        }),
      updateForce: (force: IForce) =>
        set((state) => ({ forces: { ...state.forces, [force.id]: force } })),
      updateForceField: (
        forceId: TID,
        fieldName: keyof IForce,
        value: string | number
      ) =>
        set((state) => ({
          forces: {
            ...state.forces,
            [forceId]: { ...state.forces[forceId], [fieldName]: value },
          },
        })),
    }),
    { name: "w40k-crusade-forces" }
  )
);
