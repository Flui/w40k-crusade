import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { generatePath, Link as RouterLink, useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

import routes from "../routes";
import { useForcesStore } from "../state/forces";

const drawerWidth = 240;

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { forceId, unitId } = useParams();
  const { forces } = useForcesStore();
  const { t } = useTranslation();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navItems = useMemo(() => {
    const breadcrumbs = [[t("Crusade Forces"), generatePath(routes.root)]];
    const force = forceId ? forces[+forceId] : null;
    if (force)
      breadcrumbs.push([force.name, generatePath(routes.force, { forceId })]);
    const unit =
      force && unitId ? force.units.find(({ id }) => +unitId === id) : null;
    if (unit)
      breadcrumbs.push([
        unit.name,
        generatePath(routes.unit, { forceId, unitId }),
      ]);

    return breadcrumbs;
  }, [forces, forceId, t, unitId]);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        W40k-Crusade
      </Typography>
      <Divider />
      <List>
        {navItems.map(([name, link]) => (
          <ListItem key={name} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={link}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Breadcrumbs aria-label="breadcrumb">
              {navItems.map(([name, link]) => (
                <Link
                  component={RouterLink}
                  color="inherit"
                  key={name}
                  to={link}
                >
                  {name}
                </Link>
              ))}
            </Breadcrumbs>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={window.document.body}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
