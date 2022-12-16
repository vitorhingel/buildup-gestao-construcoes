import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Grid, Autocomplete } from "@mui/material";
import { checkFieldErrors, FieldErrors } from "../../../../utils/checkFieldErrors";
import { AutoCompleteOptions, Colaboradores, EstadoDaTarefa, StatusOptions } from "../../../../types.d";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import validator from "validator";
import { IdleLoadingFailed } from "../../../../components/IdleLoadingError";
import { createTarefa } from "../../../../api/tarefas/createTarefa";

interface TarefasFormDialogProps {
  isOpen: boolean;
  colaboradores: Colaboradores[];
  handleClose: () => void;
}

const EstadoDaTarefaOptions: AutoCompleteOptions<string>[] = [
  {
    id: EstadoDaTarefa.PENDENTE,
    nome: "Pendente",
  },
  {
    id: EstadoDaTarefa.CONFIRMADA,
    nome: "Confirmada",
  },
  {
    id: EstadoDaTarefa.CONCLUIDA,
    nome: "Concluida",
  },
];

const mapColaboradoresToAutoComplete = (colaboradores: Colaboradores[]): AutoCompleteOptions<number>[] => {
  return colaboradores.map(({ id, usuarios }) => ({
    id,
    nome: usuarios?.nome ?? "Colaborador",
  }));
};

export const TarefasFormDialog = ({ isOpen, colaboradores, handleClose }: TarefasFormDialogProps) => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors[]>([]);
  const [titulo, setTitulo] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);
  const [estado, setEstado] = useState<AutoCompleteOptions<string>>(EstadoDaTarefaOptions[0]);
  const [colaborador, setColaborador] = useState<AutoCompleteOptions<number> | null>(null);

  const [status, setStatus] = useState<StatusOptions>(StatusOptions.IDLE);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFieldErrors([]);

    let fieldErrors: FieldErrors[] = [];

    if (validator.isEmpty(titulo, { ignore_whitespace: true }))
      fieldErrors.push({ field: "titulo", message: "O titulo não pode estar vazio" });

    if (validator.isEmpty(descricao, { ignore_whitespace: true }))
      fieldErrors.push({ field: "descricao", message: "A descrição não pode estar vazia" });

    if (dataInicio === null || isNaN(dataInicio.getTime()))
      fieldErrors.push({ field: "dataInicio", message: "A data inicial não pode estar vazia e deve ser válida." });

    if (dataFim === null || isNaN(dataFim.getTime()))
      fieldErrors.push({ field: "dataFim", message: "A data fim não pode estar vazia e deve ser válida." });

    if (colaborador === null) fieldErrors.push({ field: "colaborador", message: "O colaborador deve ser definido" });

    if (fieldErrors.length !== 0) return setFieldErrors(fieldErrors);

    let data = {
      titulo,
      descricao,
      dataInicio: dataInicio!.toISOString(),
      dataFim: dataFim!.toISOString(),
      estado: estado.id,
      colaboradores: {
        connect: {
          id: colaborador!.id,
        },
      },
    };

    setStatus(StatusOptions.LOADING);
    try {
      await createTarefa(data);
      handleClose();
    } catch (e) {
      setStatus(StatusOptions.ERROR);
    }
    setStatus(StatusOptions.IDLE);
  };

  return (
    <form onSubmit={onFormSubmit} noValidate>
      <Dialog open={isOpen} fullWidth maxWidth="lg">
        <DialogTitle>Nova tarefa</DialogTitle>
        <DialogContent>
          <DialogContentText>Por favor, preencha todos os dados para criar a nova tarefa.</DialogContentText>
          <IdleLoadingFailed status={status}>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="titulo"
                  label="Titulo"
                  name="titulo"
                  autoComplete="titulo"
                  InputLabelProps={{ shrink: true }}
                  placeholder="Insira o título..."
                  error={checkFieldErrors(fieldErrors, "titulo") !== ""}
                  helperText={checkFieldErrors(fieldErrors, "titulo")}
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="descricao"
                  label="Descrição"
                  name="descricao"
                  autoComplete="descricao"
                  InputLabelProps={{ shrink: true }}
                  placeholder="Insira a descrição..."
                  multiline
                  rows={4}
                  error={checkFieldErrors(fieldErrors, "descricao") !== ""}
                  helperText={checkFieldErrors(fieldErrors, "descricao")}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={dataInicio}
                    onChange={(newValue) => {
                      setDataInicio(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        fullWidth
                        id="dataInicio"
                        label="Data Início"
                        name="dataInicio"
                        autoComplete="dataInicio"
                        InputLabelProps={{ shrink: true }}
                        error={checkFieldErrors(fieldErrors, "dataInicio") !== ""}
                        helperText={checkFieldErrors(fieldErrors, "dataInicio")}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={dataFim}
                    onChange={(newValue) => {
                      setDataFim(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        fullWidth
                        id="dataFim"
                        label="Data Fim"
                        name="dataFim"
                        autoComplete="dataFim"
                        InputLabelProps={{ shrink: true }}
                        error={checkFieldErrors(fieldErrors, "dataFim") !== ""}
                        helperText={checkFieldErrors(fieldErrors, "dataFim")}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  id="estado-tarefa-auto-complete"
                  options={EstadoDaTarefaOptions}
                  getOptionLabel={({ nome }: any) => nome}
                  value={estado}
                  isOptionEqualToValue={(option, val) => option.id === val.id}
                  disableClearable
                  onChange={(e, val: AutoCompleteOptions<string>) => {
                    if (val) setEstado(val);
                  }}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={`tarefa-${option.id}`}>
                        {option.nome}
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      fullWidth
                      id="estado"
                      label="Estado "
                      name="estado"
                      autoComplete="estado"
                      InputLabelProps={{ shrink: true }}
                      placeholder="Selecione o Estado..."
                      error={checkFieldErrors(fieldErrors, "estado") !== ""}
                      helperText={checkFieldErrors(fieldErrors, "estado")}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  id="colaborador-auto-complete"
                  options={mapColaboradoresToAutoComplete(colaboradores)}
                  isOptionEqualToValue={(option, val) => option.id === val.id}
                  getOptionLabel={({ nome }: any) => nome}
                  value={colaborador}
                  onChange={(e, val: AutoCompleteOptions<number> | null) => {
                    setColaborador(val);
                  }}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={`colaborador-${option.id}`}>
                        {option.nome}
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      fullWidth
                      id="colaborador"
                      label="Colaborador "
                      name="colaborador"
                      autoComplete="colaborador"
                      InputLabelProps={{ shrink: true }}
                      placeholder="Selecione o colaborador..."
                      error={checkFieldErrors(fieldErrors, "colaborador") !== ""}
                      helperText={checkFieldErrors(fieldErrors, "colaborador")}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </IdleLoadingFailed>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={onFormSubmit}>
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};
