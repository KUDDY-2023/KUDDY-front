import "./loading.scss";

import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";

type Props = {
  backColor: string;
  spinnerColor: string;
  size: string;
};

const Loading = ({ backColor, spinnerColor, size }: Props) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: spinnerColor,
      },
    },
  });

  return (
    <div className="loading-background" style={{ background: backColor }}>
      <ThemeProvider theme={theme}>
        <CircularProgress size={size} />
      </ThemeProvider>
    </div>
  );
};

export default Loading;
