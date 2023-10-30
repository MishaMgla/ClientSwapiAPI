import { CssBaseline, GlobalStyles } from "@mui/material";
import { blue } from "@mui/material/colors";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const Styles = () => {
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: { backgroundColor: [blue[500]] },
        }}
      />
    </>
  );
};
