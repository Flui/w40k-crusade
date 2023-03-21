import { SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  createFilterOptions,
} from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import Navigation from "../components/navigation";
import { useForcesStore } from "../state/forces";
import { useKeywordStore } from "../state/keyword";

const unitTypes: { value: string; label: string }[] = [
  { value: "hq", label: "HQ" },
  { value: "troop", label: "Troops" },
  { value: "elite", label: "Elite" },
  { value: "fast_attack", label: "Fast Attack" },
  { value: "heavy_support", label: "Heavy Support" },
  { value: "flyer", label: "Flyer" },
  { value: "transport", label: "Transport" },
];

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
    battlefieldRole,
    name,
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                value={name}
                onChange={onChangeField("name")}
                label={t("Unit Name")}
              />
            </Grid>
            <Grid item xs={12} md={6} mdOffset={6}>
              <TextField
                fullWidth
                value={battlefieldRole}
                onChange={onChangeField("battlefieldRole")}
                label={t("Battlefield Role")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                value={faction}
                onChange={onChangeField("faction")}
                label={t("Crusade Faction")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                    placeholder={t("Keyword")}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                value={equipment}
                label={t("Equipment")}
                onChange={onChangeField("equipment")}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                value={power}
                label={t("Power Rating")}
                onChange={onChangeNumberField("power")}
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                value={experiencePoints}
                label={t("Experience Points")}
                onChange={onChangeNumberField("experiencePoints")}
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                value={points}
                label={t("Crusade Points")}
                onChange={onChangeNumberField("points")}
                type="number"
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
