import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withStyles} from "@material-ui/core/styles";
import ant_i from '../img/ant.png';
import bio_i from '../img/bio-27-690985.png';
import geo_i from '../img/large_GEO_Corp_Logo__R_.jpg'

const useStyles = theme => ({
    button: {
        color: 'white',
        fontSize: '1em',
        backgroundColor: '#3f5a14',
        margin: theme.spacing(1),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        '&:hover': {
            background: '#2e420e',
        },
    },
});

const imagesPath = {
    ant : ant_i,
    bio : bio_i,
    geo : geo_i
}

class Spectrogram extends React.Component {
    state = {
        picture : 0
    }

    toggleAntImage = () => { this.setState(state => ({picture : 0})) }
    toggleBioImage = () => { this.setState(state => ({picture : 1})) }
    toggleGeoImage = () => { this.setState(state => ({picture : 2})) }

    getImageName = () => {
        if(this.state.picture === 0){return 'ant'}
        if(this.state.picture === 1){return 'bio'}
        if(this.state.picture === 2){return 'geo'}}

    render() {
        const {classes} = this.props;
        const imageName = this.getImageName();
        return (
            <div>
                <img style={{maxWidth : '50px'}} src={imagesPath[imageName]}/>
                <Button disabled={false}
                        variant="contained"
                        className={classes.button}
                        onClick={this.toggleAntImage}>
                    Anthrophony
                </Button>
                <Button disabled={false}
                        variant="contained"
                        className={classes.button}
                        onClick={this.toggleBioImage}>
                    Biophony
                </Button>
                <Button disabled={false}
                        variant="contained"
                        className={classes.button}
                        onClick={this.toggleGeoImage}>
                    Geophony
                </Button>
            </div>
        )
    }
}

export default withStyles(useStyles)(Spectrogram);