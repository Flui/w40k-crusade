import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_REQUISITION_POINTS = 5;

export const useForcesStore = create(
  persist<{
    forces: Record<TID, IForce>;
    getTotalRequisitionPoints: (forceId?: TID | null) => number;
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
    (set, get) => ({
      forces: {},
      getTotalRequisitionPoints: (forceId?: TID | null) => {
        if (!forceId) return -1;
        const force = get().forces[forceId];
        if (!force) return -1;

        return force.battles.reduce(
          (sum, { spendRequisitionPoints }) =>
            sum -
            spendRequisitionPoints.reduce(
              (innerSum, { count }) => innerSum + count,
              0
            ),
          INITIAL_REQUISITION_POINTS
        );
      },
      addNewForce: () => {
        const newId = Date.now();

        set((state) => ({
          forces: {
            ...state.forces,
            [newId]: {
              agenda1Name: "Agenda 1",
              agenda2Name: "Agenda 2",
              agenda3Name: "Agenda 3",
              agenda4Name: "Agenda 4",
              agenda1XP: 0,
              agenda2XP: 0,
              agenda3XP: 0,
              agenda4XP: 0,
              battles: [
                { name: "Crusade Declared", spendRequisitionPoints: [] },
              ],
              crusadePoints: 0,
              id: newId,
              name: "",
              faction: "",
              notes: "",
              playerName: "",
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
                    crusadePoints: 0,
                    name: "Unit",
                    points: 0,
                    power: 0,
                    agenda1: 0,
                    agenda2: 0,
                    agenda3: 0,
                    agenda4: 0,
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
                    notes: "",
                    otherUpgradesAndAbilities: "",
                    psychhicPowers: "",
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
