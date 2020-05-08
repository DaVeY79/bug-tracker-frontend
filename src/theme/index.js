import primaryColor from "@material-ui/core/colors/green";
import secondaryColor from "@material-ui/core/colors/red";
import contrastColor from "@material-ui/core/colors/grey";

export default {
  palette: {
    primary: {
      light: primaryColor[200],
      main: primaryColor[400],
      dark: primaryColor[700],
      contrastText: contrastColor[200],
    },
    secondary: {
      light: secondaryColor[200],
      main: secondaryColor[400],
      dark: secondaryColor[700],
      contrastText: contrastColor[200],
    },
  },
};
