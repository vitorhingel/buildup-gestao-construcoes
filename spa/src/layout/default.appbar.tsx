import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { useNavigate } from "react-router-dom";

import Engineering from "@mui/icons-material/Engineering";
import { useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, selectUser } from "../user/userSlice";

export const DefaultAppBar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    dispatch(logout());
    navigate("/login");
  };
  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (action = "") => {
    switch (action) {
      case "Logout":
        handleLogout();
        break;
      default:
        break;
    }

    setAnchorElUser(null);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent={"center"} flexDirection="column">
        <Box display="flex" flexDirection="row" alignItems={"center"}>
          <Engineering sx={{ fontSize: 32, mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5" sx={{ color: theme.palette.secondary.main }}>
            <strong>Build Up!</strong>
          </Typography>
        </Box>
        <Typography variant="subtitle2" fontSize="12px" color={grey[600]}>
          Gerenciamento de Construções
        </Typography>
      </Box>
    </Box>
  );
};
