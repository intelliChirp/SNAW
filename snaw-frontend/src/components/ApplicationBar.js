import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import { Link } from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import logo from "../img/logo_small.png";
import back_img from "../img/garden-pond-lakes-winery-581729.jpg";
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles({});

const customtheme = createMuiTheme({
    palette : {
        primary : { main: '#297B48',
            light: '#7BB992',
            dark: '#003E17',
            contrastText: '#ffffff'},	/* Main Primary color */
        secondary : { main: '#AA4C39' },	/* Main Complement color */
    }
})

const styles = {
    headerContainer: {
        backgroundImage : `url(${back_img})`,
        backgroundSize: 'cover'
    },

    scrim: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backgroundSize: 'cover'
    },

    icon: {
        verticalAlign: 'text-bottom',
        paddingRight: '10px',
        fill: 'white'
    }
}

/* Creates a static Application bar to be featured on the top of each page in the website */
export default function Applicationbar(props) {
    const classes = useStyles();

    return (
        <header style={styles.headerContainer}>
            <header style={styles.scrim}>
                <AppBar position='static'
                        style={{background: customtheme.palette.primary.main}}>
                    <Toolbar>
                        <Typography variant='h6'
                                    className={classes.title}
                                    color='inherit'>
                            <Link to={'/'}>
                                <HomeIcon style={styles.icon}></HomeIcon>
                            </Link>
                            Soundscape Noise Analysis Workbench Home
                        </Typography>
                    </Toolbar>
                </AppBar>
                <br/>
                <br/>
                <Container>
                    <MuiThemeProvider theme={customtheme}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}><img src={logo} className="App-logo" alt="logo"/></Grid>
                            <Grid container direction="column" xs={8} spacing={1} justify='center'>
                                <Grid item >
                                    <Typography variant="h2" style={{color: customtheme.palette.primary.contrastText}}>
                                        {props.title}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <br/>
                        <br/>
                    </MuiThemeProvider>
                </Container>
            </header>
        </header>

    );
}