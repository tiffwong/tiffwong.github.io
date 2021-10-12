import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import Content from "./components/Content";
import Nav from "./components/Nav";
import theme from "./theme";

const useStyles = makeStyles({
	root: {
		display: "flex",
		justifyContent: "center",
		margin: "80px auto",
		maxWidth: 1280,
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
		},
	},
});

function App() {
	const classes = useStyles();

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className={classes.root}>
				<Nav />
				<Content />
			</div>
		</ThemeProvider>
	);
}

export default App;
