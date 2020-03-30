import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withStyles} from "@material-ui/core/styles";
import ant_i from '../img/ant.png';
import bio_i from '../img/bio-27-690985.png';
import geo_i from '../img/large_GEO_Corp_Logo__R_.jpg'
import CardMedia from "@material-ui/core/CardMedia";

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

class Spectrogram extends React.Component {
    state = {
        picture : 0
    }

    toggleAntImage = () => { this.setState(state => ({picture : 0})) }
    toggleBioImage = () => { this.setState(state => ({picture : 1})) }
    toggleGeoImage = () => { this.setState(state => ({picture : 2})) }

    getImageName = () => {
        if(this.state.picture === 0){return this.props.ant_img}
        if(this.state.picture === 1){return this.props.bio_img}
        if(this.state.picture === 2){return this.props.geo_img}}

    render() {
        const {classes} = this.props;
        const imageName = this.getImageName();
        return (
            <div>
                <CardMedia id="spectrogram" component='img' image={imageName}
                           className="classes.media"/>
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