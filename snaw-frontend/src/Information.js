import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Container, createMuiTheme, ListItemText, MuiThemeProvider, Paper, Typography} from "@material-ui/core";
import ApplicationBar from "./components/ApplicationBar";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import nn_arch from './img/nn.png';
import CardMedia from "@material-ui/core/CardMedia";
import roc_ant from './img/roc_ant.png';
import roc_bio from './img/roc_bio.png';
import roc_geo from './img/roc_geo.png';
import conf_ant from './img/conf_ant.png';
import conf_bio from './img/conf_bio.png';
import conf_geo from './img/conf_geo.png';

const customtheme = createMuiTheme({
    palette : {
        primary : { main: '#297B48',
            light: '#7BB992',
            dark: '#003E17',
            contrastText: '#ffffff'},	/* Main Primary color */
        secondary : { main: '#AA4C39' },	/* Main Complement color */
    }
})

const useStyles = makeStyles(theme => ({
    padding: {
        padding: '15px',
    },
    images: {
        width: '55%',
    },
}));

function Information() {
    const classes = useStyles();
    return (
        <div className="Information">
            <ApplicationBar title={'Information about SNAW'}/>
            <Container>
                <MuiThemeProvider theme={customtheme}>
                    <Grid container spacing={5} direction='column'>
                        <Paper elevation={3}>
                            <Box p={5}>
                                <Grid item>
                                    <Typography variant='h3' style={{color:customtheme.palette.primary.dark}}>
                                        Motivations
                                    </Typography>
                                    <Divider middle></Divider>
                                    <Typography className={classes.padding}>Various environmental changes affect a range of species around the world
                                        and as more species are being affected, proper management and observation are
                                        required to understand their response. Traditional field methods require trained
                                        observers to determine species presence/absence and are thus expensive and
                                        challenging to employ at large scales. Using sound to monitor biodiversity across
                                        landscapes is a fairly recent development.
                                        </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h3' style={{color:customtheme.palette.primary.dark}}>
                                        What is SNAW
                                    </Typography>
                                    <Divider middle></Divider>
                                    <Typography className={classes.padding}>Using a Convolutional Neural Network, the Soundscape Noise Analysis Workbench
                                    allows biodiversity researchers and volunteers to easily, quickly, and automatically
                                    identify individual sound components from their uploaded soundscape files.
                                    </Typography>
                                    <Typography><br/>SNAW identifies sounds in three categories:</Typography>
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                primary='Anthrophony'
                                                secondary='Sounds made by humans. Subcategories include: Air Traffic (AAT), Vehicle Horn (AVH), Vehicle Traffic (AVT), Rail Traffic (ART), Siren (ASI), Machinery (AMA), Human Voice (AHV), Music (AMU).'/>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary='Biophony'
                                                secondary='Sounds made by biological life. Subcategories include: Birds (BBI), Insects (BIN), Amphibians (BAM), Mammals (BMA).'/>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary='Geophony'
                                                secondary='Sounds made by nature. Subcategories include: Rain (GRA), Constant Wind (GWC), Gust of Wind (GWG), Stream (GST), Ocean (GOC).'/>
                                        </ListItem>
                                    </List>
                                </Grid>
                                SNAW uses a Convolutional Neural Network for each of the 3 categories above. The accuracies for each category are listed below:
                                <br/><br/>
                                Anthrophony: X%
                                <br/>
                                Biophony: X%
                                <br/>
                                Geophony: X%
                                <br/><br/>
                                <Grid item>
                                    <Typography variant='h3' style={{color:customtheme.palette.primary.dark}}>
                                        Architecture
                                    </Typography>
                                    <Typography>Conv2D            (None, 116, 28, 109)</Typography>
                                    <Typography>MaxPooling2D      (None, 58, 14, 109)</Typography>
                                    <Typography>Conv2D            (None, 56, 12, 81)</Typography>
                                    <Typography>MaxPooling2D      (None, 28, 6, 81)</Typography>
                                    <Typography>Flatten           (None, 16224)</Typography>
                                    <Typography>Dropout           (None, 16224)</Typography>
                                    <Typography>Dense             (None, 118)</Typography>
                                    <Typography>Dropout           (None, 118)</Typography>
                                    <Typography>Dense             (None, 7)</Typography>
                                    <Divider/>
                                    <CardMedia id="nn_arch" component='img' image={nn_arch}
                                               className={classes.images}/>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h3' style={{color:customtheme.palette.primary.dark}}>
                                        Confusion Matrix
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item>
                                            <Typography variant='subtitle1'>
                                                Anthrophony
                                            </Typography>
                                            <CardMedia id="nn_arch" component='img' image={conf_ant}
                                                       className={classes.images}/>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='subtitle1'>
                                                Biophony
                                            </Typography>
                                            <CardMedia id="nn_arch" component='img' image={conf_bio}
                                                       className={classes.images}/>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='subtitle1'>
                                                Geophony
                                            </Typography>
                                            <CardMedia id="nn_arch" component='img' image={conf_geo}
                                                       className={classes.images}/>
                                        </Grid>
                                    </Grid>
                                    <Divider/>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h3' style={{color:customtheme.palette.primary.dark}}>
                                        ROC Curves
                                    </Typography>
                                    <Divider/>
                                    <Typography variant='subtitle1'>
                                        Anthrophony
                                    </Typography>
                                    <CardMedia id="nn_arch" component='img' image={roc_ant}
                                    className={classes.images}/>
                                    <Typography variant='subtitle1'>
                                        Biophony
                                    </Typography>
                                    <CardMedia id="nn_arch" component='img' image={roc_bio}
                                    className={classes.images}/>

                                    <Typography variant='subtitle1'>
                                        Geophony
                                    </Typography>
                                    <CardMedia id="nn_arch" component='img' image={roc_geo}
                                    className={classes.images}/>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                </MuiThemeProvider>
            </Container>
            <footer>
              <Container>
                <br/><br/>
                <Typography variant='subtitle1' style={{marginLeft: 'auto', marginRight: 'auto'}}>Created by NAU Capstone Team IntelliChirp · <a href="https://www.ceias.nau.edu/capstone/projects/CS/2020/IntelliChirp-S20/">Visit project website</a> · <a href="https://soundscapes2landscapes.org/">Visit our sponsor</a></Typography>
                <br/>
              </Container>
          </footer>
        </div>
    )
}

export default Information;