import {createTheme} from "@mui/material";

/**
 * Custom MUI theme based on FitHub's design system.
 *
 * @type {Theme}
 */
const FitHubTheme = createTheme({
    palette: {
        primary: {
            main: '#222831',
        }, secondary: {
            main: '#393E46',
        }, info: {
            main: '#EEEEEE',
        }, warning: {
            main: '#00ADB5',
        }, text: {
            primary: '#222831', secondary: '#393E46',
        }
    },
    typography: {
        h1: {
            fontWeight: 700,
            fontSize: 32,
        },
        h2: {
            fontWeight: 600,
            fontSize: 24,
        },
        h3: {
            fontWeight: 550,
            fontSize: 20,
        },
        h4: {
            fontWeight: 500,
            fontSize: 16,
        },
        body1: {
            fontWeight: 400,
            fontSize: 14,
        },
        caption: {
            fontWeight: 300,
            color: "#393E46",
            fontSize: 14,
        }
    }
});

export default FitHubTheme;
