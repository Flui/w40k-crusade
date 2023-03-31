import { useMemo } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";

import Navigation from "../components/Navigation";
import { useForcesStore } from "../state/forces";
import routes from ".";

export default function Forces() {
  const { t } = useTranslation();
  const { forces, addNewForce } = useForcesStore();
  const navigate = useNavigate();
  const forceList = useMemo(() => Object.values(forces), [forces]);

  const createAndOpenNewForce = () => {
    const forceId = addNewForce();
    navigate(generatePath(routes.force, { forceId }));
  };

  const openForce = (forceId: TID) => () => {
    navigate(generatePath(routes.force, { forceId }));
  };

  return (
    <>
      <Navigation />
      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Crusade Force</TableCell>
              <TableCell>Faction</TableCell>
              <TableCell>Supply Limit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forceList.map(({ faction, id, name, supplyLimit }) => {
              return (
                <TableRow key={id} hover sx={{ cursor: "pointer" }}>
                  <TableCell onClick={openForce(id)}>{name}</TableCell>
                  <TableCell onClick={openForce(id)}>{faction}</TableCell>
                  <TableCell onClick={openForce(id)}>{supplyLimit}</TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell colSpan={3}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={createAndOpenNewForce}
                >
                  {t("Create new Force")}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    </>
  );
}
