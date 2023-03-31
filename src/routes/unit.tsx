import { SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import GridBreak from "../components/GridBreak";
import Navigation from "../components/Navigation";
import { useForcesStore } from "../state/forces";
import { useKeywordStore } from "../state/keyword";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const unitTypes: { value: string; label: string }[] = [
  { value: "hq", label: "HQ" },
  { value: "troop", label: "Troops" },
  { value: "elite", label: "Elite" },
  { value: "fast_attack", label: "Fast Attack" },
  { value: "heavy_support", label: "Heavy Support" },
  { value: "flyer", label: "Flyer" },
  { value: "transport", label: "Transport" },
];

export function getRankByXP(xp: number) {
  if (xp < 6) return "Battle Ready";
  if (xp < 16) return "Blooded";
  if (xp < 31) return "Battle-hardened";
  if (xp < 51) return "Heroic";
  return "Legendary";
}

export default function Units() {
  const { t } = useTranslation();
  const { forceId, unitId } = useParams<{ forceId: string; unitId: string }>();
  const { keywordOptions, addKeywordOption } = useKeywordStore();
  const { forces, updateUnit } = useForcesStore();
  const parsedForceId = forceId ? +forceId : null;
  const force = parsedForceId ? forces[parsedForceId] : null;

  if (!force) throw Error(`Force with the id ${forceId} not found!`);
  const parsedUnitId = unitId ? +unitId : null;
  const unit = force.units.find((unit) => unit.id === parsedUnitId);
  if (!unit)
    throw Error(`Unit with the id ${unitId} not found in ${force.name}!`);

  const onChangeField =
    (fieldName: keyof IUnit) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (!parsedForceId) return;
      updateUnit(parsedForceId, { ...unit, [fieldName]: value });
    };

  const onChangeNumberField =
    (fieldName: keyof IUnit) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { valueAsNumber } = event.target;
      if (!parsedForceId) return;
      updateUnit(parsedForceId, { ...unit, [fieldName]: valueAsNumber });
    };

  const onChangeKeywords = (
    event: SyntheticEvent<Element, Event>,
    value: string[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string>
  ) => {
    if (!parsedForceId) return;
    console.log({ event, value, reason, details });
    if (reason === "createOption" && details?.option)
      addKeywordOption(details?.option);
    updateUnit(parsedForceId, { ...unit, keywords: value });
  };

  const {
    battleHonours,
    battleScars,
    battlefieldRole,
    crusadePoints,
    name,
    notes,
    faction,
    keywords,
    unitType,
    equipment,
    psychhicPowers,
    warlordTraits,
    relics,
    power,
    experiencePoints,
    points,
  } = unit;

  return (
    <>
      <Navigation />
      <Container>
        <Box
          component="form"
          sx={{ flexGrow: 1, marginTop: 2 }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid xs={12}>
              <TextField
                fullWidth
                value={name}
                onChange={onChangeField("name")}
                label={t("Unit Name")}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                value={faction}
                onChange={onChangeField("faction")}
                label={t("Crusade Faction")}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                value={battlefieldRole}
                onChange={onChangeField("battlefieldRole")}
                label={t("Battlefield Role")}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Autocomplete
                fullWidth
                multiple
                freeSolo
                renderTags={(value: readonly string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    // eslint-disable-next-line
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                value={keywords}
                options={keywordOptions}
                onChange={onChangeKeywords}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("Selectable Keywords")}
                    placeholder={t("Keyword") || undefined}
                  />
                )}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                id="unit-type-select"
                fullWidth
                value={unitType}
                onChange={onChangeField("unitType")}
                label={t("Unit Type")}
                select
              >
                {unitTypes.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                value={equipment}
                label={t("Equipment")}
                onChange={onChangeField("equipment")}
              />
            </Grid>
            <GridBreak />
            <Grid xs={12} md={3}>
              <TextField
                fullWidth
                value={power}
                label={t("Power Rating")}
                onChange={onChangeNumberField("power")}
                type="number"
              />
            </Grid>
            <Grid xs={12} md={3}>
              <TextField
                fullWidth
                value={points}
                label={t("Points")}
                onChange={onChangeNumberField("points")}
                type="number"
              />
            </Grid>
            <Grid xs={12} md={3}>
              <TextField
                fullWidth
                value={experiencePoints}
                label={t("Experience Points")}
                onChange={onChangeNumberField("experiencePoints")}
                type="number"
              />
            </Grid>
            <Grid xs={12} md={3}>
              <TextField
                fullWidth
                value={crusadePoints}
                label={t("Crusade Points")}
                onChange={onChangeNumberField("crusadePoints")}
                type="number"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                value={getRankByXP(experiencePoints)}
                label={t("Rank")}
                disabled
              />
            </Grid>
            <GridBreak />
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                minRows={2}
                value={battleHonours}
                label={t("Battle Honours")}
                onChange={onChangeField("battleHonours")}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                minRows={2}
                value={battleScars}
                label={t("Battle Scars")}
                onChange={onChangeField("battleScars")}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                value={notes}
                label={t("Notes")}
                onChange={onChangeField("notes")}
              />
            </Grid>
          </Grid>
        </Box>
        {/*
          <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>XP gained per tally</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    fullWidth
                    value={agenda1Name}
                    onChange={onChangeField("agenda1Name")}
                    label={t("Agenda 1 (Combat Patrols, 500 points, 3CP)")}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={agenda1XP}
                    onChange={onChangeNumberField("agenda1XP")}
                    label={t("XP")}
                    type="number"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField
                    fullWidth
                    value={agenda2Name}
                    onChange={onChangeField("agenda2Name")}
                    label={t("Agenda 2 (Incursions, 1000 points, 6CP)")}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={agenda2XP}
                    onChange={onChangeNumberField("agenda2XP")}
                    label={t("XP")}
                    type="number"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField
                    fullWidth
                    value={agenda3Name}
                    onChange={onChangeField("agenda3Name")}
                    label={t("Agenda 3 (Strike Forces, 2000 points, 12CP)")}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={agenda3XP}
                    onChange={onChangeNumberField("agenda3XP")}
                    label={t("XP")}
                    type="number"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField
                    fullWidth
                    value={agenda4Name}
                    onChange={onChangeField("agenda4Name")}
                    label={t("Agenda 4 (Onslaughts, 3000 points, 18CP)")}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={agenda4XP}
                    onChange={onChangeNumberField("agenda4XP")}
                    label={t("XP")}
                    type="number"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
                */}
      </Container>
    </>
  );
}
