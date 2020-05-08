import primaryColor from "@material-ui/core/colors/green";
import secondaryColor from "@material-ui/core/colors/teal";

export default {
  palette: {
    primary: {
      light: primaryColor[200],
      main: primaryColor[400],
      dark: primaryColor[700],
      contrastText: "#000",
    },
    secondary: {
      light: secondaryColor[200],
      main: secondaryColor[400],
      dark: secondaryColor[700],
      contrastText: "#fff",
    },
  },
};
