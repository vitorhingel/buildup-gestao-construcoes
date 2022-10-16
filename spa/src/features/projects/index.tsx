import MaterialTable from "@material-table/core";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listProjetosUsuario } from "../../api/projetos/listProjetosUsuario";
import { useAppSelector } from "../../app/hooks";
import { StatusOptions } from "../../types.d";
import { selectUser } from "../../user/userSlice";

export const ListProjects = () => {
  const user = useAppSelector(selectUser);
  const [status, setStatus] = useState<StatusOptions>(StatusOptions.IDLE);
  const [projetos, setProjetos] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProjetos = async () => {
      setStatus(StatusOptions.LOADING);
      try {
        const projetosPessoaisReq = await listProjetosUsuario(user.sub!);
        setProjetos(projetosPessoaisReq.data);
        setStatus(StatusOptions.IDLE);
      } catch (e) {
        setStatus(StatusOptions.ERROR);
      }
    };

    loadProjetos();
    return () => {};
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Meus Projetos</Typography>
              <Typography variant="subtitle2" gutterBottom>
                Aqui você pode gerenciar os seus projetos.
              </Typography>
              {(user.nivelAcesso === "administrador" || user.nivelAcesso === "projetista") && (
                <Button variant="contained" color="secondary" size="large" onClick={() => navigate(`/projetos/form`)}>
                  Novo
                </Button>
              )}
              <Box display={"flex"} alignItems="center" justifyContent="space-around">
                <Box width="350px">
                  <Typography variant="body1">
                    Todos os seus projetos estão <strong>disponíveis aqui</strong>. Caso você precise acesar algum projeto arquivado, por
                    favor, acesse a próxima versão :)
                  </Typography>
                </Box>
                <img alt="scrum board" src="scrum_board.svg" style={{ maxWidth: "400px" }} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box p={2}>
                <MaterialTable
                  title="Basic Selection Preview"
                  components={{
                    Container: (props) => <Paper {...props} elevation={0}></Paper>,
                  }}
                  columns={[
                    { title: "Nome", field: "titulo" },
                    { title: "Data de Início", field: "dataInicio", type: "date" },
                    { title: "Empregados", field: "empregados", type: "numeric", render: (rowData) => `${rowData.colaboradores.length}` },
                    {
                      title: "Tarefas",
                      field: "tarefas",
                      type: "numeric",
                      render: (rowData) => `${rowData.colaboradores.reduce((acc: number, val: any) => acc + val._count.tarefas, 0)}`,
                    },
                  ]}
                  data={projetos}
                  options={{
                    toolbar: false,
                  }}
                  actions={[
                    {
                      icon: "visibility",
                      tooltip: "Visualizar",
                      onClick: (e, rowData) => window.open(`/projetos/view/${rowData.id}`),
                    },
                  ]}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
