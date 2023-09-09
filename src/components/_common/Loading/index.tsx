import "./loading.scss";

import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFF798",
    },
  },
});

const Loading = () => {
  return (
    <div className="loading-background">
      <ThemeProvider theme={theme}>
        <CircularProgress size="80px" />
      </ThemeProvider>
    </div>
  );
};

export default Loading;
