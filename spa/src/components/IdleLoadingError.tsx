import { Box, CircularProgress, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { StatusOptions } from "../types.d";

interface IdleLoadingFailedProps {
  height?: string;
  width?: string;
  status: StatusOptions | StatusOptions[];
  children: JSX.Element;
}

const getStatus = (status: StatusOptions | StatusOptions[]) => {
  if (Array.isArray(status)) {
    if (status.find((currentStatus) => currentStatus === StatusOptions.ERROR)) return StatusOptions.ERROR;
    if (status.find((currentStatus) => currentStatus === StatusOptions.LOADING)) return StatusOptions.LOADING;
    return StatusOptions.IDLE;
  }

  return status;
};

export const IdleLoadingFailed = ({ width, status, children, height }: IdleLoadingFailedProps) => {
  return getStatus(status) === StatusOptions.LOADING ? (
    <Box width={width || "100%"} height={height || "300px"} display="flex" alignItems="center" justifyContent="center">
      <CircularProgress />
    </Box>
  ) : getStatus(status) === StatusOptions.ERROR ? (
    <Box
      width={width || "100%"}
      height={height || "300px"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection={"column"}
    >
      <Typography variant="h4">Um erro desconhecido aconteceu..</Typography>
      <Typography variant="subtitle2" color={grey[600]}>
        Por favor, tente novamente mais tarde.
      </Typography>
    </Box>
  ) : (
    children
  );
};
