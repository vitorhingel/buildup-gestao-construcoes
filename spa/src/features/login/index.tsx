import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import validator from "validator";

import { checkFieldErrors, FieldErrors } from "../../utils/checkFieldErrors";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { selectUser, UserBase } from "../../user/userSlice";

import { Link, useNavigate } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";

import EngineeringIcon from "@mui/icons-material/Engineering";
import { useTheme } from "@mui/material/styles";
import { login } from "../../api/usuarios/login";
import jwtDecode from "jwt-decode";
import { login as reduxLogin } from "../../user/userSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors[]>([]);
  const [requestError, setRequestError] = useState("");
  const user = useAppSelector(selectUser);

  const theme = useTheme();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFieldErrors([]);
    setRequestError("");

    let fieldErrors: FieldErrors[] = [];

    if (validator.isEmpty(email, { ignore_whitespace: true }))
      fieldErrors.push({ field: "email", message: "O email não pode estar vazio" });
    if (validator.isEmpty(password, { ignore_whitespace: true }))
      fieldErrors.push({ field: "password", message: "A senha não pode estar vazia" });

    if (fieldErrors.length !== 0) return setFieldErrors(fieldErrors);

    setLoading(true);

    try {
      const loginReq = await login(email, password);

      const token = loginReq.data.access_token;

      const decodedJwt = jwtDecode(token) as UserBase;

      localStorage.setItem(`${process.env.REACT_APP_TOKEN_NAME}`, token);

      dispatch(reduxLogin({ ...decodedJwt }));
    } catch (e: any) {
      if (e.isAxiosError) {
        window.alert(e.response.data.message || "Um erro desconhecido ocorreu.");
      }
    }

    setLoading(false);
  };

  return (
    <Box height="100vh" width="100vw" bgcolor={theme.palette.primary.main} zIndex={4} position="fixed">
      <Box>
        <Container component="main" maxWidth="xs" sx={{ pt: 8, zIndex: 4 }}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "white",
              p: 4,
              zIndex: 2,
            }}
          >
            <Typography component="h1" variant="h3" color={theme.palette.secondary.main}>
              <strong>BuildUp!</strong>
            </Typography>
            <Typography component="h1" variant="subtitle2">
              Gerenciamento de Construções
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email "
                name="email"
                autoComplete="email"
                autoFocus
                error={checkFieldErrors(fieldErrors, "email") !== ""}
                helperText={checkFieldErrors(fieldErrors, "email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                error={checkFieldErrors(fieldErrors, "password") !== ""}
                helperText={checkFieldErrors(fieldErrors, "password")}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <Button type="submit" variant="contained" color="secondary" sx={{ mt: 3, mb: 2, width: "320px" }} size="large">
                  Login
                </Button>
                <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
                  Não possui uma conta?{" "}
                  <a href="mailto:vitorhingel@gmail.com" style={{ marginLeft: "5px" }}>
                    Entre em contato
                  </a>
                </Box>
              </Box>
              <EngineeringIcon
                sx={{
                  fontSize: 700,
                  zIndex: "-1",
                  position: "fixed",
                  bottom: "-70px",
                  right: "50px",
                  color: theme.palette.primary.darker,
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
