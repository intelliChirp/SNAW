import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withStyles} from "@material-ui/core/styles";
import { withRouter } from 'react-router-dom';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Tooltip from "recharts/lib/component/Tooltip";
import { ToastContainer, toast } from 'react-toastify';

const useStyles = theme => ({
    button: {
        color: 'white',
        fontSize: '1em',
        backgroundColor: '#AA4C39',
        margin: theme.spacing(1),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        '&:hover': {
            background: '#550F00',
        },
    },
});

/*-----------------------------------------------------/
 * Class: AnalyzeButton
 *-----------------------------------------------------/
 * The AnalyzeButton has been converted into a class to
 * allow the component to be passed arguments. We then use
 * the passed in bool (in this.props.bool) to determine whether
 * to show the "Analyze" button in green and enabled vs. grey and
 * disabled.
 *-----------------------------------------------------*/
class AnalyzeButton extends React.Component {
    notify = () => toast.info("Now Analyzing your Files ")

    showLoadingImage = event => {
        event.preventDefault();
        document.getElementById("overlay").style.display='block';
        document.getElementById("ldimg").style.display='block';
        setTimeout( event => { this.props.history.push('/results'); }, 100);
    };

    render() {
        const { classes } = this.props;
            return (
                <div>
                    <label htmlFor="outlined-button-file">
                        {this.props.bool ? (
                            <Link to={'/results'} onClick={this.showLoadingImage} style={{ textDecoration: 'none' }}>
                                    <Button disabled={false}
                                            variant="contained"
                                            className={classes.button}
                                            onClick={this.notify}>
                                        Analyze Audio File(s)
                                    </Button>
                            </Link>
                            ) : (
                                <Button disabled={true}
                                    variant="contained"
                                    className={classes.button}>
                                    Please upload file(s)
                                </Button>
                        )}
                    </label>
                </div>
            )
    }
}
export default withRouter(withStyles(useStyles)(AnalyzeButton));
