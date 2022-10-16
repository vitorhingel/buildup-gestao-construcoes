import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Paper, Typography, Box, Avatar } from "@mui/material";
import { StatusOptions } from "../../../types.d";
import { IdleLoadingFailed } from "../../../components/IdleLoadingError";
import { getProjeto } from "../../../api/projetos/getProjeto";
import { format, parseISO } from "date-fns";
import { ProjectViewCalendar } from "./Atividades";
import MaterialTable from "@material-table/core";

export const ProjectView = () => {
  const [status, setStatus] = useState<StatusOptions>(StatusOptions.IDLE);
  const [projeto, setProjeto] = useState<any>({});

  const params = useParams();

  useEffect(() => {
    const loadProjeto = async () => {
      try {
        const projetoReq = await getProjeto(params.id!);

        setProjeto(projetoReq.data);

        setStatus(StatusOptions.IDLE);
      } catch (error) {
        setStatus(StatusOptions.ERROR);
      }
    };

    loadProjeto();

    return () => {};
  }, []);

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <IdleLoadingFailed status={status}>
              <>
                {projeto !== null && (
                  <>
                    <Typography variant="h4">{projeto.titulo}</Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Criado em:{" "}
                      {!isNaN(parseISO(projeto.dataCriacao).getTime()) && format(parseISO(projeto.dataCriacao), "dd/MM/yyyy hh:mm")}
                    </Typography>
                    <Box display="flex" alignItems="center" justifyContent="space-around">
                      <Box width={"300px"}>{projeto.descricao}</Box>
                      <Box width={"300px"} display="flex" alignItems="center" justifyContent="space-around">
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                          <Typography variant="subtitle1" gutterBottom>
                            <strong>Empregados</strong>
                          </Typography>
                          <Avatar
                            sx={{
                              width: 72,
                              height: 72,
                              bgcolor: "white",
                              color: "primary.main",
                              borderColor: "primary.main",
                              borderWidth: "3px",
                              borderStyle: "solid",
                            }}
                          >
                            {projeto.colaboradores?.length || 0}
                          </Avatar>
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                          <Typography variant="subtitle1" gutterBottom>
                            <strong>Tarefas</strong>
                          </Typography>
                          <Avatar
                            sx={{
                              width: 72,
                              height: 72,
                              bgcolor: "white",
                              color: "primary.main",
                              borderColor: "primary.main",
                              borderWidth: "3px",
                              borderStyle: "solid",
                            }}
                          >
                            {projeto?.colaboradores?.reduce((acc: number, val: any) => acc + val.tarefas.length, 0)}
                          </Avatar>
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                          <Typography variant="subtitle1" gutterBottom>
                            <strong>Projetistas</strong>
                          </Typography>
                          <Avatar
                            sx={{
                              width: 72,
                              height: 72,
                              bgcolor: "white",
                              color: "primary.main",
                              borderColor: "primary.main",
                              borderWidth: "3px",
                              borderStyle: "solid",
                            }}
                          >
                            1
                          </Avatar>
                        </Box>
                      </Box>
                    </Box>
                    <Typography variant="subtitle2" gutterBottom p={1} mt={4}>
                      Atividades:
                    </Typography>
                    <Box height="200px">
                      <ProjectViewCalendar />
                    </Box>
                    <Box my={2} display="flex" alignItems="center" justifyContent="space-around">
                      <Box width={480}>
                        <Typography variant="subtitle2" gutterBottom p={1}>
                          Empregados:
                        </Typography>
                        <MaterialTable
                          components={{
                            Container: (props) => <Paper {...props} elevation={0}></Paper>,
                          }}
                          columns={[
                            { title: "Nome", field: "usuarios.nome" },
                            { title: "Tarefas", field: "", render: (_) => "0/0" },
                          ]}
                          data={projeto?.colaboradores}
                          options={{
                            toolbar: false,
                          }}
                        />
                      </Box>
                      <Box width={250} display="flex" alignItems="center" justifyContent={"center"} flexDirection="column">
                        <Typography variant="h6" gutterBottom>
                          Não existem tarefas.
                        </Typography>
                        <Typography variant="subtitle2">Por favor, aguarde até a próxima versão para adicionar tarefas.</Typography>
                      </Box>
                    </Box>
                  </>
                )}
              </>
            </IdleLoadingFailed>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
