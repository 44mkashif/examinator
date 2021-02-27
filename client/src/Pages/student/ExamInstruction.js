import React from 'react';
import AppBar from './Components/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    margin: {
        marginTop: 20
    },
    container: {
        paddingTop: theme.spacing(8),

    },
    button: {
        borderRadius: 100,
    }
}));

const defaultProps = {
    bgcolor: 'background.paper',
    
    style: { width: '100%' , height: '1rem' },
    borderColor: 'text.primary',
};



export default function Exam() {

    const classes = useStyles();

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <React.Fragment>
            <AppBar />
            <div className={classes.root}>
                <Grid container justify="center" className={classes.container}>
                    <Grid item md={8}>
                        
                            <div>
                                <Typography variant="h2" component="h2" gutterBottom align= 'center'>
                                    Exam Name
                                </Typography>
                                <Box borderTop={3} {...defaultProps} />
                                <Typography variant="body1" gutterBottom>
                                    <h3 align= 'center'>Before beginning the exam</h3>
                                    <ol >
                                        <li>Make sure you have a good internet connection.</li>
                                        <li>Log out of Blackboard and then back into Blackboard before you begin. This will help with connectivity issues.</li>
                                        <li>If you are taking the exam late in the day, it is recommended that you reboot your computer before beginning to free up memory resources from other programs on your computer.</li>
                                        <li>Shut down all Instant Messaging tools (Skype, AIM, MSN Messenger) and Email programs as they can conflict with Blackboard.</li>
                                        <li>Enter the Blackboard course using Firefox. Do not use any other internet browser.</li>
                                        <li>Maximize your browser window before starting the test. Minimizing the browser window during the exam can prevent the submission of your exam.</li>
                                        <li>When you begin the exam click the link only ONCE to launch the test. Double-clicking can lock the test.</li>
                                    </ol>
                                    <h3 align= 'center'>During the exam</h3>
                                    <ol >
                                        <li>Do not resize (minimize) the browser during the test.</li>
                                        <li>Never click the &ldquo;Back&rdquo; button on the browser. This will take you out of the test and prevent Blackboard from tracking your selected answers.</li>
                                        <li>Avoid using the scroll button on your mouse if present.</li>
                                        <li>Click the &ldquo;Submit&rdquo; button to submit your exam. Do not press &ldquo;Enter&rdquo; on the keyboard to submit the exam.</li>
                                        <li>Save your test using the &ldquo;Save&rdquo; button periodically during the exam.</li>
                                    </ol>
                                    <h3 align= 'center'> Instructions for accessing the Exam</h3>
                                    <ol >
                                        <li>Read the notes above titled &ldquo;Before beginning the exam&rdquo; and &ldquo;During the exam.&rdquo;</li>
                                        <li>Your instructor will provide your password. This password is required to open the exam.</li>
                                        <li>Log in to the Blackboard course.</li>
                                        <li>Click on the &ldquo;Exam Information&rdquo; link from the left menu.</li>
                                        <li>When ready to begin, click on the &ldquo;General Geology Exam 1 Fall 2013&rdquo; link to open</li>
                                        <li>the exam. &nbsp;&nbsp;</li>
                                    </ol>
                                    <ul>
                                        <li>Do not begin until you are ready to start!</li>
                                        <li>The exam must be started between 7 AM on Tuesday, October 22nd, and 8:30 PM on Wednesday, October 23rd.</li>
                                    </ul>
                                    <ol >
                                        <li>Use the password sent to your student email account to open the exam.</li>
                                        <li>You will have 1.5 hours to complete your exam.</li>
                                        <li>The exam must be completed in one sitting. You can only open it once.</li>
                                        <li>Answer all questions in the exam.</li>
                                    </ol>
                                    <h4 align= 'center'>Click the &ldquo;Submit&rdquo; button in the bottom right corner when you are done submitting your work.</h4>
                                    
                                    <p>Your exam, you must contact your instructor immediately by phone. Jennifer Lewis can be reached at 03017344555.</p>
                                    <p>If she does not hear from you right away, your exam may not be accepted, and you may receive a zero on the exam.</p>
                                    <Box borderTop={1} {...defaultProps} /> 
                                </Typography>
                            </div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleChange}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label=" Pledge: I promise to answer myself without help from anyone."
                            />
                        
                        <Grid item align="center" className={classes.margin}>
                            <Button className={classes.button}
                            variant="contained" 
                            color="primary"
                            component={Link} to="./Exam">
                            Start Now!
                            </Button>
                        </Grid>
                        
                        
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
}