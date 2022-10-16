import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, TextField, Typography, Autocomplete, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import validator from "validator";
import { FieldErrors, checkFieldErrors } from "../../../utils/checkFieldErrors";
import { Cidades, Colaboradores, Estados, StatusOptions, Usuarios, UsuariosNivelAcesso } from "../../../types.d";
import { getCidades } from "../../../api/cidades/getCidades";
import { getEstados } from "../../../api/estados/getEstados";
import { getUsuarios } from "../../../api/usuarios/getUsuarios";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import { IdleLoadingFailed } from "../../../components/IdleLoadingError";
import { createProjeto } from "../../../api/projetos/createProjeto";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const ProjectForm = () => {
  const [titulo, setTitulo] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [estado, setEstado] = useState<Estados | null>(null);
  const [cidade, setCidade] = useState<Cidades | null>(null);
  const [rua, setRua] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [complemento, setComplemento] = useState<string>("");
  const [colaboradores, setColaboradores] = useState<Usuarios[]>([]);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors[]>([]);

  const [cidadesOptions, setCidadesOptions] = useState<Cidades[]>([]);
  const [estadosOptions, setEstadosOptions] = useState<Estados[]>([]);
  const [usuariosOptions, setUsuariosOptions] = useState<Usuarios[]>([]);

  const [status, setStatus] = useState<StatusOptions>(StatusOptions.IDLE);

  useEffect(() => {
    const loadOptions = async () => {
      setStatus(StatusOptions.LOADING);
      try {
        const cidadesReq = await getCidades();
        const estadosReq = await getEstados();
        const usuariosReq = await getUsuarios();

        setCidadesOptions(cidadesReq.data);
        setEstadosOptions(estadosReq.data);
        setUsuariosOptions(usuariosReq.data.filter((usuario: Usuarios) => usuario.nivelAcesso === UsuariosNivelAcesso.EMPREGADO));
      } catch (e) {
        return setStatus(StatusOptions.ERROR);
      }
      setStatus(StatusOptions.IDLE);
    };

    loadOptions();

    return () => {};
  }, []);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFieldErrors([]);

    let fieldErrors: FieldErrors[] = [];

    if (validator.isEmpty(titulo, { ignore_whitespace: true }))
      fieldErrors.push({ field: "titulo", message: "O titulo não pode estar vazio" });

    if (dataInicio === null || isNaN(dataInicio.getTime()))
      fieldErrors.push({ field: "dataInicio", message: "A data não pode estar vazia e deve ser válida." });

    if (validator.isEmpty(descricao, { ignore_whitespace: true }))
      fieldErrors.push({ field: "descricao", message: "A descricao não pode estar vazia" });

    if (estado === null) fieldErrors.push({ field: "estado", message: "O estado não pode estar vazio" });

    if (cidade === null) fieldErrors.push({ field: "cidade", message: "A cidade não pode estar vazia" });

    if (validator.isEmpty(descricao, { ignore_whitespace: true }))
      fieldErrors.push({ field: "descricao", message: "A descricao não pode estar vazia" });

    if (validator.isEmpty(cep, { ignore_whitespace: true }) || !cep.match(/^\d{5}-\d{3}$/i))
      fieldErrors.push({ field: "cep", message: "O CEP não pode estar vazio e deve seguir o formato XXXXX-XXX" });

    if (validator.isEmpty(numero, { ignore_whitespace: true }) || !validator.isInt(numero, { min: 1 }))
      fieldErrors.push({ field: "numero", message: "O número não pode estar vazio e também deve igual ou maior que 1" });

    if (validator.isEmpty(rua, { ignore_whitespace: true })) fieldErrors.push({ field: "rua", message: "A rua não pode estar vazia" });

    if (colaboradores.length === 0)
      fieldErrors.push({ field: "colaboradores", message: "Você deve selecionar pelo menos um colaborador." });

    if (fieldErrors.length !== 0) return setFieldErrors(fieldErrors);

    let data = {
      titulo,
      descricao,
      dataInicio: dataInicio!.toISOString(),
      enderecos: {
        create: {
          rua,
          numero: Number(numero),
          cep,
          complemento: validator.isEmpty(complemento, { ignore_whitespace: true }) ? null : complemento,
          cidadeId: cidade!.id,
        },
      },
      ativo: true,
      colaboradores: {
        createMany: {
          data: colaboradores.map((colaborador) => ({
            ativo: true,
            usuarioId: colaborador.id,
          })),
        },
      },
    };

    setStatus(StatusOptions.LOADING);
    try {
      const novoProjetoReq = await createProjeto(data);
      navigate(`/projetos/view/${novoProjetoReq.data.id}`);
    } catch (e) {
      setStatus(StatusOptions.ERROR);
    }
  };

  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Novo Projeto</Typography>
              <Typography variant="subtitle2" gutterBottom>
                Por favor, preencha todos os campos
              </Typography>
              <Button variant="contained" color="secondary" size="large" onClick={() => navigate(`/projetos`)}>
                Projetos
              </Button>
            </Grid>
            <Grid item xs={12}>
              <IdleLoadingFailed status={status}>
                <form onSubmit={onFormSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Informações sobre o projeto:</Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="titulo"
                            label="Título "
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
                        <Grid item xs={4}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              value={dataInicio}
                              onChange={(newValue) => {
                                console.log(newValue);
                                setDataInicio(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  margin="normal"
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
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            margin="normal"
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
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>
                        Endereço:
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <Autocomplete
                            disablePortal
                            id="estado-auto-complete"
                            options={estadosOptions}
                            getOptionLabel={({ nome }) => nome}
                            value={estado}
                            onChange={(e, val) => {
                              setCidade(null);
                              setEstado(val);
                            }}
                            renderOption={(props, option) => {
                              return (
                                <li {...props} key={`estado-${option.id}`}>
                                  {option.nome}
                                </li>
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                margin="dense"
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
                        <Grid item xs={4}>
                          <Autocomplete
                            disablePortal
                            id="cidade-auto-complete"
                            options={cidadesOptions.filter((cidade) => cidade.estadoId === estado?.id)}
                            getOptionLabel={({ nome }) => nome}
                            value={cidade}
                            onChange={(e, val) => setCidade(val)}
                            renderOption={(props, option) => {
                              return (
                                <li {...props} key={`cidade-${option.id}`}>
                                  {option.nome}
                                </li>
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                margin="dense"
                                required
                                fullWidth
                                id="cidade"
                                label="Cidade "
                                name="cidade"
                                autoComplete="cidade"
                                InputLabelProps={{ shrink: true }}
                                placeholder="Insira a cidade..."
                                disabled={estado === null}
                                error={checkFieldErrors(fieldErrors, "cidade") !== ""}
                                helperText={checkFieldErrors(fieldErrors, "cidade")}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <TextField
                            margin="dense"
                            required
                            fullWidth
                            id="cep"
                            label="CEP"
                            name="cep"
                            autoComplete="cep"
                            InputLabelProps={{ shrink: true }}
                            placeholder="Insira o CEP..."
                            error={checkFieldErrors(fieldErrors, "cep") !== ""}
                            helperText={checkFieldErrors(fieldErrors, "cep")}
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={9}>
                          <TextField
                            margin="dense"
                            required
                            fullWidth
                            id="rua"
                            label="Rua"
                            name="rua"
                            autoComplete="rua"
                            InputLabelProps={{ shrink: true }}
                            placeholder="Insira a rua..."
                            error={checkFieldErrors(fieldErrors, "rua") !== ""}
                            helperText={checkFieldErrors(fieldErrors, "rua")}
                            value={rua}
                            onChange={(e) => setRua(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            margin="dense"
                            required
                            fullWidth
                            id="numero"
                            label="Número"
                            name="numero"
                            autoComplete="numero"
                            InputLabelProps={{ shrink: true }}
                            placeholder="Insira o número..."
                            error={checkFieldErrors(fieldErrors, "numero") !== ""}
                            helperText={checkFieldErrors(fieldErrors, "numero")}
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            margin="dense"
                            fullWidth
                            id="complemento"
                            label="Complemento"
                            name="complemento"
                            autoComplete="complemento"
                            InputLabelProps={{ shrink: true }}
                            placeholder="Insira o complemento..."
                            error={checkFieldErrors(fieldErrors, "complemento") !== ""}
                            helperText={checkFieldErrors(fieldErrors, "complemento")}
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>
                        Quem vai atuar no projeto:
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Autocomplete
                            multiple
                            id="colaboradores-auto-complete"
                            options={usuariosOptions}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.nome}
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                                {option.nome}
                              </li>
                            )}
                            value={colaboradores}
                            onChange={(e, val) => {
                              console.log(val);
                              setColaboradores(val);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                margin="dense"
                                fullWidth
                                id="colaboradores"
                                label="Colaboradores "
                                name="colaboradores"
                                autoComplete="colaboradores"
                                InputLabelProps={{ shrink: true }}
                                placeholder="Selecione os colaboradores..."
                                error={checkFieldErrors(fieldErrors, "colaboradores") !== ""}
                                helperText={checkFieldErrors(fieldErrors, "colaboradores")}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" flexDirection={"row-reverse"}>
                        <Button variant="contained" color="primary" type="submit">
                          Salvar
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </IdleLoadingFailed>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
