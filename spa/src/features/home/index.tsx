import { Box, Grid, Paper, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../user/userSlice";

export const Home = () => {
  const user = useAppSelector(selectUser);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <AccountCircleIcon sx={{ fontSize: 108 }} />
                <Box>
                  <Typography variant="h4">Seja bem-vindo, {user.nome}.</Typography>
                  <Typography variant="subtitle2">
                    Seu último acesso foi <strong>01/01/2022 09:43</strong>
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Box display="flex" alignItems="center" justifyContent="center" flexDirection={"column"} height="100%" mt={-2}>
                <Typography my={1} variant="body1">
                  O BuildUp! Gerenciamento de Construções é a plataforma ideal para criação de projetos organizados para sua empresa.
                </Typography>
                <Typography my={1} variant="body1">
                  Contamos com uma plataforma de gestão de projetos, o qual identifica cada função e o que é necessário, para cada
                  empregado, realizar sua tarefas.
                </Typography>
                <Typography my={1} variant="body1">
                  Além disso, não se preocupe com o controle de estoque: toda atividade possui um módulo próprio para definir o que é
                  necessário em cada tarefa.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <img src="/direction.svg" style={{ maxWidth: "100%", padding: "10px", height: "280px" }} />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems={"center"} justifyContent="center" height="100%">
                <video width="400" height="240" controls></video>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems={"center"} justifyContent="center" height="100%">
                <Box textAlign={"center"}>
                  <Typography variant="body1">
                    Assista ao lado um vídeo tutorial de como começar a utilizar a ferramenta e planejar os seus próximos projetos :)
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};
