import React from 'react';
import AppBar from './Components/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
}));

const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    style: { width: '60rem', height: '1rem' },
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
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <Paper className={classes.paper}>
                            <div>
                                <Typography variant="h1" component="h2" gutterBottom>
                                    Exam Name
                                </Typography>
                                <Box borderTop={1} {...defaultProps} />
                                <Typography variant="body1" gutterBottom>
                                    Our front-end quiz focuses on complex single-page applications and on tools for appealing and responsive site design. It covers the following topics:
                                    JavaScript and general coding logic: we'll show you some code snippets and ask you questions about what they do. We'll also ask you questions about JavaScript, running from basic syntax up to performance optimizations.
                                    CSS: we'll ask questions around how browsers choose which rule to apply to a particular element, how CSS actually controls page layout, and how CSS enables responsive design.
                                    Algorithms: the use cases and performance of common textbook algorithms.
                                    HTTP and security: how browsers and servers communicate, how those communications are authenticated and secured, and how to avoid common security vulnerabilities.
                                    Full-stack system design: what layers make up a typical web stack and how concerns are separated between front-end and back-end.
                                    We don't expect most engineers to know the answers to all of these questions, so don't worry if you're unsure of a few of them. If you're not sure about an answer, select I don't know.
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

                        </Paper>

                        <Button 
                        variant="contained" 
                        color="primary"
                        component={Link} to="./Exam">
                        Start Now!
                        </Button>
                        
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
}