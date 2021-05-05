import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#52eff7',
            main: '#4aabb1',
            dark: '#0b979e',
            contrastText: '#fff',
        },
        secondary: {
            light: '#659294',
            main: '#4a7a7d',
            dark: '#386163',
            contrastText: '#fff',
        },
        error: {
            light: '#f6685e',
            main: '#f44336',
            dark: '#aa2e25',
            contrastText: '#fff',
        },
        type: 'light'
    },
    fontFamily: 'fontsource-roboto' // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
});

export default theme;