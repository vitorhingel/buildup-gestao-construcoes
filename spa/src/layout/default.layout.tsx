import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../user/userSlice";
import { DefaultAppBar } from "./default.appbar";
import layoutStyles from "./layout.module.css";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function DashboardContent() {
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open} sx={{ backgroundColor: "secondary.main" }}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Autocomplete
            id="search-projects"
            freeSolo
            disabled
            size="small"
            style={{ backgroundColor: "white", borderRadius: 0 }}
            options={[].map((option: any) => option.title)}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                style={{ paddingLeft: 0, borderRadius: "0px" }}
                placeholder="Pesquisar..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <IconButton color="inherit" sx={{ mx: 2 }} disabled>
            {/* <Badge badgeContent={4} color="primary"> */}
            <NotificationsIcon />
            {/* </Badge> */}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <DefaultAppBar />
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />

        <List component="nav">
          <React.Fragment>
            <NavLink
              to="/"
              style={({ isActive }) => {
                return isActive ? { color: "inherit", backgroundColor: "rgba(32, 76, 129, 0.08)" } : { color: "inherit" };
              }}
            >
              <ListItemButton sx={{ backgroundColor: "inherit" }}>
                <ListItemIcon sx={{ pl: 0.5 }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </NavLink>
            <NavLink
              to="/projetos"
              style={({ isActive }) => (isActive ? { color: "inherit", backgroundColor: "rgba(32, 76, 129, 0.08)" } : { color: "inherit" })}
            >
              <ListItemButton sx={{ backgroundColor: "inherit" }}>
                <ListItemIcon sx={{ pl: 0.5 }}>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Projetos" />
              </ListItemButton>
            </NavLink>
            <NavLink
              to="/perfil"
              style={({ isActive }) => (isActive ? { color: "inherit", backgroundColor: "rgba(32, 76, 129, 0.08)" } : { color: "inherit" })}
            >
              <ListItemButton sx={{ backgroundColor: "inherit" }}>
                <ListItemIcon sx={{ pl: 0.5 }}>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Perfil" />
              </ListItemButton>
            </NavLink>

            <ListItemButton
              onClick={() => {
                localStorage.removeItem(`${process.env.REACT_APP_TOKEN_NAME}`);
                dispatch(logout());
              }}
            >
              <ListItemIcon sx={{ pl: 0.5 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </React.Fragment>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          bgcolor: "primary.main",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2, bgcolor: "primary.main" }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export const DefaultLayout = () => {
  return <DashboardContent />;
};
