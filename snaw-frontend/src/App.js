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
import loading from './img/loading.gif'
import PublishIcon from '@material-ui/icons/Publish';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AddIcon from '@material-ui/icons/Add'
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from '@material-ui/icons/Info';
import back_img from './img/garden-pond-lakes-winery-581729.jpg'
import { shadows } from '@material-ui/system';
import $ from 'jquery';
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link } from 'react-router-dom';

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
                  fileCount: 0,
                  percentage: 0,
                  loadingBarVisible: true};
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
     event.preventDefault();
     var ajaxSuccess = this.ajaxSuccess;
     var formData = new FormData();
     for(var i = 0; i < this.state.selectedFile.length; i++) {
         formData.append('file', this.state.selectedFile[i]);
     }
     this.setState({loadingBarVisible: false})
     console.log(formData)
     var percent = 0;

     $.ajax({
         xhr: () => {
             var xhr = new window.XMLHttpRequest();
             var self = this;
             xhr.upload.addEventListener('progress', function (e) {
                 if (e.lengthComputable) {
                     percent = Math.round((e.loaded / e.total) * 100);
                     console.log(percent);
                     self.setState({percentage: percent});

                 }

             });
             return xhr
         },
         type: 'POST',
         url: '/uploader',
         data: formData,
         processData: false,
         contentType: false,
         success: () => {
             if (this.state.fileCount != 0) {
                 this.setState({filesInserted: true});
             }
         }
     })
  }


  render() {

     const {classes} = this.props;

    return (

      <div className="App">
          <div id="overlay" style={{display: 'none', position: 'fixed', width: '100%', height: '100%', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: '2', cursor: 'pointer'}}>
              <img id="ldimg" src={loading} alt='Loading...' style={{width: '62px', position: 'absolute', top: '50%', left: '50%', margin: '-31px 0 0 -31px'}}/>
          </div>
          <body>
          <ApplicationBar title={'Soundscape Noise Analysis Workbench'}/>
      <Container>
              <MuiThemeProvider theme={customtheme}>
                        <Grid container spacing={5} direction='column'>
                            <Paper elevation={3} >
                                <Box p={5}>
                            <Grid item>
                                <br/>
                                <Typography variant='h5' style={{color:customtheme.palette.primary.dark}}>
                                    Classify your Soundscape Audio Files Below
                                </Typography>
                                <Divider middle/>
                            </Grid>
                            <Grid item>
                            <br/>
                                    <form encType="multipart/form-data">
                                        <label htmlFor='my-input'>
                                            <Tooltip title={'Upload Audio File(s)'}>
                                                <Button variant="outlined"
                                                        component='span'>
                                                    <AddIcon  fontSize="large"/>
                                                </Button>
                                            </Tooltip>
                                        </label>
                                        <input id="my-input"
                                               aria-describedby="my-helper-text"
                                               type='file'
                                               multiple={true}
                                               onChange={this.fileSelectedHandler}
                                               name='file'
                                               style={{display: 'none'}}/>
                                        <Typography variant='body2' style={{color:"#6C7D72"}}>
                                            <br/> Selected Files : <br/>
                                            {this.state.selectedFile.map(function(file, index) {
                                                return <li key={index}>{file.name} (Size: {(file.size / 1048576).toFixed(2)} MB)<br/>
                                                </li>
                                            })}
                                            <br/>
                                            <LinearProgress hidden={this.state.loadingBarVisible} id="loadingBar" value = {this.state.percentage} valueBuffer = {this.state.percentage + Math.random(200)+2} variant="buffer"/>
                                            <br/>
                                        </Typography>
                                        <label htmlFor='my-submit'>
                                            <input id='my-submit'
                                                   type='submit'
                                                   style={{display: 'none'}}/>
                                                   <Tooltip title={'Submit Audio File(s)'}>
                                                <Button variant="contained"
                                                        onClick={this.submitHandler}
                                                        component='span'>
                                                    <PublishIcon/>
                                                </Button>
                                                   </Tooltip>
                                        </label>
                                    </form>
                            </Grid>
                            <Grid item>
                                <br/>
                                {<AnalyzeButton bool={this.state.filesInserted}/>}
                                {this.state.filesInserted = false}
                            </Grid>
                            <Grid item>
                                <Divider middle/><br/>
                                <Typography variant='body1'>
                                    <b>SNAW</b> uses machine learning techniques to accurately classify individual
                                    sound components found in soundscape audio files. SNAW allows for automatic
                                    classification of Anthrophony, Biophony, and Geophony sound components. Simply
                                    upload one or many .WAV audio files above, click analyze, and the automatic analysis
                                    will begin to take place. For more information about how the analysis works
                                    and results of accuracy measures please click below.
                                </Typography>
                                <Tooltip title={'More Information'}><Link to={'/Information'}><Button><InfoIcon/></Button></Link></Tooltip>
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
              <Typography variant='subtitle1' style={{marginLeft: 'auto', marginRight: 'auto'}}>Created by NAU Capstone Team IntelliChirp · <a href="https://www.ceias.nau.edu/capstone/projects/CS/2020/IntelliChirp-S20/">Visit project website</a> · <a href="https://soundscapes2landscapes.org/">Visit our sponsor</a></Typography>
              </Container>
          </footer>
      </div>
    );
  }
}

export default App;
