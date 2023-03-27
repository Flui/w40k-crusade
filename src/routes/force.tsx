import { generatePath, useNavigate, useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";

import Navigation from "../components/navigation";
import { useForcesStore } from "../state/forces";
import routes from ".";

export default function Force() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { forceId } = useParams<{ forceId: string }>();
  const {
    forces,
    addUnitToForce,
    getTotalRequisitionPoints,
    updateForceField,
    updateUnit,
  } = useForcesStore();
  const parsedForceId = forceId ? +forceId : null;
  const force = parsedForceId ? forces[parsedForceId] : null;

  if (!force) throw Error(`Force with the id ${forceId} not found!`);

  const createAndOpenUnit = () => {
    if (!parsedForceId) return;
    const unitId = addUnitToForce(parsedForceId);
    navigate(generatePath(routes.unit, { forceId, unitId }));
  };

  const onChangeField =
    (fieldName: keyof IForce) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (!parsedForceId) return;
      updateForceField(parsedForceId, fieldName, value);
    };

  const toggleActive =
    (unitId: TID) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      const unit = units.find(({ id }) => id === unitId);
      if (!parsedForceId || !unit) return;
      updateUnit(parsedForceId, { ...unit, active: checked });
    };

  const openUnit = (unitId: TID) => () => {
    navigate(generatePath(routes.unit, { forceId, unitId }));
  };

  const { battles, faction, name, playerName, supplyLimit, units } = force;

  const supplyUsed = units.reduce((sum, { power }) => sum + power, 0);

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
            <Grid xs={10}>
              <TextField
                fullWidth
                value={name}
                onChange={onChangeField("name")}
                label={t("Crusade Force Name")}
              />
            </Grid>
            <Grid xs={2}>
              <TextField
                value={getTotalRequisitionPoints(parsedForceId)}
                label={t("Total Requisition Points")}
                disabled
                type="number"
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
                value={playerName}
                onChange={onChangeField("playerName")}
                label={t("Player Name")}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                value={battles.length - 1}
                label={t("Battle Tally")}
                type="number"
                disabled
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                value={battles.filter(({ won }) => won).length}
                label={t("Battle Won")}
                type="number"
                disabled
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                value={supplyLimit}
                label={t("Supply Limit")}
                type="number"
                disabled
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                value={supplyUsed}
                label={t("Supply Used")}
                type="number"
                disabled
              />
            </Grid>
          </Grid>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Crusade Cards</TableCell>
                <TableCell>Power Rating</TableCell>
                <TableCell>Points Value</TableCell>
                <TableCell>Crusade Points</TableCell>
                <TableCell>Deployed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {units.map(
                ({
                  crusadePoints,
                  id,
                  name: unitName,
                  image,
                  active,
                  power,
                  points,
                }) => {
                  const labelId = `checkbox-list-secondary-label-${id}`;

                  return (
                    <TableRow key={id} selected={active}>
                      <TableCell
                        onClick={openUnit(id)}
                        sx={{ cursor: "pointer" }}
                      >
                        {image ? (
                          <Avatar alt="avatar todo" src={image} />
                        ) : (
                          <PeopleIcon />
                        )}
                      </TableCell>
                      <TableCell
                        onClick={openUnit(id)}
                        sx={{ cursor: "pointer" }}
                      >
                        {unitName}
                      </TableCell>
                      <TableCell
                        onClick={openUnit(id)}
                        sx={{ cursor: "pointer" }}
                      >
                        {power}
                      </TableCell>
                      <TableCell
                        onClick={openUnit(id)}
                        sx={{ cursor: "pointer" }}
                      >
                        {points}
                      </TableCell>
                      <TableCell
                        onClick={openUnit(id)}
                        sx={{ cursor: "pointer" }}
                      >
                        {crusadePoints}
                      </TableCell>
                      <TableCell padding="checkbox">
                        <Checkbox
                          edge="end"
                          checked={active}
                          inputProps={{ "aria-labelledby": labelId }}
                          onChange={toggleActive(id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={5}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={createAndOpenUnit}
                  >
                    {t("Add new Unit")}
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Container>
    </>
  );
}
