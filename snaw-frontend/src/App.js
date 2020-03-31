import React from 'react';
import logo from './img/logo_small.png';
import './App.css';
import AnalyzeButton from './components/AnalyzeButton';
import ApplicationBar from "./components/ApplicationBar";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import {createMuiTheme, MuiThemeProvider, Typography} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper"
import { withStyles} from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'

const customtheme = createMuiTheme({
    palette : {
        primary : { main: '#297B48',
                    light: '#7BB992',
                    dark: '#003E17',
                    contrastText: '#ffffff'},	/* Main Primary color */
        secondary : { main: '#AA4C39' },	/* Main Complement color */
    }
})

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selectedFile: [],
                  filesInserted: false, 
                  fileCount: 0};
    this.submitHandler.bind(this)
  }

  fileSelectedHandler = event => {
    event.preventDefault();

    this.state.selectedFile = Array.from(event.target.files);
    this.state.fileCount = this.state.selectedFile.length;

    this.setState(this.state.selectedFile)
  };

  /*-----------------------------------------------------/
   * Function [Event Handler]: submitHandler
   *-----------------------------------------------------/
   * This function handles the "Submit" button on the web app.
   * The function will check if the current state contains files.
   * If there are none, then the function will preventDefualting
   * for the Form, and call a re-render. Once files have been added,
   * this function will set filesInserted = true, which is sent to the
   * AnalyzeButton.js The page then force updates, which allows
   * the "Analyze" button to be shown in green and active.
   *-----------------------------------------------------*/
 submitHandler = event => {
     if(this.state.fileCount == 0) {
         event.preventDefault();
         this.render();
     }
     else {
        this.state.filesInserted = true;
        this.state.fileCount = 0;
        this.forceUpdate();
     }
 }


  render() {

     const {classes} = this.props;

    return (

      <div className="App">
        <ApplicationBar/>
        <header className="App-header">
                <Container>
                    <MuiThemeProvider theme={customtheme}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}><img src={logo} className="App-logo" alt="logo"/></Grid>
                            <Grid container direction="column" xs={8} spacing={1} justify='center'>
                                <Grid item >
                                    <Typography variant="h2" style={{color: customtheme.palette.primary.dark}}>
                                        Soundscape Noise Analysis Workbench
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </MuiThemeProvider>
                </Container>
        </header>
          <body>
          <Container>
              <MuiThemeProvider theme={customtheme}>
                        <Grid container spacing={3} direction='column'>
                            <Paper elevation={3} >
                                <Box p={5}>
                            <Grid item>
                                <br/>
                                <Typography variant='h5' style={{color:customtheme.palette.primary}}>
                                    Classify your Soundscape Files into Individual Sound Components
                                </Typography>
                                <Divider middle/>
                            </Grid>
                            <Grid item>
                            <br/>
                                    <form action="/uploader"
                                          method="POST"
                                          encType="multipart/form-data">
                                        <label htmlFor='my-input'>
                                            <Button variant="outlined"
                                                    component='span'>
                                                Upload Audio File(s)
                                            </Button>
                                        </label>
                                        <input id="my-input"
                                               aria-describedby="my-helper-text"
                                               type='file'
                                               multiple={true}
                                               onChange={this.fileSelectedHandler}
                                               name='file'
                                               style={{display: 'none'}}/>
                                        <Typography variant='body2' style={{color:"#6C7D72"}}>
                                            Selected Files : <br/>
                                            {this.state.selectedFile.map(function(file, index) {
                                                return <li key={index}>{file.name} (Size: {file.size} bytes)</li>
                                            })}
                                        </Typography>
                                        <label htmlFor='my-submit'>
                                            <input id='my-submit'
                                                   type='submit'
                                                   style={{display: 'none'}}/>
                                            <Button variant="contained"
                                                    onClick={this.submitHandler}
                                                    component='span'
                                                    style={{backgroundColor:customtheme.palette.primary}}>>
                                                Submit
                                            </Button>
                                        </label>
                                    </form>
                            </Grid>
                            <Grid item>
                                <br/>
                                <AnalyzeButton bool={this.state.filesInserted}/>
                            </Grid>
                            <Grid item>
                                <Divider middle/><br/>
                                <Typography variant='body1'>
                                    <b>SNAW</b> uses machine learning techniques to accurately classify individual
                                    sound components found in soundscape audio files. SNAW allows for automatic
                                    classification of Anthrophony, Biophony, and Geophony sound components. Simply
                                    upload one or many .WAV audio files above, click analyze, and the automatic analysis
                                    will begin to take place. For more information about how the analysis works
                                    and results of accuracy measures please click the button below.
                                </Typography>
                                <Button>Information</Button>
                            </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    </MuiThemeProvider>
                </Container>
            </body>
          <footer>
              <Container>
                  <br/><br/>
              <Typography variant='subtitle1'>Created by NAU Capstone Team IntelliChirp</Typography>
              </Container>
          </footer>
      </div>
    );
  }
}

export default App;