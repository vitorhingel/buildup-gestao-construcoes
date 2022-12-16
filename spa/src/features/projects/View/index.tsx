import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Paper, Typography, Box, Avatar, Button } from "@mui/material";
import { StatusOptions, Tarefas } from "../../../types.d";
import { IdleLoadingFailed } from "../../../components/IdleLoadingError";
import { getProjeto } from "../../../api/projetos/getProjeto";
import { format, parseISO } from "date-fns";
import { ProjectViewCalendar } from "./Atividades";
import MaterialTable from "@material-table/core";
import { TarefasFormDialog } from "./Tarefas/FormDialog";
import { listTarefas } from "../../../api/tarefas/listTarefas";

export const ProjectView = () => {
  const [status, setStatus] = useState<StatusOptions>(StatusOptions.LOADING);
  const [projeto, setProjeto] = useState<any>({});
  const [tarefas, setTarefas] = useState<Tarefas[]>([]);
  const [isTarefasFormDialogOpen, setIsTarefasFormDialogOpen] = useState<boolean>(false);

  const params = useParams();

  useEffect(() => {
    const loadProjeto = async () => {
      try {
        const projetoReq = await getProjeto(params.id!);
        const tarefasReq = await listTarefas(+params.id!);

        setProjeto(projetoReq.data);
        setTarefas(tarefasReq.data);

        setStatus(StatusOptions.IDLE);
      } catch (error) {
        setStatus(StatusOptions.ERROR);
      }
    };

    if (status === StatusOptions.LOADING) {
      loadProjeto();
    }

    return () => {};
  }, [status]);

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2 }}>
        <TarefasFormDialog
          isOpen={isTarefasFormDialogOpen}
          colaboradores={projeto?.colaboradores ?? []}
          handleClose={() => {
            setStatus(StatusOptions.LOADING);
            setIsTarefasFormDialogOpen(false);
          }}
        />
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
                            {tarefas.length}
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
                    <Box my={2} display="flex" justifyContent="space-around">
                      <Box width={480}>
                        <Typography variant="h5" gutterBottom p={1}>
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
                      <Box width={480} display="flex" flexDirection={"column"}>
                        {tarefas.length === 0 ? (
                          <Typography variant="h6" gutterBottom>
                            Não existem tarefas.
                            <br></br>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => setIsTarefasFormDialogOpen(true)}
                              sx={{
                                alignSelf: "flex-end",
                                my: 2,
                              }}
                            >
                              Criar
                            </Button>
                          </Typography>
                        ) : (
                          <Box display="flex" flexDirection={"column"}>
                            <Typography variant="h5" gutterBottom p={1}>
                              Tarefas:
                            </Typography>
                            <MaterialTable
                              components={{
                                Container: (props) => <Paper {...props} elevation={0}></Paper>,
                              }}
                              columns={[
                                { title: "Tarefa", field: "titulo" },
                                { title: "Estado", field: "estado" },
                                { title: "Data Limite", field: "dataFim", type: "date" },
                                // { title: "Tarefas", field: "", render: (_) => "0/0" },
                              ]}
                              data={tarefas}
                              options={{
                                toolbar: false,
                              }}
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => setIsTarefasFormDialogOpen(true)}
                              sx={{
                                alignSelf: "flex-end",
                                my: 2,
                              }}
                            >
                              Criar
                            </Button>
                          </Box>
                        )}
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
