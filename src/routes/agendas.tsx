import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";

import Navigation from "../components/Navigation";
import { useForcesStore } from "../state/forces";

export default function Agendas() {
  const { t } = useTranslation();
  const { forceId } = useParams<{ forceId: string }>();
  const { forces, updateForceField } = useForcesStore();
  const parsedForceId = forceId ? +forceId : null;
  const force = parsedForceId ? forces[parsedForceId] : null;

  if (!force) throw Error(`Force with the id ${forceId} not found!`);

  const onChangeField =
    (fieldName: keyof IForce) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (!parsedForceId) return;
      updateForceField(parsedForceId, fieldName, value);
    };

  const onChangeNumberField =
    (fieldName: keyof IForce) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { valueAsNumber } = event.target;
      if (!parsedForceId) return;
      updateForceField(parsedForceId, fieldName, valueAsNumber);
    };

  const {
    agenda1Name,
    agenda2Name,
    agenda3Name,
    agenda4Name,
    agenda1XP,
    agenda2XP,
    agenda3XP,
    agenda4XP,
  } = force;

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
      </Container>
    </>
  );
}
